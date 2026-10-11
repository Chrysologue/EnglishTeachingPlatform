type EnrollmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

interface Enrollment {
  enrollment_id: string;
  student_id: string;
  session_id: string;
  status: EnrollmentStatus;
  enrolled_at: string;
}

interface CreateEnrollment {
  session_id: string;
}

export { Enrollment, CreateEnrollment };
