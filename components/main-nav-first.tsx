"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export function MainNavtest({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.taxiparkId}`,
      label: "Сводка",
      active: pathname === `/${params.taxiparkId}`,
    },
    {
      href: `/${params.taxiparkId}/tables`,
      label: "Таблицы",
      active: pathname === `/${params.taxiparkId}/tables`,
    },
    {
      href: `/${params.taxiparkId}/settings`,
      label: "Настройки",
      active: pathname === `/${params.taxiparkId}/settings`,
    },
  ];
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Сводка</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

// {
//   routes.map((route) => (
//     <Link
//       key={route.href}
//       href={route.href}
//       className={cn(
//         "text-sm font-medium transtion-color hover:text-primary",
//         route.active ? "text-black dark:text-white" : "text-muted-foreground"
//       )}
//     >
//       {route.label}
//     </Link>
//   ));
// }
