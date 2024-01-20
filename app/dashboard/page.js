"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const user = localStorage.getItem("user");
  if (!user) {
    router.push("/login");
  }
  return router.push("/dashboard/books");
}
