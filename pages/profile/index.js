import { useSession } from "next-auth/react";

export default function profilePage() {
  const { data: session } = useSession();
  const userId = session?.user.id;

  return null;
}
