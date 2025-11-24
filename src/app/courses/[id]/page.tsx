// app/courses/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { PlayCircle, Star, Clock, CheckCircle } from "lucide-react";
import BackButton from "@/components/backbutton/BackButton";
import EnrollButton from "@/components/enrollbutton/EnrollButton";

export const revalidate = 60; // ISR caching

interface PageProps {
  params: { id: string };
}

interface CourseContent {
  overview: string;
  curriculum: string[];
  requirements: string[];
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  image?: string;
  instructor: string;
  category: string;
  level?: string;
  duration?: string;
  lessons?: number;
  rating?: string;
  content?: string;
}

export default async function CourseDetailPage({ params }: PageProps) {
  // ✅ Here you can "await" fetching data, but not params itself
  const { id } = await params;

  // Validate UUID
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) notFound();

  // Fetch course from Supabase
  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single<Course>();

  if (error || !course) {
    console.error("Course not found:", error?.message);
    notFound();
  }

  // Parse content
  let content: CourseContent = { overview: "", curriculum: [], requirements: [] };
  if (course.content) {
    try {
      content =
        typeof course.content === "string"
          ? JSON.parse(course.content)
          : course.content;
    } catch {
      content = { overview: course.content?.toString() || "", curriculum: [], requirements: [] };
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white mt-15">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <BackButton />
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-medium">
              {course.category}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">{course.title}</h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-2xl">{course.description}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm lg:text-base">
              <div className="flex items-center gap-2">
                <Star className="fill-yellow-400 text-yellow-400" size={20} />
                <span className="font-bold">{course.rating ?? "4.8"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{course.duration ?? "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <PlayCircle size={20} />
                <span>{course.lessons ?? 0} lessons</span>
              </div>
            </div>

            {/* Enroll Button */}
            <EnrollButton courseId={course.id} />
          </div>

          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={course.image || "/images/course-placeholder.png"}
              alt={course.title}
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
              placeholder="blur"
              blurDataURL="/images/course-placeholder.png"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{content.overview}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-8">What You Will Learn</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {content.curriculum.length > 0 ? (
                content.curriculum.map((point, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={24} />
                    <span className="text-gray-800 dark:text-gray-200">{point}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-2">Curriculum coming soon!</p>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Requirements</h2>
            <ul className="space-y-4">
              {content.requirements.length > 0 ? (
                content.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">{req}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No requirements listed.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-6">Course Information</h3>
            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <p><span className="font-semibold">Instructor:</span> {course.instructor}</p>
              <p><span className="font-semibold">Level:</span> {course.level ?? "All Levels"}</p>
              <p><span className="font-semibold">Duration:</span> {course.duration ?? "N/A"}</p>
              <p><span className="font-semibold">Total Lessons:</span> {course.lessons ?? 0}</p>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{course.rating ?? "4.8"} / 5.0 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
