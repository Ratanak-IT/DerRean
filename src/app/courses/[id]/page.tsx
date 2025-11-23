import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Course } from "@/types/course";
import { Clock, PlayCircle, Users, Award, CheckCircle } from "lucide-react";

export const revalidate = 60; // Revalidate every 60 seconds (optional)
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailPage({
  params,
}: PageProps & {
  params: { id: string };
}) {
  const { id } = await params;

  // Validate UUID format (optional but safe)
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    notFound();
  }

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single<Course>();

  if (error || !course) {
    console.error("Course not found or error:", error?.message);
    notFound();
  }

  // Parse bullet points from content
  const learningPoints =
    typeof course.content === "string"
      ? course.content
          .split("\n")
          .map((line) => line.trim())
          .filter(
            (line) =>
              line.startsWith("•") ||
              line.startsWith("-") ||
              line.startsWith("*")
          )
      : [];

  const discount = course.originalprice
    ? Math.round(
        ((course.originalprice - course.price) / course.originalprice) * 100
      )
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="flex flex-wrap gap-4">
                <span className="px-5 py-2 bg-white/20 backdrop-blur rounded-full font-medium">
                  {course.category}
                </span>
                <span className="flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur rounded-full">
                  <Award size={20} />
                  {course.level}
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                {course.title}
              </h1>

              <p className="text-xl lg:text-2xl text-gray-100 max-w-4xl leading-relaxed">
                {course.description}
              </p>

              <div className="flex items-center gap-6">
                {course.instructorimage ? (
                  <Image
                    src={course.instructorimage}
                    alt={course.instructor}
                    width={80}
                    height={80}
                    className="rounded-full ring-4 ring-white/30"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-white">
                    N/A
                  </div>
                )}
                <div>
                  <p className="text-sm opacity-80">Created by</p>
                  <p className="text-2xl font-bold">{course.instructor}</p>
                </div>
              </div>

              {/* Price Card */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md border border-white/20">
                <div className="flex items-end gap-4 mb-6">
                  <span className="text-6xl font-bold">${course.price}</span>
                  {discount > 0 && (
                    <>
                      <span className="text-3xl line-through opacity-70">
                        ${course.originalprice}
                      </span>
                      <span className="bg-red-500 px-4 py-2 rounded-full font-bold text-lg">
                        {discount}% OFF
                      </span>
                    </>
                  )}
                </div>

                <button className="w-full bg-white text-purple-900 py-5 rounded-2xl font-bold text-xl hover:bg-gray-100 transition transform hover:scale-105 shadow-2xl">
                  Enroll Now
                </button>

                <div className="mt-6 space-y-3 text-sm">
                  {[
                    "30-Day Money-Back Guarantee",
                    "Lifetime Access",
                    "Certificate Included",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle size={22} className="text-green-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Course Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white/20">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <button className="absolute bottom-8 left-8 right-8 bg-white/20 backdrop-blur-lg px-10 py-6 rounded-2xl hover:bg-white/30 transition flex items-center justify-center gap-4 group">
                  <PlayCircle
                    size={64}
                    className="group-hover:scale-110 transition"
                  />
                  <span className="text-2xl font-bold">
                    Preview This Course
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* What You'll Learn */}
            <div className="bg-white rounded-3xl p-10 shadow-2xl border">
              <h2 className="text-4xl font-bold mb-10 flex items-center gap-4">
                <CheckCircle className="text-green-600" size={48} />
                What You will Learn
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {learningPoints.length > 0 ? (
  learningPoints.map((point, i) => (
    <div key={i} className="flex gap-5">
      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={28} />
      <span className="text-lg leading-relaxed">{point}</span>
    </div>
  ))
) : (
  <p className="text-gray-500 col-span-2">
    No learning outcomes listed yet.
  </p>
)}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Clock, value: course.duration, label: "Duration" },
                {
                  icon: PlayCircle,
                  value: `${course.lessons} lessons`,
                  label: "Lessons",
                },
                { icon: Users, value: "12.5k+", label: "Students" },
                { icon: Award, value: course.level, label: "Level" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition"
                >
                  <stat.icon
                    className="mx-auto mb-4 text-indigo-600"
                    size={48}
                  />
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-10 shadow-2xl border sticky top-6">
              <h3 className="text-3xl font-bold mb-8">This Course Includes</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: PlayCircle,
                    text: `${course.duration} on-demand video`,
                  },
                  { icon: Award, text: "Certificate of completion" },
                  { icon: Clock, text: "Full lifetime access" },
                  { icon: Users, text: "Access on mobile and desktop" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-5">
                    <item.icon className="text-indigo-600" size={36} />
                    <span className="text-lg font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
