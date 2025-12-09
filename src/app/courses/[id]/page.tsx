// app/courses/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Star, Clock, PlayCircle, CheckCircle } from "lucide-react";
import BackButton from "@/components/backbutton/BackButton";
import EnrollButton from "@/components/enrollbutton/EnrollButton";
import { CourseDetailBanner } from "@/components/banner/CourseDetailBanner";
import { Course } from "@/types/course";


export const revalidate = 60; // ISR cache

interface PageProps {
  params: { id: string };
}

// Helper function to extract YouTube video ID
function getYouTubeId(url: string) {
  const regExp =
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : "";
}

// Helper function to check if URL is YouTube
function isYouTube(url: string) {
  return url.includes("youtu");
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Validate ID format
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) notFound();

  // Fetch from Supabase
  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single<Course>();

  if (error || !course) notFound();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white mt-10">
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <BackButton />
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-medium">
              {course.category}
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              {course.title}
            </h1>

            <p className="text-lg lg:text-xl text-white/90 max-w-2xl">
              {course.description}
            </p>

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

            <EnrollButton courseId={course.id} />
          </div>

          {/* Video / Image */}
          {course.video_url ? (
            isYouTube(course.video_url) ? (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(
                    course.video_url
                  )}`}
                  title={course.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-2xl"
                />
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <video
                  src={course.video_url}
                  controls
                  className="w-full h-full rounded-2xl"
                  poster={course.image || "/images/course-placeholder.png"}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )
          ) : (
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={course.image || "/images/course-placeholder.png"}
                alt={course.title}
                width={1200}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          )}
        </div>
      </section>

      <div className="mx-0">
        <CourseDetailBanner
          courseTitle={course.title}
          rating={course.rating ?? 4.8}
          students={course.students ?? 0}
          duration={course.duration ?? "N/A"}
        />
      </div>

      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {course.content?.overview ?? "Overview coming soon..."}
            </p>
          </div>

          {/* Curriculum */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-8">What You Will Learn</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {course.content?.curriculum?.length ? (
                course.content.curriculum.map((c, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <CheckCircle className="text-green-600 mt-0.5" size={24} />
                    <span className="text-gray-800 dark:text-gray-200">{c}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-2">
                  Curriculum coming soon!
                </p>
              )}
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Requirements</h2>
            <ul className="space-y-4">
              {course.content?.requirements?.length ? (
                course.content.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
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
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border dark:border-gray-700">
            <h3 className="text-xl font-bold mb-6">Course Information</h3>
            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-semibold">Instructor:</span> {course.instructor}
              </p>
              <p>
                <span className="font-semibold">Level:</span> {course.level ?? "All Levels"}
              </p>
              <p>
                <span className="font-semibold">Duration:</span> {course.duration ?? "N/A"}
              </p>
              <p>
                <span className="font-semibold">Total Lessons:</span> {course.lessons ?? 0}
              </p>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{course.rating ?? 4.8} / 5.0 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
