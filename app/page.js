import { Button } from "@/components/ui/button";
import { SignIn, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import CategoryList from "./_components/CategoryList";

export default function Home() {
  return (
   <div>
   <CategoryList/>
   </div>
  );
}
