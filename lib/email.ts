export async function notifyBooking(data:{reference:string;name:string;email:string;phone:string;websiteType:string;budget:string;brief:string}) {
 const key=process.env.RESEND_API_KEY; const to=process.env.NOTIFICATION_EMAIL;
 if(!key||!to) return {sent:false};
 const body={from:process.env.FROM_EMAIL||"RIXON <onboarding@resend.dev>",to:[to],subject:`New RIXON project enquiry — ${data.reference}`,text:`New booking ${data.reference}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nWebsite: ${data.websiteType}\nBudget: ${data.budget}\nBrief: ${data.brief}`};
 const res=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify(body)});
 if(!res.ok) throw new Error("Email notification could not be sent"); return {sent:true};
}
