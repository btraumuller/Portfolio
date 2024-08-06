"use server";
import { PrismaClient} from "@prisma/client";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();
export async function sendContactForm(form:FormData){
    try{
        await prisma.contact_us.create({
            data:{
                first_name: form.get("first name") as string,
                last_name: form.get("last name") as string,
                email: form.get("email") as string,
                description: form.get("description") as string
            }
        });
        
    }catch(error){
        console.log(error);
        console.log("There seems to be an error with sending the form");
    }finally{
        redirect("/forms/thank-you");
    }
    
    
}