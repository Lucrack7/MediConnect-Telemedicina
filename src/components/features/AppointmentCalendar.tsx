import { useState } from 'react';
import type { Doctor, Appointment } from '../../types';
import { cn, getDaysInMonth, getFirstDayOfMonth, MONTH_NAMES, WEEK_DAYS } from '../../utils';
import { Button } from '../ui';
import { ChevronLeftIcon, ChevronRightIcon } from '../ui/Icons';
import { useCalendar } from '../../hooks';

// ============================================================
// APPOINTMENT CALENDAR — Selector de día y horario
// ============================================================

interface AppointmentCalendarProps {
    doctor: Doctor;
    onConfirm: (appointment: Omit<Appointment, 'id'>) => void;
}

export const AppointmentCalendar = ({ doctor, onConfirm }: AppointmentCalendarProps) => {
    const [confirmed, setConfirmed] = useState(false);

    const {
        currentMonth, currentYear, selectedDay, selectedTime,
        setSelectedTime, selectDay, prevMonth, nextMonth,
        isToday, isPast, isWeekend, getSlotsForDay,
    } = useCalendar(doctor.availableSlots);

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const slotsForSelected = selectedDay ? getSlotsForDay(selectedDay) : [];

    const handleConfirm = () => {
        if (!selectedDay || !selectedTime) return;
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
        setConfirmed(true);
        setTimeout(() => {
            onConfirm({ doctorId: doctor.id, doctorName: doctor.name, specialty: doctor.specialty, date: dateStr, time: selectedTime, status: 'confirmed' });
        }, 1400);
    };

    if (confirmed) {
        return (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl animate-bounce">✅</div>
                <h3 className="text-slate-800 font-bold text-xl">¡Turno Confirmado!</h3>
                <p className="text-slate-500 text-sm text-center">
                    Tu consulta con <strong>{doctor.name}</strong> fue agendada exitosamente.
                </p>
            </div>
        );
    }

    return (
        <div className="flex gap-6">
            {/* Calendario */}
            <div className="flex-1">
                {/* Navegación mes */}
                <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                        <ChevronLeftIcon />
                    </button>
                    <h3 className="font-bold text-slate-800">{MONTH_NAMES[currentMonth]} {currentYear}</h3>
                    <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                        <ChevronRightIcon />
                    </button>
                </div>

                {/* Días de la semana */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {WEEK_DAYS.map((d) => (
                        <div key={d} className="text-center text-xs font-semibold text-slate-400 py-1">{d}</div>
                    ))}
                </div>

                {/* Celdas del mes */}
                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const unavailable = isPast(day) || isWeekend(day);
                        const selected = selectedDay === day;
                        const hasSlots = getSlotsForDay(day).length > 0;

                        return (
                            <button
                                key={day}
                                disabled={unavailable}
                                onClick={() => selectDay(day)}
                                className={cn(
                                    'h-9 w-full rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer relative',
                                    selected ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                        : isToday(day) ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                            : unavailable ? 'text-slate-300 cursor-not-allowed'
                                                : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                                )}
                            >
                                {day}
                                {hasSlots && !selected && !unavailable && (
                                    <div className="w-1 h-1 rounded-full bg-blue-400 mx-auto mt-0.5" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Horarios + Confirmar */}
            <div className="w-48 flex flex-col gap-4">
                {selectedDay ? (
                    <>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Horarios disponibles</p>
                            {slotsForSelected.length > 0 ? (
                                <div className="grid grid-cols-2 gap-1.5">
                                    {slotsForSelected.map((slot) => (
                                        <button
                                            key={slot}
                                            onClick={() => setSelectedTime(slot)}
                                            className={cn(
                                                'py-2 px-2 rounded-lg text-sm font-semibold border transition-all cursor-pointer',
                                                selectedTime === slot
                                                    ? 'bg-blue-600 border-blue-600 text-white shadow'
                                                    : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
                                            )}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-400 text-xs text-center py-4">Sin disponibilidad</p>
                            )}
                        </div>
                        {selectedTime && (
                            <Button onClick={handleConfirm} className="w-full">
                                Confirmar Turno
                            </Button>
                        )}
                    </>
                ) : (
                    <p className="text-slate-400 text-sm text-center py-8">Seleccioná un día del calendario</p>
                )}
            </div>
        </div>
    );
};