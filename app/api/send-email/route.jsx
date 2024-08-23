import { toast } from "sonner"

import { Resend } from 'resend';
import Email from "@/emails";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(){
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['dhruvas8707@gmail.com'],
        subject: 'Food_Store',
        react: <Email/>,
      });
    
      if (error) {
        // return res.status(400).json(error);
        toast('404 err')
      }
    
      res.status(200).json(data);
      toast('200 ok good job');
}