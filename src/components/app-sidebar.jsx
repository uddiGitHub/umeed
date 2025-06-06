"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
// import { DatePicker } from "@/components/date-picker";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";


export function AppSidebar({ ...props }) {
  const { isLoaded, user } = useUser();
  if (!isLoaded) {
    return (
      <div className="flex h-screen w-64 items-center justify-center bg-gray-100">
        <p>Loading user...</p>
      </div>
    );
  }
  const clerkUser = {
    name: user.fullName || user.username || "User",
    email: user.primaryEmailAddress?.emailAddress || "",
    avatar: user.imageUrl || "/avatars/default.jpg",
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <NavUser user={clerkUser} />
      </SidebarHeader>
      <SidebarContent>
        {/* <DatePicker /> */}
        <SidebarSeparator className="mx-0" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}