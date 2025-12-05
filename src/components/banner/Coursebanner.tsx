'use client';

import { useState, useEffect, useRef } from 'react';
import { Code2, Star } from 'lucide-react';

const courses = [
  { title: "Full-Stack Web Development", desc: "HTML, CSS, JavaScript, React, Node.js & MongoDB", students: "248K+", rating: 4.9 },
  { title: "Python for Beginners to Advanced", desc: "Data Science, Automation, Web Apps with Django", students: "189K+", rating: 4.8 },
  { title: "JavaScript Algorithms & Data Structures", desc: "Master problem-solving for coding interviews", students: "312K+", rating: 5.0 },
  { title: "React + Next.js – Build Real Projects", desc: "Modern web apps with App Router, Server Actions", students: "156K+", rating: 4.9 },
];

const extendedCourses = [...courses, ...courses, ...courses];
const totalSlides = courses.length;

export default function CourseBanner() {
  const [index, setIndex] = useState(totalSlides);
  const [enableTransition, setEnableTransition] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translate, setTranslate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging) setIndex(prev => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isDragging]);

  // Seamless loop control
  useEffect(() => {
    let animation: number;
    // eslint-disable-next-line prefer-const
    animation = requestAnimationFrame(() => {
      if (index >= totalSlides * 2) {
        setEnableTransition(false);
        setIndex(totalSlides);
      } else if (index < totalSlides) {
        setEnableTransition(false);
        setIndex(totalSlides * 2 - 1);
      } else {
        setEnableTransition(true);
      }
    });
    return () => cancelAnimationFrame(animation);
  }, [index]);

  const displayIndex = index % totalSlides;

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setTranslate(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTranslate(e.clientX - startX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (translate > 50) setIndex(i => i - 1); // swipe right → prev
    else if (translate < -50) setIndex(i => i + 1); // swipe left → next
    setTranslate(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setTranslate(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setTranslate(e.touches[0].clientX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (translate > 50) setIndex(i => i - 1);
    else if (translate < -50) setIndex(i => i + 1);
    setTranslate(0);
  };

  return (
    <div className="relative w-full h-64 md:h-70 lg:h-96 overflow-hidden mt-10 md:mt-20 lg:mt-10 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors">

      {/* Background floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-16 right-16 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-8 left-1/3 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="flex h-full cursor-grab select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(-${displayIndex * 100}%) translateX(${translate}px)`,
          transition: enableTransition && !isDragging ? 'transform 0.7s ease-in-out' : 'none',
        }}
      >
        {extendedCourses.map((course, i) => (
          <div key={i} className="w-full flex-shrink-0">
            <div className="h-full flex items-center px-4 md:px-12">
              <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-6 lg:gap-12 items-center">
                
                {/* Course Info */}
                <div className="text-gray-900 dark:text-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 className="w-6 h-6 text-green-500" />
                    <span className="font-mono text-green-500 text-sm tracking-wider">Featured Course</span>
                  </div>

                  <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight">{course.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mb-4">{course.desc}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm mb-5">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">{course.rating} ({course.students})</span>
                    </div>
                    <span className="text-green-500 font-medium">100% Free • Certificate Included</span>
                  </div>
                </div>

                {/* Code preview box */}
                <div className="hidden md:block">
                  <div className="bg-gray-100 dark:bg-gray-900/90 backdrop-blur border border-gray-300 dark:border-gray-800 rounded-xl p-4 md:p-6 font-mono text-sm shadow-lg">
                    <pre className="text-gray-700 dark:text-gray-300">{`const future = "yours to build";

console.log(future);`}</pre>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {courses.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(totalSlides + i)}
            className={`transition-all h-2 rounded-full ${displayIndex === i ? 'w-8 bg-green-500' : 'w-2 bg-gray-400 dark:bg-gray-600'}`}
          />
        ))}
      </div>
    </div>
  );
}
