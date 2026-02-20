// ============================================================
// TYPES / INTERFACES — Contratos de datos de la aplicación
// ============================================================

export type AppointmentStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

export interface Specialty {
    id: string;
    name: string;
    icon: string;
}

export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    avatar: string;
    avatarColor: string;
    rating: number;
    experience: number;
    availableSlots: string[];
    online: boolean;
}

export interface Appointment {
    id: string;
    doctorId: string;
    doctorName: string;
    specialty: string;
    date: string;       // formato: 'YYYY-MM-DD'
    time: string;       // formato: 'HH:MM'
    status: AppointmentStatus;
    prescription?: string;
}

export interface Patient {
    id: string;
    name: string;
    avatar: string;
    email: string;
}

export interface ChatMessage {
    from: 'doctor' | 'patient';
    text: string;
    time: string;
}