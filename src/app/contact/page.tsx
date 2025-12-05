"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error";
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "knealearn@gmail.com",
      subDetails: "We reply within 24 hours",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "(+855) 964-735-981",
      subDetails: "Mon-Fri 8am to 11pm PST",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Learning Street",
      subDetails: "San Francisco, CA 94102",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Friday",
      subDetails: "9:00 AM - 6:00 PM PST",
      color: "from-orange-400 to-red-500",
    },
  ];

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        'Simply browse our course catalog, click on a course you\'re interested in, and click "Enroll Now".',
    },
    {
      question: "Can I get a refund?",
      answer:
        "Yes! We offer a 30-day money-back guarantee on all courses. Contact us for a full refund.",
    },
    {
      question: "Do I get a certificate?",
      answer:
        "Yes, you'll receive a certificate of completion for each course you finish.",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        showToast("Message sent successfully!", "success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        showToast("Failed to send message: " + data.message, "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Something went wrong. Please try again later.", "error");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 pt-20 overflow-hidden">
      {/* Floating Orbs Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full blur-3xl animate-float-slow" />
        <div
          className="absolute top-16 right-16 w-64 h-64 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-8 left-1/3 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Toast Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={`px-4 py-3 rounded shadow text-white flex items-center justify-between min-w-[250px] ${
                toast.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
              role="alert"
            >
              <span>{toast.message}</span>
              <button
                className="ml-4"
                onClick={() =>
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                }
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 text-center overflow-hidden">
          {/* Background Floating Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -left-32 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-float-slow" />
            <div
              className="absolute top-16 right-16 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute bottom-8 left-1/3 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "4s" }}
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-2xl mx-auto text-gray-700 dark:text-white text-[20px]"
            >
              Have questions? We love to hear from you. Send us a message and we
              will respond as soon as possible.
            </motion.p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 text-center bg-gray-100 dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 rounded-3xl border-0">
                    <div
                      className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center`}
                    >
                      <info.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-gray-900 dark:text-white mb-2">
                      {info.title}
                    </h3>
                    <p className="text-gray-900 dark:text-white mb-1">
                      {info.details}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {info.subDetails}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Form & Map Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-6 md:p-8 bg-white dark:bg-gray-800 border-0">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-gray-900 dark:text-white">
                        Send us a Message
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        We will get back to you soon
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-900 dark:text-white mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-900 dark:text-white mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-gray-900 dark:text-white mb-2"
                      >
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="course">Course Question</option>
                        <option value="technical">Technical Support</option>
                        <option value="billing">Billing Issue</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-gray-900 dark:text-white mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg py-3 flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" /> Send Message
                    </button>
                  </form>
                </Card>
              </motion.div>

              {/* Map & FAQs */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="overflow-hidden bg-white dark:bg-gray-800 h-64 border-0">
                    <iframe
                      title="STAD Co., Ltd. ‎Phnom Penh Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.6!2d104.9014024!3d11.585256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951e96d257a6f%3A0x6b66703c5fc0c7cc!2sScience+and+Technology+Advanced+Development+Co.,+Ltd.!5e0!3m2!1sen!2skh!4v1699999999999!5m2!1sen!2skh"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      className="rounded-lg"
                    />
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Card className="p-6 bg-white dark:bg-gray-800 border-0">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                        <HelpCircle className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-gray-900 dark:text-white">
                        Quick Answers
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {faqs.map((faq, index) => (
                        <div
                          key={index}
                          className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                        >
                          <h3 className="text-gray-900 dark:text-white mb-2 text-[20px]">
                            {faq.question}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-200 text-[18px] ">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 rounded-lg border border-gray-300 dark:border-gray-700">
                      View All FAQs
                    </button>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
