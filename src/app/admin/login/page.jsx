import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign_in");
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

  const adminEmail = "deka.uddi22@gmail.com";

  if (email !== adminEmail) {
    return <div>Access Denied</div>;
  }

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#f8fafc",
      }}
    >
      <h1 style={{ marginBottom: "2rem", fontSize: "2rem", fontWeight: 600 }}>
        Admin Dashboard
      </h1>
      <p>Welcome, {email}!</p>
    </main>
  );
}
