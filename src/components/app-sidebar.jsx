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
import { useRouter } from "next/navigation";

export function AppSidebar({ selectedComponent, ...props }) {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const handleComponentChange = (component) => {
    router.push(`/admin?type=${component}`);
  };
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
        {/* Posting Type Selector */}
        <div className="flex flex-col space-y-2 p-4">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleComponentChange('article')}
              className={`px-4 py-2 rounded-md text-left transition-colors ${selectedComponent === 'article'
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100'
                }`}
            >
              Post Article
            </button>
            <button
              onClick={() => handleComponentChange('newsletter')}
              className={`px-4 py-2 rounded-md text-left transition-colors ${selectedComponent === 'newsletter'
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100'
                }`}
            >
              Post Newsletter 
            </button>
          </div>
        </div>
        <SidebarSeparator className="mx-0" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}