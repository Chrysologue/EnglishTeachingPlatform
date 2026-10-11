type SessionStatus = 'scheduled' | 'completed' | 'cancelled';
type Level = 'Beginner' | 'Intermediate' | 'Advanced';
type Type = 'group' | 'one-to-one';

interface TeachingSession {
  session_id: string;
  package_id: string;
  date: string;
  start_time: string;
  end_time: string;
  max_students: number;
  meeting_link: string;
  status: SessionStatus;
}

interface CreateTeachingSession {
  package_id: string;
  date: string;
  start_time: string;
  end_time: string;
  max_students: number;
  meeting_link: string;
}

interface UpdateTeachingSession {
  date?: string;
  start_time?: string;
  end_time?: string;
  max_students?: number;
  meeting_link?: string;
  status?: SessionStatus;
}

interface SessionWithPackage extends TeachingSession {
  title: string;
  description: string;
  level: Level;
  type: Type;
  duration: number;
  price: number;
}
export {
  TeachingSession,
  CreateTeachingSession,
  UpdateTeachingSession,
  SessionWithPackage,
};
