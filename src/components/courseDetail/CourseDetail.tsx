'use client';

import { motion } from 'framer-motion';
import { 
  X, Play, Star, Clock, Users, Award, CheckCircle, 
  Download, Smartphone, Infinity, ChevronDown,
  ChevronUp, Heart, Share2, BookOpen,
  Badge
} from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { Card } from '../ui/card';

interface CourseDetailProps {
  courseId: number;
  onClose: () => void;
}

export function CourseDetail({ courseId, onClose }: CourseDetailProps) {
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor' | 'reviews'>('overview');
  const [showVideo, setShowVideo] = useState(false);

  const courseList = [
    {
      id: courseId,
      title: 'Complete Web Development Bootcamp 2025',
      subtitle: 'Learn HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and become a full-stack developer.',
      instructor: 'Sarah Johnson',
      instructorTitle: 'Senior Software Engineer at Tech Corp',
      instructorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      instructorBio: 'Sarah has over 10 years of experience in web development and has taught over 100,000 students worldwide. She specializes in making complex topics simple and enjoyable.',
      instructorCourses: 12,
      instructorStudents: 250000,
      rating: 4.9,
      reviews: 12450,
      students: 45230,
      price: 89.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&q=80',
      category: 'Web Development',
      level: 'Beginner',
      duration: '42 hours',
      lectures: 320,
      lastUpdated: 'January 2025',
      language: 'English',
      bestseller: true,
    },
  ];

  const course = courseList.find(c => c.id === courseId) || courseList[0];

  const whatYouLearn = [
    'Build responsive websites from scratch using HTML5, CSS3, and JavaScript',
    'Master modern React including Hooks, Context API, and Redux',
    'Create full-stack applications with Node.js, Express, and MongoDB',
    'Understand Git version control and GitHub workflows',
    'Deploy applications to production using various hosting platforms',
    'Implement authentication and authorization in web applications',
    'Work with REST APIs and integrate third-party services',
    'Follow industry best practices and write clean, maintainable code',
  ];

  const curriculum = [
    {
      title: 'Introduction to Web Development',
      lectures: 15,
      duration: '2h 30m',
      lessons: [
        { title: 'Welcome to the Course', duration: '5:23', preview: true },
        { title: 'How the Web Works', duration: '12:45', preview: true },
        { title: 'Setting Up Your Development Environment', duration: '18:32', preview: false },
        { title: 'Your First HTML Page', duration: '15:20', preview: false },
      ],
    },
    {
      title: 'HTML Fundamentals',
      lectures: 25,
      duration: '4h 15m',
      lessons: [
        { title: 'HTML Document Structure', duration: '10:15', preview: false },
        { title: 'Working with Text and Headings', duration: '8:45', preview: false },
        { title: 'Links and Images', duration: '12:30', preview: false },
        { title: 'Lists and Tables', duration: '14:20', preview: false },
      ],
    },
    {
      title: 'CSS Styling and Layouts',
      lectures: 30,
      duration: '5h 45m',
      lessons: [
        { title: 'CSS Basics and Selectors', duration: '15:30', preview: false },
        { title: 'Colors and Typography', duration: '12:15', preview: false },
        { title: 'The Box Model', duration: '18:45', preview: false },
        { title: 'Flexbox Layouts', duration: '22:30', preview: false },
      ],
    },
    {
      title: 'JavaScript Programming',
      lectures: 45,
      duration: '8h 30m',
      lessons: [
        { title: 'JavaScript Basics', duration: '20:15', preview: false },
        { title: 'Functions and Scope', duration: '16:45', preview: false },
        { title: 'DOM Manipulation', duration: '25:30', preview: false },
        { title: 'Events and Event Handling', duration: '18:20', preview: false },
      ],
    },
    {
      title: 'React Fundamentals',
      lectures: 40,
      duration: '7h 20m',
      lessons: [
        { title: 'Introduction to React', duration: '14:30', preview: false },
        { title: 'Components and Props', duration: '22:15', preview: false },
        { title: 'State and Lifecycle', duration: '19:45', preview: false },
        { title: 'Hooks in Detail', duration: '28:30', preview: false },
      ],
    },
  ];

  const reviews = [
    {
      id: 1,
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      rating: 5,
      date: '2 weeks ago',
      comment: 'This is hands down the best web development course I\'ve taken. Sarah explains everything clearly and the projects are really practical. I landed my first dev job after completing this course!',
      helpful: 245,
    },
    {
      id: 2,
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      rating: 5,
      date: '1 month ago',
      comment: 'Excellent course! Very comprehensive and well-structured. The instructor is knowledgeable and engaging. Highly recommend for anyone wanting to learn web development.',
      helpful: 189,
    },
    {
      id: 3,
      name: 'David Park',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
      rating: 4,
      date: '2 months ago',
      comment: 'Great content and teaching style. The course covers a lot of ground. Only minor issue is some sections could be updated more frequently, but overall fantastic value.',
      helpful: 156,
    },
  ];

  const requirements = [
    'A computer (Windows, Mac, or Linux)',
    'No prior programming experience needed',
    'Willingness to learn and practice',
    'Internet connection for downloading course materials',
  ];

  const features = [
    { icon: Clock, text: '42 hours on-demand video' },
    { icon: BookOpen, text: '320 lectures' },
    { icon: Download, text: 'Downloadable resources' },
    { icon: Smartphone, text: 'Access on mobile and TV' },
    { icon: Infinity, text: 'Lifetime access' },
    { icon: Award, text: 'Certificate of completion' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-20 right-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Close course detail"
      >
        <X className="w-6 h-6 text-gray-900 dark:text-white" />
      </button>

      {/* Hero Section */}
      <section className="bg-gray-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Badges */}
              <div className="mb-4">
                {course.bestseller && (
                  <Badge className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-0 mb-3">
                    Bestseller
                  </Badge>
                )}
                <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white border-0 ml-2">
                  {course.level}
                </Badge>
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-white mb-4">{course.title}</h1>
              <p className="text-gray-300 mb-6">{course.subtitle}</p>

              {/* Rating & Students */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-yellow-400">{course.rating}</span>
                  <span className="text-gray-300">({course.reviews.toLocaleString()} ratings)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4">
                <Image
                  src={course.instructorImage}
                  alt={course.instructor}
                  className="w-12 h-12 rounded-full"
                  width={48}
                  height={48}
                />
                <div>
                  <p className="text-gray-300">Created by</p>
                  <p className="text-white">{course.instructor}</p>
                </div>
              </div>
            </div>

            {/* Preview Video */}
            <div className="hidden lg:block">
              <Card className="overflow-hidden sticky top-24">
                <div className="relative aspect-video bg-gray-800">
                  <Image
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    width={450}
                    height={253}
                  />
                  <button
                    onClick={() => setShowVideo(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-gray-900 ml-1" />
                    </div>
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/1ATw63UG5Ak?autoplay=1"
              title="Course Preview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Course Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-800 mb-8">
              <div className="flex gap-8 overflow-x-auto">
                {['overview', 'curriculum', 'instructor', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as never)}
                    className={`pb-4 capitalize transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? 'border-b-2 border-indigo-500 text-indigo-500 dark:text-indigo-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 mb-6 bg-white dark:bg-gray-800">
                  <h2 className="text-gray-900 dark:text-white mb-4">What you will learn</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {whatYouLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 mb-6 bg-white dark:bg-gray-800">
                  <h2 className="text-gray-900 dark:text-white mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <span className="text-indigo-500">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6 bg-white dark:bg-gray-800">
                  <h2 className="text-gray-900 dark:text-white mb-4">Description</h2>
                  <div className="text-gray-700 dark:text-gray-300 space-y-4">
                    <p>
                      Welcome to the Complete Web Development Bootcamp! This comprehensive course will take you from complete beginner to professional web developer.
                    </p>
                    <p>
                      You will learn by building real projects and solving real problems. By the end of this course, you will have the skills and confidence to build your own websites and web applications from scratch.
                    </p>
                    <p>
                      This course covers everything you need to know to become a full-stack web developer, including front-end technologies like HTML, CSS, JavaScript, and React, as well as back-end technologies like Node.js, Express, and MongoDB.
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Curriculum Tab */}
            {activeTab === 'curriculum' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 mb-4 bg-white dark:bg-gray-800">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-gray-900 dark:text-white">Course Content</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {curriculum.length} sections • {course.lectures} lectures • {course.duration} total length
                    </p>
                  </div>

                  <div className="space-y-2">
                    {curriculum.map((section, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                        <button
                          onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {expandedSection === index ? (
                              <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            )}
                            <span className="text-gray-900 dark:text-white">{section.title}</span>
                          </div>
                          <span className="text-gray-600 dark:text-gray-400">
                            {section.lectures} lectures • {section.duration}
                          </span>
                        </button>

                        {expandedSection === index && (
                          <div className="border-t border-gray-200 dark:border-gray-700">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <Play className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                  <span className="text-gray-700 dark:text-gray-300">{lesson.title}</span>
                                  {lesson.preview && (
                                    <Badge className="text-indigo-500 border-indigo-500">
                                      Preview
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-gray-600 dark:text-gray-400">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Instructor Tab */}
            {activeTab === 'instructor' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 bg-white dark:bg-gray-800">
                  <div className="flex items-start gap-6 mb-6">
                    <Image
                      src={course.instructorImage}
                      alt={course.instructor}
                      className="w-24 h-24 rounded-full object-cover"
                      width={96}
                        height={96}
                    />
                    <div>
                      <h2 className="text-gray-900 dark:text-white mb-1">{course.instructor}</h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{course.instructorTitle}</p>
                      
                      <div className="flex items-center gap-6 text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span>{course.rating} Instructor Rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{course.instructorStudents.toLocaleString()} Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          <span>{course.instructorCourses} Courses</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300">{course.instructorBio}</p>
                </Card>
              </motion.div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 mb-6 bg-white dark:bg-gray-800">
                  <div className="flex items-center gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-gray-900 dark:text-white mb-2">{course.rating}</div>
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">Course Rating</p>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-20">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-gray-700 dark:text-gray-300">{star}</span>
                            </div>
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400"
                                style={{ width: `${star === 5 ? 85 : star === 4 ? 10 : star === 3 ? 3 : star === 2 ? 1 : 1}%` }}
                              />
                            </div>
                            <span className="text-gray-600 dark:text-gray-400 w-12">
                              {star === 5 ? '85%' : star === 4 ? '10%' : '5%'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <Card key={review.id} className="p-6 bg-white dark:bg-gray-800">
                      <div className="flex items-start gap-4">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                          width={45}
                          height={45}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-gray-900 dark:text-white">{review.name}</h3>
                            <span className="text-gray-500 dark:text-gray-400">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
                          <div className="flex items-center gap-4">
                            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                              Helpful ({review.helpful})
                            </button>
                            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                              Report
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar - Purchase Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 bg-white dark:bg-gray-800">
              <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  width={45}
                    height={25}
                />
                <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-gray-900 ml-1" />
                  </div>
                </button>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-gray-900 dark:text-white">${course.price}</span>
                <span className="text-gray-500 line-through">${course.originalPrice}</span>
                <Badge className="bg-red-500 text-white border-0">
                  {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                </Badge>
              </div>

              <div className="space-y-3 mb-6">
                <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg">
                  Add to Wishlist
                </button>
                <button className="w-full rounded-lg border border-gray-300 dark:border-gray-700">
                  Buy Now
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span>Save</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-gray-900 dark:text-white mb-3">This course includes:</h3>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <feature.icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
