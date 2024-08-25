import { toast } from "sonner"

import { Resend } from 'resend';
import Email from "@/emails";
import { useUser } from "@clerk/nextjs";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(){
  const {user}=useUser();
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: 'Food_Store',
        react: <Email/>,
      });
    
      if (error) {
        toast('404 err')
      }
    
      res.status(200).json(data);
      toast('200 ok good job');
}