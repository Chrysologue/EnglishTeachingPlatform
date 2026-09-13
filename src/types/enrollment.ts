type EnrollmentStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed';

interface Enrollment {
  id: string;
  studentId: string;
  sessionId: string;
  status: EnrollmentStatus;
  enrolledAt: string;
}

interface CreateEnrollment {
  studentId: string;
  sessionId: string;
}

export { Enrollment, CreateEnrollment };