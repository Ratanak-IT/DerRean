// components/CourseDetail.tsx
"use client";

import Image from "next/image";
import { CheckCircle, Clock, Users, Star, BookOpen, Award } from "lucide-react";


type CourseContent = {
  overview: string;
  curriculum: string[];
  requirements: string[];
};

export type CourseType = {
  id: number;
  title: string;
  instructor: string;
  image: string;
  category: string;
  description: string;
  level: string;
  duration: string;
  lessons: number;
  enrolled: number;
  rating: number;
  content: CourseContent;
};

type CourseDetailProps = {
  course: CourseType;
};

export default function CourseDetail({ course }: CourseDetailProps) {
  const content = course.content || { overview: "", curriculum: [], requirements: [] };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <a href="/dashboard" className="flex items-center gap-2 text-white hover:text-gray-200 mb-6 transition-colors">
            ← Back
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{course.category}</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{course.description}</p>

              <div className="flex items-center gap-6 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.enrolled.toLocaleString()} enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="px-8 py-3 rounded-lg font-medium bg-white text-blue-600 hover:bg-gray-100 transition-colors">
                  Enroll Now - Free
                </button>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>{course.level}</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <Image
                src={course.image}
                alt={course.title}
                width={600}
                height={400}
                className="w-full h-80 object-cover rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h2>
              <p className="text-gray-700 leading-relaxed">{content.overview}</p>
            </div>

            {/* Curriculum */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What You will Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.curriculum.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-3">
                {content.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h3 className="font-bold text-gray-900 mb-4">Course Information</h3>
              <p className="text-sm text-gray-600 mb-1">Instructor</p>
              <p className="font-medium text-gray-900">{course.instructor}</p>
              <p className="text-sm text-gray-600 mt-4">Level</p>
              <p className="font-medium text-gray-900">{course.level}</p>
              <p className="text-sm text-gray-600 mt-4">Duration</p>
              <p className="font-medium text-gray-900">{course.duration}</p>
              <p className="text-sm text-gray-600 mt-4">Lessons</p>
              <p className="font-medium text-gray-900">{course.lessons}</p>
              <p className="text-sm text-gray-600 mt-4">Enrolled</p>
              <p className="font-medium text-gray-900">{course.enrolled.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
