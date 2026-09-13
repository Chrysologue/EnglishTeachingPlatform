type SessionStatus = 'scheduled' | 'completed' | 'cancelled';

interface TeachingSession {
  id: string;
  packageId: string;
  date: string;
  startTime: string;
  endTime: string;
  maxStudents: number;
  meetingLink: string;
  status: SessionStatus;
}

interface CreateTeachingSession {
  packageId: string;
  date: string;
  startTime: string;
  endTime: string;
  maxStudents: number;
  meetingLink: string;
}

export { TeachingSession, CreateTeachingSession };