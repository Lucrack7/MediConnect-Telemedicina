import type { Doctor } from '../../types';
import { cn } from '../../utils';
import { Badge, Button, Card } from '../ui';
import { StarIcon, ClockIcon } from '../ui/Icons';

// ============================================================
// DOCTOR CARD — Tarjeta de médico con info y botón de agendado
// ============================================================

interface DoctorCardProps {
    doctor: Doctor;
    onSchedule: (doctor: Doctor) => void;
}

export const DoctorCard = ({ doctor, onSchedule }: DoctorCardProps) => (
    <Card className="p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        <div className="flex items-start gap-4">

            {/* Avatar con indicador online */}
            <div className="relative flex-shrink-0">
                <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                    style={{ backgroundColor: doctor.avatarColor }}
                >
                    {doctor.avatar}
                </div>
                <div className={cn(
                    'absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white',
                    doctor.online ? 'bg-emerald-400' : 'bg-slate-300'
                )} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <h3 className="text-slate-800 font-bold text-sm">{doctor.name}</h3>
                        <p className="text-blue-600 text-xs font-medium mt-0.5">{doctor.specialty}</p>
                    </div>
                    <Badge variant={doctor.online ? 'online' : 'offline'}>
                        {doctor.online ? '● En línea' : '● Offline'}
                    </Badge>
                </div>

                {/* Rating y experiencia */}
                <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                        <StarIcon filled />
                        <span className="text-slate-700 text-xs font-semibold">{doctor.rating}</span>
                    </div>
                    <span className="text-slate-300 text-xs">|</span>
                    <span className="text-slate-500 text-xs">{doctor.experience} años de exp.</span>
                </div>

                {/* Horarios preview + botón */}
                <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 flex-wrap">
                        <ClockIcon className="w-3 h-3 text-slate-400" />
                        {doctor.availableSlots.slice(0, 3).map((slot) => (
                            <span
                                key={slot}
                                className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-lg border border-blue-100 font-medium"
                            >
                                {slot}
                            </span>
                        ))}
                        {doctor.availableSlots.length > 3 && (
                            <span className="text-slate-400 text-xs">+{doctor.availableSlots.length - 3}</span>
                        )}
                    </div>
                    <Button size="sm" onClick={() => onSchedule(doctor)}>
                        Agendar
                    </Button>
                </div>
            </div>
        </div>
    </Card>
);