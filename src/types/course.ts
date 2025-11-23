// types/course.ts
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export interface Course {
  id: string; // UUID from Supabase
  title: string;
  instructor: string;
  description: string;
  category: string;
  level: CourseLevel;
  duration: string;
  lessons: number;
  price: number;
  originalprice: number | null;
  image: string;
  instructorimage: string;
  content: string; // e.g., "• Learn React\n• Build apps\n• Deploy"
  created_at?: string;
  updated_at?: string | null;
}
