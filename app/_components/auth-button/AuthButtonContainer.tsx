import { createClient } from "@/lib/supabase/server";
import AuthButton from "./AuthButton";

export default async function AuthButtonContainer() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  return <AuthButton isLoggedIn={isLoggedIn} />;
}

