// app/page.tsx
import { HeroSection } from "@/components/hero/HeroSection";
import { CourseCategories } from "@/components/coursecard/CourseCategories";
import CourseCard from "@/components/coursecard/CourseCard";
import OurContent from "@/components/ourcontent/OurContent";
// FIXED: Correct import
  // ← This was wrong!

export const metadata = {
  title: "KneaLearn Academy - Learn Programming & Design in Khmer",
  description: "Master React, Node.js, web design & more with courses in Khmer and English.",
  openGraph: {
    title: "KneaLearn Academy",
    description: "Cambodia's #1 platform for learning programming in Khmer",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://knealearn.vercel.app",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CourseCategories />

      <section className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OurContent
            title="Featured Courses"
            text="Hand-picked courses to help you become a pro developer"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            <CourseCard limit={8} />
          </div>
        </div>
      </section>
    </>
  );
}
