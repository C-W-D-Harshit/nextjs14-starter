import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-1">
      <h1>Hi Boss!</h1>
      <Button>Click me</Button>
    </main>
  );
}
