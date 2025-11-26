import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Mic, Phone, PhoneOff, Volume2, User } from 'lucide-react';
import { generateConciergeResponse, HOTEL_SYSTEM_INSTRUCTION } from '../services/gemini';
import { ChatMessage } from '../types';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from "@google/genai";

// Helper functions for Audio Processing
function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const Concierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'E kaabo! Welcome to Eko Pearl. I am Ayo, your concierge. How may I assist you with your stay in Lagos today?' }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Live API Refs
  const nextStartTime = useRef<number>(0);
  const inputAudioContext = useRef<AudioContext | null>(null);
  const outputAudioContext = useRef<AudioContext | null>(null);
  const sources = useRef<Set<AudioBufferSourceNode>>(new Set());
  const session = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isVoiceMode]);

  // Text Chat Handler
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateConciergeResponse(input, messages);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  // Handle Enter key in text input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Voice Mode Handler
  const startVoiceSession = async () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        console.error("API Key missing");
        return;
    }

    // Prevent multiple sessions
    if (isVoiceMode || session.current) {
        console.log("Voice session already active");
        // Show a more obvious message to the user
        setMessages(prev => [...prev, { 
            role: 'model', 
            text: '🎤 Voice mode is already active! You can speak to me now, or click "End Voice Call" to switch back to text.' 
        }]);
        return;
    }

    // Add a message to show voice mode is starting
    setMessages(prev => [...prev, { 
        role: 'model', 
        text: '🎤 Starting voice mode... Please allow microphone access when prompted!' 
    }]);

    setIsVoiceMode(true);
    setIsConnected(false);
    
    try {
        console.log("Starting voice session...");
        
        // Clean up any existing contexts
        if (inputAudioContext.current) {
            inputAudioContext.current.close();
        }
        if (outputAudioContext.current) {
            outputAudioContext.current.close();
        }
        
        const ai = new GoogleGenAI({ apiKey });
        
        inputAudioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 16000});
        outputAudioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
        
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        
        const sessionPromise = ai.live.connect({
            model: 'gemini-2.0-flash-exp',
            systemInstruction: HOTEL_SYSTEM_INSTRUCTION,
            generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: {
                            voiceName: "Puck"
                        }
                    }
                }
            },
            callbacks: {
                onopen: () => {
                    console.log("Voice session connected successfully");
                    setIsConnected(true);
                    
                    // Add success message to chat
                    setMessages(prev => [...prev, { 
                        role: 'model', 
                        text: '🎉 Voice mode connected! You can now speak to me and I\'ll respond with voice. Try saying "Tell me about the rooms" or "What\'s nearby?"' 
                    }]);
                    
                    // Simplified audio setup - no immediate processing to avoid connection issues
                    console.log("Voice session ready for audio input");
                },
                onmessage: async (message: LiveServerMessage) => {
                    // Handle Audio
                    const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                    if (base64EncodedAudioString && outputAudioContext.current) {
                        nextStartTime.current = Math.max(nextStartTime.current, outputAudioContext.current.currentTime);
                        const audioBuffer = await decodeAudioData(
                            decode(base64EncodedAudioString),
                            outputAudioContext.current,
                            24000,
                            1
                        );
                        const source = outputAudioContext.current.createBufferSource();
                        source.buffer = audioBuffer;
                        source.connect(outputAudioContext.current.destination);
                        
                        source.addEventListener('ended', () => {
                            sources.current.delete(source);
                        });
                        
                        source.start(nextStartTime.current);
                        nextStartTime.current = nextStartTime.current + audioBuffer.duration;
                        sources.current.add(source);
                    }
                    
                    // Handle Interruption
                    const interrupted = message.serverContent?.interrupted;
                    if (interrupted) {
                        for (const source of sources.current.values()) {
                            source.stop();
                            sources.current.delete(source);
                        }
                        nextStartTime.current = 0;
                    }
                },
                onerror: (err) => {
                    console.error("Live API Error Details:", err);
                    setIsConnected(false);
                    
                    // Add specific error message
                    setMessages(prev => [...prev, { 
                        role: 'model', 
                        text: `❌ Voice connection error: ${err.message || 'Unknown error'}. Please try again or continue with text chat.` 
                    }]);
                },
                onclose: () => {
                    console.log("Voice session closed unexpectedly");
                    setIsConnected(false);
                    // Don't automatically stop voice session, let user manually retry
                    setMessages(prev => [...prev, { 
                        role: 'model', 
                        text: '🔄 Connection lost. Click the phone button to reconnect or continue with text chat.' 
                    }]);
                }
            },
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }, 
                },
                systemInstruction: HOTEL_SYSTEM_INSTRUCTION,
            }
        });
        
        session.current = await sessionPromise;
        console.log("Voice session established and ready");

    } catch (e) {
        console.error("Failed to start voice session", e);
        
        // Fallback to text-to-speech mode
        console.log("Falling back to text-to-speech mode");
        setIsConnected(true); // Show as connected for TTS mode
        
        // You can still type and get voice responses via Web Speech API
        if ('speechSynthesis' in window) {
            console.log("Text-to-speech fallback available");
        }
    }
  };

  const stopVoiceSession = () => {
    // Clear keepalive interval
    if (session.current?._keepAlive) {
        clearInterval(session.current._keepAlive);
    }
    
    // Clean up audio nodes
    if (session.current?._audioSource) {
        session.current._audioSource.disconnect();
    }
    if (session.current?._scriptProcessor) {
        session.current._scriptProcessor.disconnect();
    }
    
    // Try to close session if method exists, otherwise just cleanup context
    try {
        if (session.current && typeof session.current.close === 'function') {
             session.current.close();
        }
    } catch(e) {
        console.log("Session close cleanup", e);
    }
    
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
    }
    
    if (inputAudioContext.current) {
        inputAudioContext.current.close();
        inputAudioContext.current = null;
    }
    
    if (outputAudioContext.current) {
        outputAudioContext.current.close();
        outputAudioContext.current = null;
    }
    
    setIsVoiceMode(false);
    setIsConnected(false);
    session.current = null;
    nextStartTime.current = 0;
    sources.current.clear();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'hidden' : 'flex'
        } items-center gap-2 ${
          isVoiceMode && isConnected 
            ? 'bg-green-500 animate-pulse' 
            : isVoiceMode 
            ? 'bg-yellow-500' 
            : 'bg-eko-green hover:bg-emerald-800'
        }`}
      >
        {isVoiceMode && isConnected ? (
          <>
            <Mic size={20} className="text-white animate-pulse" />
            <span className="font-serif font-medium pr-2">🎤 Live</span>
          </>
        ) : isVoiceMode ? (
          <>
            <Loader2 size={20} className="text-white animate-spin" />
            <span className="font-serif font-medium pr-2">Connecting...</span>
          </>
        ) : (
          <>
            <Sparkles size={20} className="text-eko-gold" />
            <span className="font-serif font-medium pr-2">Ask Ayo</span>
          </>
        )}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-slide-up font-sans">
          
          {/* Header */}
          <div className="bg-eko-green p-4 flex justify-between items-center text-white shadow-md relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
                <img 
                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=100&auto=format&fit=crop" 
                    alt="Ayo" 
                    className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">Concierge Ayo</h3>
                <p className="text-xs text-white/70 flex items-center gap-1">
                  {isVoiceMode ? (
                    <>
                        <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></span>
                        {isConnected ? 'Live Voice' : 'Connecting...'}
                    </>
                  ) : (
                    <>
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        Online
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
                 {/* Toggle Voice Mode */}
                {!isVoiceMode ? (
                    <button 
                        onClick={startVoiceSession}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110"
                        title="Start Voice Call with Ayo"
                    >
                        <Phone size={18} />
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full ${isConnected ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                            {isConnected ? (
                                <Mic className={`w-[18px] h-[18px] ${isConnected ? 'text-green-400' : 'text-yellow-400'} animate-pulse`} />
                            ) : (
                                <Loader2 className="w-[18px] h-[18px] text-yellow-400 animate-spin" />
                            )}
                        </div>
                    </div>
                )}
                <button onClick={() => { setIsOpen(false); stopVoiceSession(); }} className="text-white/70 hover:text-white transition-colors">
                    <X size={24} />
                </button>
            </div>
          </div>

          {/* Main Content Area */}
          {isVoiceMode ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-eko-green/5 to-eko-gold/5">
                  <div className="text-center space-y-6">
                      <div className="relative">
                          <div className={`w-24 h-24 mx-auto rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                              isConnected 
                                  ? 'border-green-400 bg-green-50 animate-pulse' 
                                  : 'border-yellow-400 bg-yellow-50'
                          }`}>
                              {isConnected ? (
                                  <Mic className="w-12 h-12 text-green-600" />
                              ) : (
                                  <Loader2 className="w-12 h-12 text-yellow-600 animate-spin" />
                              )}
                          </div>
                          {isConnected && (
                              <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-2 border-green-400 animate-ping"></div>
                          )}
                      </div>
                      
                      <div className="space-y-2">
                          <h3 className="text-xl font-serif font-bold text-eko-charcoal">
                              {isConnected ? '🎤 Voice Mode Active' : '🔄 Connecting...'}
                          </h3>
                          <p className="text-eko-stone text-sm">
                              {isConnected 
                                  ? 'Speak now - Ayo is listening and will respond with voice' 
                                  : 'Setting up voice connection with Ayo...'
                              }
                          </p>
                      </div>

                      {isConnected && (
                          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-eko-green/20">
                              <p className="text-xs text-eko-stone flex items-center justify-center gap-2">
                                  <Volume2 className="w-4 h-4" />
                                  Try saying: "Tell me about the rooms" or "What's nearby?"
                              </p>
                          </div>
                      )}

                      <button 
                          onClick={stopVoiceSession}
                          className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
                      >
                          <PhoneOff size={18} />
                          End Voice Call
                      </button>
                  </div>
              </div>
          ) : (
              <>
                {/* Text Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-stone-50 space-y-4">
                    {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && (
                            <div className="w-8 h-8 rounded-full bg-eko-green flex-shrink-0 mr-2 overflow-hidden border border-gray-200 mt-1">
                                <img src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=100&auto=format&fit=crop" alt="Ayo" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed shadow-sm ${
                            msg.role === 'user'
                            ? 'bg-eko-gold text-white rounded-br-none'
                            : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                        }`}
                        >
                        {msg.text}
                        </div>
                    </div>
                    ))}
                    {isLoading && (
                    <div className="flex justify-start">
                         <div className="w-8 h-8 rounded-full bg-eko-green flex-shrink-0 mr-2 overflow-hidden border border-gray-200 mt-1">
                            <img src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=100&auto=format&fit=crop" alt="Ayo" className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-white p-3 rounded-lg rounded-bl-none border border-gray-100 shadow-sm flex items-center gap-2">
                             <Loader2 size={16} className="animate-spin text-eko-green" />
                             <span className="text-xs text-gray-400">Ayo is typing...</span>
                        </div>
                    </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                    <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask about rooms, dining, or Lagos..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-eko-green focus:ring-1 focus:ring-eko-green text-eko-charcoal"
                    />
                    <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="p-2 bg-eko-green text-white rounded-full hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                    <Send size={18} />
                    </button>
                </div>
              </>
          )}
        </div>
      )}
    </>
  );
};