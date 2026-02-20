import type { Doctor, Specialty, Appointment, Patient } from '../types';

// ============================================================
// MOCK DATA — Datos simulados para el MVP
// ============================================================

export const CURRENT_PATIENT: Patient = {
    id: 'p1',
    name: 'Lucas Medran',
    avatar: 'LM',
    email: 'lucasmedran.dev@email.com',
};

export const SPECIALTIES: Specialty[] = [
    { id: 'cardiology', name: 'Cardiología', icon: '❤️' },
    { id: 'neurology', name: 'Neurología', icon: '🧠' },
    { id: 'dermatology', name: 'Dermatología', icon: '🩺' },
    { id: 'pediatrics', name: 'Pediatría', icon: '👶' },
    { id: 'psychiatry', name: 'Psiquiatría', icon: '💭' },
    { id: 'orthopedics', name: 'Ortopedia', icon: '🦴' },
];

export const DOCTORS: Doctor[] = [
    {
        id: 'd1',
        name: 'Dra. Valentina Rossi',
        specialty: 'Cardiología',
        avatar: 'VR',
        avatarColor: '#4f8ef7',
        rating: 4.9,
        experience: 12,
        availableSlots: ['09:00', '10:30', '14:00', '16:30'],
        online: true,
    },
    {
        id: 'd2',
        name: 'Dr. Martín Gutiérrez',
        specialty: 'Neurología',
        avatar: 'MG',
        avatarColor: '#7c5cbf',
        rating: 4.7,
        experience: 8,
        availableSlots: ['08:30', '11:00', '15:00'],
        online: true,
    },
    {
        id: 'd3',
        name: 'Dra. Sofía Mendez',
        specialty: 'Dermatología',
        avatar: 'SM',
        avatarColor: '#2ab7a4',
        rating: 4.8,
        experience: 15,
        availableSlots: ['10:00', '13:30', '17:00'],
        online: false,
    },
    {
        id: 'd4',
        name: 'Dr. Carlos Ibáñez',
        specialty: 'Psiquiatría',
        avatar: 'CI',
        avatarColor: '#e08030',
        rating: 4.6,
        experience: 10,
        availableSlots: ['09:30', '12:00', '15:30', '18:00'],
        online: true,
    },
    {
        id: 'd5',
        name: 'Dra. Laura Fernández',
        specialty: 'Pediatría',
        avatar: 'LF',
        avatarColor: '#d94f7c',
        rating: 4.95,
        experience: 20,
        availableSlots: ['08:00', '10:00', '14:30'],
        online: true,
    },
    {
        id: 'd6',
        name: 'Dr. Andrés Peralta',
        specialty: 'Ortopedia',
        avatar: 'AP',
        avatarColor: '#56a84b',
        rating: 4.5,
        experience: 6,
        availableSlots: ['11:30', '16:00', '17:30'],
        online: false,
    },
];

export const PAST_APPOINTMENTS: Appointment[] = [
    {
        id: 'a1',
        doctorId: 'd1',
        doctorName: 'Dra. Valentina Rossi',
        specialty: 'Cardiología',
        date: '2025-02-05',
        time: '10:30',
        status: 'completed',
        prescription:
            'Atenolol 50mg - 1 comprimido/día. Reposo relativo. Control en 30 días.',
    },
    {
        id: 'a2',
        doctorId: 'd5',
        doctorName: 'Dra. Laura Fernández',
        specialty: 'Pediatría',
        date: '2025-01-20',
        time: '14:30',
        status: 'completed',
        prescription:
            'Amoxicilina 250mg/5ml - 5ml cada 8hs por 7 días. Ibuprofeno si fiebre.',
    },
    {
        id: 'a3',
        doctorId: 'd3',
        doctorName: 'Dra. Sofía Mendez',
        specialty: 'Dermatología',
        date: '2025-01-08',
        time: '17:00',
        status: 'completed',
        prescription:
            'Betametasona crema 0.05% - aplicar 2 veces/día. Protector solar SPF 50+.',
    },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
    {
        id: 'upcoming1',
        doctorId: 'd2',
        doctorName: 'Dr. Martín Gutiérrez',
        specialty: 'Neurología',
        date: '2026-02-25',
        time: '11:00',
        status: 'confirmed',
    },
];