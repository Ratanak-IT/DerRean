import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// 📌 GET — Fetch all courses
export async function GET() {
  const { data, error } = await supabase.from("courses").select("*");

  if (error) {
    console.error("GET Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// 📌 POST — Add a new course
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, instructor, image, instructorimage, price, originalprice, category, duration } = body;

    if (!title || !instructor || !price || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("courses")
      .insert([
        {
          title,
          instructor,
          image,
          instructorimage,
          price: Number(price),
          originalprice: originalprice ? Number(originalprice) : null,
          category,
          duration,
          created_at: new Date(),
        },
      ])
      .select();

    if (error) {
      console.error("POST Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Course added successfully", course: data[0] }, { status: 201 });
  } catch (err) {
    console.error("POST Exception:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// 📌 DELETE — Delete a course by ID
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("courses")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("DELETE Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "No rows deleted — check RLS policy" }, { status: 400 });
    }

    return NextResponse.json({ message: "Course deleted successfully", deleted: data[0] });
  } catch (err) {
    console.error("DELETE Exception:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// 📌 PUT — Update a course by ID
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, instructor, image, instructorimage, price, originalprice, category, duration } = body;

    if (!id) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("courses")
      .update({
        title,
        instructor,
        image,
        instructorimage,
        price: price ? Number(price) : undefined,
        originalprice: originalprice ? Number(originalprice) : undefined,
        category,
        duration,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("PUT Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "No rows updated — check RLS policy" }, { status: 400 });
    }

    return NextResponse.json({ message: "Course updated successfully", course: data[0] });
  } catch (err) {
    console.error("PUT Exception:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
