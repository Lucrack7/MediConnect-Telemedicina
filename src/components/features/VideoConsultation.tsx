import { useState, useRef, useEffect } from 'react';
import type { Appointment, ChatMessage } from '../../types';
import { cn, getCurrentTime } from '../../utils';
import { MicIcon, VideoOffIcon, PhoneOffIcon, SendIcon } from '../ui/Icons';

// ============================================================
// VIDEO CONSULTATION — Interfaz de videollamada + chat
// ============================================================

interface VideoConsultationProps {
    appointment: Appointment | null;
    onEnd: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
    { from: 'doctor', text: 'Hola, ¡buenas tardes! ¿Cómo te sentís hoy?', time: '15:02' },
    { from: 'patient', text: 'Hola doctor, tengo malestares desde hace 3 días.', time: '15:02' },
    { from: 'doctor', text: 'Entiendo. Contame más sobre los síntomas que tenés.', time: '15:03' },
];

export const VideoConsultation = ({ appointment, onEnd }: VideoConsultationProps) => {
    const [micOn, setMicOn] = useState(true);
    const [camOn, setCamOn] = useState(true);
    const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const chatRef = useRef<HTMLDivElement>(null);

    const sendMessage = () => {
        if (!input.trim()) return;
        const time = getCurrentTime();
        setMessages((prev) => [...prev, { from: 'patient', text: input, time }]);
        setInput('');
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { from: 'doctor', text: 'Gracias por la información. Voy a revisar tu historial.', time: getCurrentTime() },
            ]);
        }, 1500);
    };

    useEffect(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex h-full rounded-2xl overflow-hidden shadow-2xl" style={{ minHeight: '520px' }}>

            {/* ── Área de video ── */}
            <div className="flex-1 bg-slate-900 flex flex-col relative">
                <div className="flex-1 relative flex items-center justify-center">
                    {/* Fondo de video simulado */}
                    <div
                        className="absolute inset-0"
                        style={{ background: 'radial-gradient(ellipse at 40% 50%, #1e3a5f 0%, #0f172a 70%)' }}
                    />

                    {/* "Cámara" del médico */}
                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="relative">
                            <div
                                className="w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-2xl"
                                style={{ backgroundColor: '#4f8ef7', boxShadow: '0 0 40px rgba(79,142,247,0.4)' }}
                            >
                                VR
                            </div>
                            <div className="absolute inset-0 rounded-full border-2 border-blue-400/40 animate-ping" />
                        </div>
                        <div className="text-center">
                            <p className="text-white font-semibold text-lg">
                                {appointment?.doctorName ?? 'Dra. Valentina Rossi'}
                            </p>
                            <div className="flex items-center justify-center gap-2 mt-1">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-slate-300 text-sm">En vivo</span>
                            </div>
                        </div>
                    </div>

                    {/* Mini-cámara del paciente */}
                    <div className="absolute bottom-4 right-4 w-28 h-20 bg-slate-800 rounded-xl overflow-hidden border-2 border-slate-700 shadow-xl flex items-center justify-center">
                        {camOn ? (
                            <>
                                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 40%, #1a2a3a, #0d1117)' }} />
                                <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                                    JP
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-1 text-slate-400">
                                <VideoOffIcon className="w-5 h-5" />
                                <span className="text-xs">Cam. off</span>
                            </div>
                        )}
                        <div className="absolute bottom-1 left-2 right-2 flex items-center justify-between">
                            <span className="text-white text-xs font-medium">Tú</span>
                            {!micOn && <MicIcon off className="w-3 h-3 text-red-400" />}
                        </div>
                    </div>

                    {/* Timer */}
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-white text-sm font-mono">12:34</span>
                    </div>
                </div>

                {/* Controles */}
                <div className="bg-slate-800/80 backdrop-blur-sm border-t border-slate-700 px-6 py-3 flex items-center justify-center gap-4">
                    <button
                        onClick={() => setMicOn(!micOn)}
                        className={cn(
                            'w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer',
                            micOn ? 'bg-slate-600 hover:bg-slate-500 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
                        )}
                    >
                        <MicIcon off={!micOn} />
                    </button>
                    <button
                        onClick={() => setCamOn(!camOn)}
                        className={cn(
                            'w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer',
                            camOn ? 'bg-slate-600 hover:bg-slate-500 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
                        )}
                    >
                        <VideoOffIcon />
                    </button>
                    <button
                        onClick={onEnd}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-red-500/30"
                    >
                        <PhoneOffIcon className="w-4 h-4" />
                        Finalizar
                    </button>
                </div>
            </div>

            {/* ── Panel de chat ── */}
            <div className="w-72 bg-white flex flex-col border-l border-slate-100">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                    <h3 className="font-bold text-slate-800 text-sm">Chat de Consulta</h3>
                    <p className="text-slate-400 text-xs">Mensajes en tiempo real</p>
                </div>

                <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: '380px' }}>
                    {messages.map((msg, i) => (
                        <div key={i} className={cn('flex', msg.from === 'patient' ? 'justify-end' : 'justify-start')}>
                            <div className={cn(
                                'max-w-[85%] rounded-2xl px-3 py-2 text-sm',
                                msg.from === 'patient'
                                    ? 'bg-blue-600 text-white rounded-br-sm'
                                    : 'bg-slate-100 text-slate-700 rounded-bl-sm'
                            )}>
                                <p>{msg.text}</p>
                                <p className={cn('text-xs mt-0.5', msg.from === 'patient' ? 'text-blue-200' : 'text-slate-400')}>
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-3 border-t border-slate-100">
                    <div className="flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Escribí un mensaje..."
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                        />
                        <button
                            onClick={sendMessage}
                            className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
                        >
                            <SendIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};