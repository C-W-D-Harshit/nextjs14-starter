// import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function SessionChecker({
  role = "user",
  basic = false,
}: {
  role?: string;
  basic?: boolean;
}) {
  const session: any = await getServerSession(authOptions as any);

  if (!basic) {
    if (session && session?.user?.role === role) {
      return session;
    } else {
      false;
    }
  } else {
    if (session) {
      return session;
    } else {
      return redirect("/login");
    }
  }
}

export default SessionChecker;
