"use client";

import {
  Target,
  Heart,
  Zap,
  Shield,
  Code2,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const values = [
  {
    icon: Target,
    title: "Mission Driven",
    description:
      "Democratizing coding education for everyone, everywhere — no barriers.",
  },
  {
    icon: Heart,
    title: "Community First",
    description:
      "Learners support each other, share knowledge, and grow together as one.",
  },
  {
    icon: Zap,
    title: "Quality Content",
    description:
      "Expert-crafted courses, always up-to-date and deeply practical.",
  },
  {
    icon: Shield,
    title: "Always Free",
    description: "100% free forever. No ads. No paywalls. No exceptions.",
  },
];

const team = [
  {
    name: "Thai Ratanak",
    role: "Front-end & Backend",
    img: "/images/ratanak.png",
  },
  { name: "Chhom Titsela", role: "Footer & Auth", img: "/images/sela.png" },
  {
    name: "Chanthol Vireakratanak",
    role: "Banner",
    img: "/images/virakratanak.png",
  },
  { name: "Hin Somphors", role: "Footer", img: "/images/sompors.png" },
  { name: "Hean Sitha", role: "Detail page", img: "/images/sitha.png" },
  { name: "Chit Chimy", role: "UI Design", img: "/images/chimy.png" },
  { name: "Path Minea", role: "Quiz page", img: "/images/minea.png" },
  { name: "Huort LeangHom", role: "Wishlist", img: "/images/leanghorm.png" },
];

const roadmapSteps = [
  {
    title: "Foundations",
    duration: "Weeks 1–4",
    topics: ["HTML & CSS", "JavaScript Basics", "Git & GitHub"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Frontend Mastery",
    duration: "Weeks 5–12",
    topics: ["React.js", "State & APIs", "Responsive Design"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Backend Development",
    duration: "Weeks 13–20",
    topics: ["Node.js", "Databases", "Auth & APIs"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Advanced Topics",
    duration: "Weeks 21–28",
    topics: ["TypeScript", "Testing", "DevOps"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Specialization",
    duration: "Weeks 29–36",
    topics: ["Mobile", "Data Science", "AI/ML"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Career Ready",
    duration: "Weeks 37–40",
    topics: ["Portfolio", "Interviews", "Job Hunt"],
    color: "from-rose-500 to-pink-500",
  },
];

export default function AboutPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* HERO */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-[#0d1117] dark:to-[#111827]">
        {/* Subtle animated background orbs */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 -left-40 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-10 -right-40 w-80 h-80 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-400/10 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
    </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-indigo-100/70 dark:bg-indigo-900/40 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-700/50 mb-10">
              <Code2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                About PlovRean
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="block text-gray-900 dark:text-white">
                Explore the Path to
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                Your Coding Journey
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-10">
              Discover a clear roadmap designed to guide you through the world
              of programming.
              <strong className="text-gray-900 dark:text-white">
                Learn step by step, explore recommended paths, and track your
                progress — all without structured lessons, purely as a learning
                guide.
              </strong>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <button
                onClick={() => router.push("/course")}
                className="group px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "100K+", label: "Active Students" },
              { num: "50+", label: "Free Courses" },
              { num: "1M+", label: "Lessons Completed" },
              { num: "95%", label: "Success Rate" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  {stat.num}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-6xl font-bold mb-8">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
                <p>
                  Founded in 2020 with a radical idea:{" "}
                  <strong>coding education should be free for everyone</strong>.
                </p>
                <p>
                  What began as a passion project has grown into one of the
                  largest free learning platforms in the world — serving over
                  100,000 students from 180+ countries.
                </p>
                <p>
                  We’ve helped thousands launch careers at top tech companies,
                  start their own startups, and discover the joy of building
                  with code.
                </p>
              </div>
              <div className="flex flex-wrap gap-6 mt-10">
                {[
                  "100% Free Forever",
                  "No Ads",
                  "Certificates Included",
                  "Community Driven",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-1">
                <div className="bg-gray-100 dark:bg-gray-900 rounded-3xl p-8 lg:p-12 text-center">
                  <Code2 className="w-20 h-20 mx-auto mb-6 text-indigo-600 dark:text-indigo-400" />
                  <blockquote className="text-2xl lg:text-3xl font-bold italic">
                    “The best way to predict the future is to code it.”
                  </blockquote>
                  <p className="mt-6 text-gray-600 dark:text-gray-400">
                    — The PlovRean Team
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">
              Your Learning Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From zero to career-ready in 10 months
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roadmapSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
                <div className="p-8">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-2xl font-bold mb-6`}
                  >
                    {i + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {step.duration}
                  </p>
                  <ul className="space-y-3">
                    {step.topics.map((topic, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {topic}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The principles that define us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-[25px] font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-100 ">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Passionate humans building the future of education
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="text-center group relative"
              >
                {/* === Small Avatar === */}
                <div className="relative w-40 h-40 mx-auto mb-6 cursor-pointer">
                  {/* Hover glow ring */}
                  <div
                    className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                        rounded-full blur-xl opacity-0 group-hover:opacity-70 
                        transition-all duration-500 group-hover:scale-110"
                  />

                  {/* Avatar */}
                  <div
                    className="relative w-full h-full rounded-full overflow-hidden 
                        ring-4 ring-white dark:ring-gray-900 shadow-2xl 
                        group-hover:ring-8 group-hover:shadow-3xl transition-all duration-400"
                  >
                    <Image
                      src={member.img}
                      alt={member.name}
                      width={900}
                      height={900}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* ONLINE INDICATOR - Beautiful & Modern */}
                  {member && (
                    <div className="absolute bottom-3 right-3">
                      <span className="relative flex h-9 w-9">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-9 w-9 bg-emerald-500 border-4 border-white dark:border-gray-900 shadow-lg" />
                      </span>
                    </div>
                  )}
                </div>

                {/* Name & Role */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                  {member.role}
                </p>

                {/* === BIG FULL PORTRAIT ON HOVER === */}
                <div
                  className="pointer-events-none fixed inset-0 flex items-center justify-center z-50 
                      opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 
                      transition-all duration-500 ease-out"
                >
                  <div className="relative">
                    {/* Backdrop blur */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-lg rounded-3xl" />

                    {/* Large portrait - FULL head + shoulders */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-8 ring-white/90">
                      <Image
                        src={member.img}
                        alt={member.name}
                        width={540}
                        height={660}
                        className="w-[420px] h-[540px] sm:w-[480px] sm:h-[600px] object-cover object-top"
                        priority
                      />

                      {/* Online badge on large image too */}
                      {member && (
                        <div className="absolute top-6 right-6">
                          <span className="relative flex h-12 w-12">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                            <span className="relative inline-flex rounded-full h-12 w-12 bg-emerald-500 border-4 border-white shadow-xl" />
                          </span>
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white text-sm font-medium bg-black/60 px-3 py-1 rounded-full">
                            Online now
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Name tag */}
                    <div
                      className="absolute -bottom-16 left-1/2 -translate-x-1/2 
                          bg-white dark:bg-gray-900 px-10 py-5 rounded-full 
                          shadow-2xl border border-gray-200 dark:border-gray-700"
                    >
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {member.name}
                      </p>
                      <p className="text-base font-medium text-gray-600 dark:text-gray-400">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
