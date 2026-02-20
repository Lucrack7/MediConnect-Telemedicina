import { useState } from 'react';
import type { Appointment } from '../types/index';
import { DOCTORS } from '../services/mockData';
import { formatDate } from '../utils';
import { Button, Card } from '../components/ui';
import { VideoConsultation } from '../components/features/VideoConsultation';
import { CalendarIcon, ClockIcon } from '../components/ui/Icons';
import { useCountdown } from '../hooks';

// ============================================================
// WAITING ROOM — Sala de espera previa a la videollamada
// ============================================================

interface WaitingRoomProps {
    appointment: Appointment;
    onJoin: () => void;
}

const WaitingRoom = ({ appointment, onJoin }: WaitingRoomProps) => {
    const { count, finished } = useCountdown(5);
    return (
        <div className="flex flex-col items-center justify-center py-12 gap-6">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                <div className="w-full h-full rounded-full border-4 border-blue-200 flex items-center justify-center text-3xl">⏳</div>
            </div>
            <div className="text-center">
                <h3 className="text-slate-800 font-bold text-xl">Sala de Espera</h3>
                <p className="text-slate-500 text-sm mt-1">
                    Tu consulta con <strong>{appointment.doctorName}</strong> comenzará en breve.
                </p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4">
                <div className="text-center w-12">
                    <p className="text-blue-600 text-3xl font-bold">{count}</p>
                    <p className="text-blue-400 text-xs">segundos</p>
                </div>
                <div>
                    <p className="text-slate-700 text-sm font-medium">El médico te atenderá pronto</p>
                    <p className="text-slate-500 text-xs">Verificá tu cámara y micrófono</p>
                </div>
            </div>
            <Button size="lg" onClick={onJoin} variant={finished ? 'success' : 'primary'}>
                {finished ? '🎥 Unirme ahora' : `Ingresar en ${count}s...`}
            </Button>
        </div>
    );
};

// ============================================================
// CONSULTATION VIEW — Selector de turno + flujo completo
// ============================================================

type ConsultationPhase = 'select' | 'waiting' | 'video' | 'ended';

interface ConsultationViewProps {
    appointments: Appointment[];
}

export const ConsultationView = ({ appointments }: ConsultationViewProps) => {
    const [phase, setPhase] = useState<ConsultationPhase>('select');
    const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);

    const confirmed = appointments.filter((a) => a.status === 'confirmed');

    if (phase === 'ended') {
        return (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="text-5xl">👋</div>
                <h3 className="text-slate-800 font-bold text-xl">Consulta Finalizada</h3>
                <p className="text-slate-500 text-sm text-center">
                    Gracias por usar MediConnect. Tu receta estará disponible en el historial.
                </p>
                <Button onClick={() => { setPhase('select'); setSelectedApt(null); }}>Volver al inicio</Button>
            </div>
        );
    }

    if (phase === 'video') {
        return <VideoConsultation appointment={selectedApt} onEnd={() => setPhase('ended')} />;
    }

    if (phase === 'waiting' && selectedApt) {
        return <WaitingRoom appointment={selectedApt} onJoin={() => setPhase('video')} />;
    }

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-bold text-slate-800">Videoconsulta</h2>
                <p className="text-slate-500 text-sm">Iniciá tu consulta médica virtual</p>
            </div>

            {confirmed.length > 0 ? (
                <div className="space-y-3">
                    {confirmed.map((apt) => {
                        const doctor = DOCTORS.find((d) => d.id === apt.doctorId);
                        return (
                            <Card key={apt.id} className="p-5">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                                        style={{ backgroundColor: doctor?.avatarColor ?? '#4f8ef7' }}
                                    >
                                        {doctor?.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-slate-800 font-bold">{apt.doctorName}</h3>
                                        <p className="text-blue-600 text-sm">{apt.specialty}</p>
                                        <div className="flex items-center gap-2 mt-1 text-slate-400 text-xs">
                                            <CalendarIcon className="w-3 h-3" />
                                            <span>{formatDate(apt.date)}</span>
                                            <ClockIcon className="w-3 h-3" />
                                            <span>{apt.time}</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="success"
                                        onClick={() => { setSelectedApt(apt); setPhase('waiting'); }}
                                    >
                                        🎥 Ingresar
                                    </Button>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <Card className="p-10 text-center">
                    <div className="text-4xl mb-3">📅</div>
                    <p className="text-slate-500">No tenés turnos confirmados para iniciar una videoconsulta.</p>
                </Card>
            )}
        </div>
    );
};