import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import { SettingsForm } from "./components/settings-form";

const SettingsPage = async ({ params }: { params: { taxiparkId: string } }) => {
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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={taxipark} />
      </div>
    </div>
  );
};

export default SettingsPage;
