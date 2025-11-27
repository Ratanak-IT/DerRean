"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Zap,
  Clock,
  Users,
  Star,
  Target,
} from "lucide-react";

interface CourseDetailBannerProps {
  courseTitle: string;
  rating: number;
  students: number;
  duration: string;
}

const highlights = [
  {
    icon: Trophy,
    title: "Industry-Recognized",
    description: "Get certified and boost your career",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Zap,
    title: "Learn by Doing",
    description: "Build real-world projects as you learn",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "Career Focused",
    description: "Skills that employers want",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Join the Community",
    description: "Connect with learners worldwide",
    gradient: "from-green-500 to-emerald-500",
  },
];

export function CourseDetailBanner({
  rating,
  students,
  duration,
}: CourseDetailBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % highlights.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  const goPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length);
  const goNext = () =>
    setCurrentIndex((prev) => (prev + 1) % highlights.length);

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8 overflow-hidden">
      <div className="relative h-32 overflow-hidden">
        {highlights.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentIndex
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10`}
            />
            <div className="relative h-full flex items-center justify-between px-8">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
                >
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-8">
                <div className="text-center">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl">{rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 mb-1">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-2xl">{students}</span>
                  </div>
                  <p className="text-sm text-gray-600">Students</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 mb-1">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span className="text-2xl">{duration}</span>
                  </div>
                  <p className="text-sm text-gray-600">Duration</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={goPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/120 dark:bg-white/40 rounded-full shadow-md"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/120 dark:bg-white/40 rounded-full shadow-md"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
