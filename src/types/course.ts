// types/course.ts
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export interface Course {
  id: string; // UUID
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
  enrolled: number | null;
  instructorimage: string;
  rating: number | null;
  reviews: number | null;
  students: number | null;
  content: string; // stored as JSON string in Supabase
}
export interface CourseContent {
  overview: string;
  curriculum: string[];
  requirements: string[];
}
