type Level = "Beginner" | "Intermediate" | "Advanced"
type Role = "student" | "admin" | "teacher"
interface UserDetails  {
  user_id: string;
  name: string;
  email: string;
  password: string;
  english_level: Level;
  role: Role;
  is_active: boolean;
}
interface CreateUser {
  name: string;
  email: string;
  english_level: Level;
  password: string
}

interface UpdateUser {
  name?: string;
  email?: string,
  english_level?: Level
}

 interface User {
  user_id: string;
  email: string;
  role: Role;
}

interface UserForLogin {
  user_id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  is_active: boolean;
}
export { UserDetails, CreateUser, UpdateUser, User, UserForLogin};
