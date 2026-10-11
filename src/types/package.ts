type Level = 'Beginner' | 'Intermediate' | 'Advanced';
type Type = 'group' | 'one-to-one';

interface LessonPackage {
  package_id: string;
  title: string;
  description: string;
  level: Level;
  type: Type;
  duration: number;
  price: number;
  is_active: boolean;
}

interface CreateLessonPackage {
  title: string;
  description: string;
  level: Level;
  type: Type;
  duration: number;
  price: number;
}

interface UpdatePackage {
  title?: string;
  description?: string;
  level? : Level;
  type?: Type;
  duration?: number;
  price?: number;
  is_active?: boolean
}
export { LessonPackage, CreateLessonPackage, UpdatePackage };
