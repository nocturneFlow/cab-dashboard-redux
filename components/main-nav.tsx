"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { CarTaxiFront } from "lucide-react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const tables: { title: string; href: string; description: string }[] = [
    {
      title: "Заявки",
      href: `/${params.taxiparkId}/tables/applications`,
      description: "Текст для пояснения о таблице с заявками",
    },
    {
      title: "Отчеты",
      href: `/${params.taxiparkId}/tables/reports`,
      description: "Текст для пояснения о таблице с отчетами",
    },
    {
      title: "Водители",
      href: `/${params.taxiparkId}/tables/drivers`,
      description: "Текст для пояснения о таблице с водителями",
    },
    {
      title: "Машины",
      href: `/${params.taxiparkId}/tables/cars`,
      description: "Текст для пояснения о таблице с машинами",
    },
    {
      title: "Зарплата",
      href: `/${params.taxiparkId}/tables/salaries`,
      description: "Текст для пояснения о таблице с зарплатами",
    },
    {
      title: "Штрафы",
      href: `/${params.taxiparkId}/tables/penalties`,
      description: "Текст для пояснения о таблице с штрафами",
    },
  ];

  return (
    <NavigationMenu className="pl-5">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Сводка</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href={`/${params.taxiparkId}`}
                  >
                    <CarTaxiFront className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">Сводка</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Интерактивный дэшборд, который позволяет вам быстро
                      просматривать ключевые показатели
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="" title="Элемент 1">
                Текст для элемента 1
              </ListItem>
              <ListItem href="" title="Элемент 2">
                Текст для элемента 2
              </ListItem>
              <ListItem href="" title="Элемент 3">
                Текст для элемента 3
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Таблицы</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {tables.map((tables) => (
                <ListItem
                  key={tables.title}
                  title={tables.title}
                  href={tables.href}
                >
                  {tables.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={`/${params.taxiparkId}/settings`} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Настройки
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
