import { LessonPackage } from '../types/package';

const packages: LessonPackage[] = [
  {
    id: 'pkg-001',
    title: 'Beginner English Conversation',
    description:
      'Build confidence and improve basic English speaking skills through guided conversation practice.',
    level: 'Beginner',
    type: 'group',
    duration: 60,
    price: 10000,
    maxStudents: 3,
    isActive: true,
  },
  {
    id: 'pkg-002',
    title: 'Intermediate English Conversation',
    description:
      'Improve fluency, vocabulary, and confidence through practical English conversations.',
    level: 'Intermediate',
    type: 'group',
    duration: 60,
    price: 10000,
    maxStudents: 3,
    isActive: true,
  },
  {
    id: 'pkg-003',
    title: 'One-to-One English Coaching',
    description:
      'Personalized English speaking practice focused on the student’s specific goals and needs.',
    level: 'Advanced',
    type: 'one-to-one',
    duration: 60,
    price: 20000,
    maxStudents: 1,
    isActive: true,
  },
];

export {packages}