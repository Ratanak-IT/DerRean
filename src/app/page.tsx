import HomeIndex from "@/components/homepage/HomeIndex";
export const metadata = {
  title: "PlovRean Academy - Learn Programming & Design in Khmer",
  description: "Master React, Node.js, web design & more with courses in Khmer and English.",
  openGraph: {
    title: "PlovRean Academy",
    description: "Cambodia's #1 platform for learning programming in Khmer",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://plovrean.vercel.app",
    images: [{ url: "/linkshow.png", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function Home() {
  return (
        <HomeIndex />
  );
}