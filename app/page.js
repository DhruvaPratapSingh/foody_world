import { Button } from "@/components/ui/button";
import { SignIn, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import CategoryList from "./_components/CategoryList";
import BusinessList from "./_components/BusinessList";

export default function Home() {
  return (
   <div>
   <CategoryList/>
   <BusinessList/>
   </div>
  );
}
