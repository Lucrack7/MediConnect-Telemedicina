import { useState, useEffect } from 'react';
import type { Appointment } from '../types';
import { INITIAL_APPOINTMENTS } from '../services/mockData';
import { generateId } from '../utils';

// ============================================================
// useAppointments — Manejo del estado global de turnos
// ============================================================
export function useAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

    const addAppointment = (apt: Omit<Appointment, 'id'>) => {
        const newApt: Appointment = { ...apt, id: generateId() };
        setAppointments((prev) => [...prev, newApt]);
        return newApt;
    };

    const updateStatus = (id: string, status: Appointment['status']) => {
        setAppointments((prev) =>
            prev.map((a) => (a.id === id ? { ...a, status } : a))
        );
    };

    const upcoming = appointments.filter(
        (a) => a.status === 'confirmed' || a.status === 'pending'
    );

    return { appointments, upcoming, addAppointment, updateStatus };
}

// ============================================================
// useCountdown — Temporizador regresivo
// ============================================================
export function useCountdown(initialSeconds: number) {
    const [count, setCount] = useState(initialSeconds);

    useEffect(() => {
        if (count <= 0) return;
        const timer = setInterval(() => setCount((c) => c - 1), 1000);
        return () => clearInterval(timer);
    }, [count]);

    const reset = () => setCount(initialSeconds);
    return { count, finished: count === 0, reset };
}

// ============================================================
// useCalendar — Lógica del calendario de agendamiento
// ============================================================
export function useCalendar(availableSlots: string[]) {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const prevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
        else setCurrentMonth((m) => m - 1);
        setSelectedDay(null); setSelectedTime(null);
    };

    const nextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
        else setCurrentMonth((m) => m + 1);
        setSelectedDay(null); setSelectedTime(null);
    };

    const isToday = (day: number) =>
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

    const isPast = (day: number) => {
        const d = new Date(currentYear, currentMonth, day);
        return d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    };

    const isWeekend = (day: number) => {
        const wd = new Date(currentYear, currentMonth, day).getDay();
        return wd === 0 || wd === 6;
    };

    /** Slots disponibles para un día puntual (simulado con variación por día) */
    const getSlotsForDay = (day: number): string[] => {
        if (!day || isPast(day) || isWeekend(day)) return [];
        const seed = day % 3;
        return availableSlots.filter((_, i) => (i + seed) % 2 === 0 || seed === 1);
    };

    const selectDay = (day: number) => {
        setSelectedDay(day);
        setSelectedTime(null);
    };

    return {
        currentMonth, currentYear, selectedDay, selectedTime,
        setSelectedTime, selectDay, prevMonth, nextMonth,
        isToday, isPast, isWeekend, getSlotsForDay,
    };
}