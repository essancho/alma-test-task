import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
// Get wouldn't work, POST works tho
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: leads } = await supabase.from("leads").select();
    return NextResponse.json({ leads });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch leads", error });
  }
}
// Post works, GET decided to stop working completely
export async function POST(request: NextRequest) {
  // Check API key

  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ["first_name", "last_name", "email", "country"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const newLead = {
      ...body,
      status: body.status || "PENDING",
      created_at: new Date().toISOString(),
    };

    // Insert into Supabase
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("leads")
      .insert(newLead)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ lead: data }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check API key

  try {
    const supabase = await createClient();

    const id = params.id;

    const updates = await request.json();

    delete updates.id;
    delete updates.created_at;

    updates.updated_at = new Date().toISOString();
    const { data, error } = await supabase
      .from("leads")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ lead: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    );
  }
}

