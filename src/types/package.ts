type Level = "Beginner" | "Intermediate" | "Advanced"
type Type = "group" | "one-to-one"

interface LessonPackage {
    id: string;
    title: string;
    description: string;
    level: Level;
    type: Type;
    duration: number;
    price: number;
    maxStudents: number;
    isActive: boolean;
}

interface CreateLessonPackage {
    title: string;
    description: string;
    level: Level;
    type: Type;
    duration: number;
    price: number;
    maxStudents: number;
    isActive: boolean;
}
export {LessonPackage, CreateLessonPackage}