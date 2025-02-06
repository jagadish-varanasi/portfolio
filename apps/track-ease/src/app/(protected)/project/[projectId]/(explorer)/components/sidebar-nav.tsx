"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@repo/ui/lib/utils";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Separator } from "@repo/ui/components/separator";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
  details: {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
  } | null;
}

export function SidebarNav({
  className,
  items,
  details,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();
  const route = useRouter();

  return (
    <div>
      <div className="font-bold">{details?.name}</div>
      <Separator className="my-4" />
      <nav
        className={cn(
          "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 flex-wrap",
          className
        )}
        {...props}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <Button
        variant="outline"
        size="icon"
        className="hidden md:flex mt-4 ml-2"
        onClick={() => {
          route.push(`/dashboard`);
        }}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
    </div>
  );
}
