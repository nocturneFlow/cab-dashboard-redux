import { auth } from "@clerk/nextjs/server";
import { MainNav } from "@/components/main-nav";
import { redirect } from "next/navigation";
import { ModeToggle } from "./ui/theme-toggle";
import { UserButton, UserProfile } from "@clerk/nextjs";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserButton showName={true} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
