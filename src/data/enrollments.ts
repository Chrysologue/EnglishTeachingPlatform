import { Enrollment } from '../types/enrollment';

const enrollments: Enrollment[] = [
  {
    id: 'enroll-001',
    studentId: 'stu-001',
    sessionId: 'session-001',
    status: 'confirmed',
    enrolledAt: '2026-09-10T09:00:00',
  },
  {
    id: 'enroll-002',
    studentId: 'stu-002',
    sessionId: 'session-001',
    status: 'confirmed',
    enrolledAt: '2026-09-10T10:00:00',
  },
  {
    id: 'enroll-003',
    studentId: 'stu-003',
    sessionId: 'session-002',
    status: 'confirmed',
    enrolledAt: '2026-09-11T14:00:00',
  },
  {
    id: 'enroll-004',
    studentId: 'stu-005',
    sessionId: 'session-002',
    status: 'pending',
    enrolledAt: '2026-09-12T16:00:00',
  },
  {
    id: 'enroll-005',
    studentId: 'stu-003',
    sessionId: 'session-003',
    status: 'confirmed',
    enrolledAt: '2026-09-12T18:00:00',
  },
];

export { enrollments };