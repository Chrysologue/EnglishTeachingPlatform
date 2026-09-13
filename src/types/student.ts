interface Student {
  id: string;
  name: string;
  email: string;
  englishLevel: string;
  isActive: boolean;
}
interface CreateStudent {
  name: string;
  email: string;
  englishLevel: string
}
export { Student, CreateStudent };
