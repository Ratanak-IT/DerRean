// import { Product } from "@/types/producttype";
"use client";
import { CourseCard } from "@/components/coursecard/CourseCard";


// async function getProducts(): Promise<Product[]> {
//   const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
//   return res.json();
// }

export default function ProductsPage() {
  // const products: Product[] = await getProducts();

  return (
    
    <div className="dark:bg-black h-screen">
      <CourseCard onCourseClick={() => {}} />
     </div>
  );
}
