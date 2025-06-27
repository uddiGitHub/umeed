import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


// admin dashboard page
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import ArticlePosting from "@/components/posting/articalPosting";
import NewsletterPosting from "@/components/posting/newsletterPosting";

export default async function AdminPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const type = resolvedSearchParams?.type ?? "article";
  const { userId } = await auth();


  if (!userId) {
    redirect("/sign_in");
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

  const adminEmail = process.env.ADMIN_EMAIL?.split(",") || [];

  if (!adminEmail.includes(email)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col items-center space-y-6">
            <div className="bg-red-50 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
              <p className="text-gray-600">
                You don't have permission to view this page. Please contact your administrator if you believe this is an error.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need help? Contact {process.env.NEXT_PUBLIC_ORG_EMAIL}</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      {/* <h1 className="text-center font-bold text-[2rem]">Admin Dasboard</h1> */}
      <SidebarProvider>
        <AppSidebar selectedComponent={type} />
        <SidebarInset>
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Go on, build your post</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex justify-center p-4">
            {type === "article" && <ArticlePosting />}
            {type === "newsletter" && <NewsletterPosting />}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
