import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { getDashboardData } from "@/app/actions";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/");
  }

  // Fetch initial data with short_term
  const initialData = await getDashboardData("short_term");

  return <DashboardClient initialData={initialData} session={session} />;
}
