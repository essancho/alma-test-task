import { createClient } from "@supabase/supabase-js";

// Add Admin Auth things later

// Initializing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

