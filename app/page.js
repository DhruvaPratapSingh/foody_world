import { Button } from "@/components/ui/button";
import { SignIn, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
   <div>
   <SignInButton>
    <Button>btn</Button>
    </SignInButton>
    <UserButton afterSignOutUrl="/"/>
   </div>
  );
}
