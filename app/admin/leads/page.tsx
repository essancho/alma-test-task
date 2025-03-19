import { LeadsTableWithStore } from "./_components/LeadsTableWithStore";
import { createClient } from "@/lib/supabase/server";

async function getLeads() {
  const supabase = await createClient();
  return await supabase.from("leads").select();
}

export default async function LeadsPage() {
  const { data: leads } = await getLeads();
  return (
    <>
      <LeadsTableWithStore leads={leads || []} />
    </>
  );
}

