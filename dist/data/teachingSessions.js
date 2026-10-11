"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teachingSessions = void 0;
const teachingSessions = [
    {
        session_id: 'session-001',
        package_id: 'pkg-001',
        date: '2026-09-19',
        start_time: '09:00',
        end_time: '10:00',
        max_students: 3,
        meeting_link: 'https://meet.example.com/session-001',
        status: 'scheduled',
    },
    {
        session_id: 'session-002',
        package_id: 'pkg-002',
        date: '2026-09-19',
        start_time: '10:30',
        end_time: '11:30',
        max_students: 3,
        meeting_link: 'https://meet.example.com/session-002',
        status: 'scheduled',
    },
    {
        session_id: 'session-003',
        package_id: 'pkg-003',
        date: '2026-09-20',
        start_time: '14:00',
        end_time: '15:00',
        max_students: 1,
        meeting_link: 'https://meet.example.com/session-003',
        status: 'scheduled',
    },
    {
        session_id: 'session-004',
        package_id: 'pkg-002',
        date: '2026-09-21',
        start_time: '18:00',
        end_time: '19:00',
        max_students: 3,
        meeting_link: 'https://meet.example.com/session-004',
        status: 'scheduled',
    },
];
exports.teachingSessions = teachingSessions;
