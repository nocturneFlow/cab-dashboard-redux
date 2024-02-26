import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import TaxiparkSwitcher from "@/components/taxipark-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ModeToggle } from "./ui/theme-toggle";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const taxiparks = await prismadb.taxipark.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <TaxiparkSwitcher items={taxiparks} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
