import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { taxiparkId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const taxipark = await prismadb.taxipark.findFirst({
    where: {
      id: params.taxiparkId,
      userId: userId,
    },
  });

  if (!taxipark) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
    </>
  );
}
