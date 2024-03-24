import { auth } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  auth().protect();
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
