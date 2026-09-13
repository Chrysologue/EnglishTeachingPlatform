"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teachingSessions = void 0;
const teachingSessions = [
    {
        id: 'session-001',
        packageId: 'pkg-001',
        date: '2026-09-19',
        startTime: '09:00',
        endTime: '10:00',
        maxStudents: 3,
        meetingLink: 'https://meet.example.com/session-001',
        status: 'scheduled',
    },
    {
        id: 'session-002',
        packageId: 'pkg-002',
        date: '2026-09-19',
        startTime: '10:30',
        endTime: '11:30',
        maxStudents: 3,
        meetingLink: 'https://meet.example.com/session-002',
        status: 'scheduled',
    },
    {
        id: 'session-003',
        packageId: 'pkg-003',
        date: '2026-09-20',
        startTime: '14:00',
        endTime: '15:00',
        maxStudents: 1,
        meetingLink: 'https://meet.example.com/session-003',
        status: 'scheduled',
    },
    {
        id: 'session-004',
        packageId: 'pkg-002',
        date: '2026-09-21',
        startTime: '18:00',
        endTime: '19:00',
        maxStudents: 3,
        meetingLink: 'https://meet.example.com/session-004',
        status: 'scheduled',
    },
];
exports.teachingSessions = teachingSessions;
