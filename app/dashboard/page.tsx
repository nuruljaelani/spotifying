import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { getDashboardData } from "@/app/actions";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  // Fetch initial data with short_term
  const initialData = await getDashboardData("short_term");

  return <DashboardClient initialData={initialData} session={session} />;
}
