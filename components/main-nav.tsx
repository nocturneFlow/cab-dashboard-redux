"use client";

import * as React from "react";
import Link from "next/link";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { GanttChart, LayoutDashboard } from "lucide-react";

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const tables: { title: string; href: string; description: string }[] = [
    {
      title: "Заявки",
      href: `/tables/applications`,
      description: "Текст для пояснения о таблице с заявками",
    },
    {
      title: "Касса Менеджера",
      href: `/tables/kassa`,
      description: "Текст для пояснения о таблице с кассой менеджера",
    },
    {
      title: "Машины",
      href: `/tables/cars`,
      description: "Текст для пояснения о таблице с машинами",
    },
    {
      title: "Зарплата",
      href: `/tables/salaries`,
      description: "Текст для пояснения о таблице с зарплатами",
    },
    {
      title: "Штрафы",
      href: `/tables/penalties`,
      description: "Текст для пояснения о таблице с штрафами",
    },
    {
      title: "Масло",
      href: `/tables/oil`,
      description: "Текст для пояснения о таблице с маслом",
    },
    {
      title: "Расходы Менеджера",
      href: `/tables/expenses`,
      description: "Текст для пояснения о таблице с расходами",
    },
    {
      title: "Сверка Кассы",
      href: `/tables/CashReconciliation`,
      description: "Текст для пояснения о таблице со сверкой кассы",
    },
  ];

  const dashboard: { title: string; href: string; description: string }[] = [
    {
      title: "Обзор",
      href: `/`,
      description: "Текст для пояснения о таблице с отчетами",
    },
    {
      title: "Отчет",
      href: `/dashboard/reports`,
      description: "Текст для пояснения о таблице с водителями",
    },
    {
      title: "Персонал",
      href: `/dashboard/staff`,
      description: "Текст для пояснения о таблице с машинами",
    },
  ];

  const reports: { title: string; href: string; description: string }[] = [
    {
      title: "Дополнительный Доход",
      href: `/tables/additionalIncome`,
      description: "Текст для пояснения о таблице с отчетами",
    },
    {
      title: "Касса | Адм",
      href: `/tables/cashierAdmin`,
      description: "Текст для пояснения о таблице с отчетами",
    },
    {
      title: "Отчет | Т",
      href: `/tables/reportT`,
      description: "Текст для пояснения о таблице с отчетами",
    },
    {
      title: "Фильтр",
      href: `/tables/filter`,
      description: "Текст для пояснения о таблице с отчетами",
    },
    {
      title: "Список",
      href: `/tables/list`,
      description: "Текст для пояснения о таблице с отчетами",
    },
  ];

  return (
    <NavigationMenu className="pl-5">
      <NavigationMenuList>
        <NavigationMenuItem className="pr-4">
          <NavigationMenuLink asChild>
            <a href={`/`}>
              <GanttChart size="32px" />
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Сводка</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href={`/`}
                  >
                    <LayoutDashboard className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Заглушка
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Интерактивный дэшборд, который позволяет вам быстро
                      просматривать ключевые показатели вашего бизнеса.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {dashboard.map((dashboard) => (
                <ListItem
                  key={dashboard.title}
                  title={dashboard.title}
                  href={dashboard.href}
                >
                  {dashboard.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={`/tables`} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Заявки
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
<<<<<<< HEAD
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Таблицы Отчетов</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {reports.map((reports) => (
                <ListItem
                  key={reports.title}
                  title={reports.title}
                  href={reports.href}
                >
                  {reports.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <Link href={`/tables/reports`} legacyBehavior passHref>
=======
        <NavigationMenuItem>
          <Link href={`/reports`} legacyBehavior passHref>
>>>>>>> 0ba1815737fb893e4829623bd1b874eb963d1fdc
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Отчеты
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
