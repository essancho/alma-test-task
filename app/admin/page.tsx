import { redirect } from "next/navigation";
export default async function AdminPage() {
  redirect("/admin/leads");
  return null;
}

