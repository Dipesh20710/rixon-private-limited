import { Booking } from "./types";
import fs from "node:fs/promises";
import path from "node:path";

const file = path.join(process.cwd(), "data", "bookings.json");
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const useSupabase = Boolean(supabaseUrl && serviceKey);

async function localRead():Promise<Booking[]> { try { return JSON.parse(await fs.readFile(file,"utf8")); } catch { return []; } }
async function localWrite(rows:Booking[]) { await fs.mkdir(path.dirname(file),{recursive:true}); await fs.writeFile(file,JSON.stringify(rows,null,2),"utf8"); }
async function sb(pathname:string, init:RequestInit={}) {
  const res=await fetch(`${supabaseUrl}/rest/v1/${pathname}`,{...init,headers:{apikey:serviceKey!,Authorization:`Bearer ${serviceKey}`,"Content-Type":"application/json",Prefer:"return=representation",...(init.headers||{})},cache:"no-store"});
  if(!res.ok) throw new Error(`Supabase request failed (${res.status}): ${await res.text()}`);
  return res.status===204?null:res.json();
}
export async function createBooking(booking:Booking) {
  if(useSupabase) { await sb("bookings",{method:"POST",body:JSON.stringify({id:booking.id,reference:booking.reference,name:booking.name,email:booking.email,phone:booking.phone,business:booking.business,website_type:booking.websiteType,style:booking.style,budget:booking.budget,timeline:booking.timeline,brief:booking.brief,status:booking.status,created_at:booking.createdAt})}); return; }
  const rows=await localRead(); rows.unshift(booking); await localWrite(rows);
}
export async function listBookings():Promise<Booking[]> {
  if(useSupabase) { const rows=await sb("bookings?select=*&order=created_at.desc"); return (rows||[]).map((r:any)=>({id:r.id,reference:r.reference,name:r.name,email:r.email,phone:r.phone,business:r.business||"",websiteType:r.website_type,style:r.style,budget:r.budget,timeline:r.timeline,brief:r.brief,status:r.status,createdAt:r.created_at})); }
  return localRead();
}
export async function updateBooking(id:string,status:Booking["status"]) {
  if(useSupabase) { await sb(`bookings?id=eq.${encodeURIComponent(id)}`,{method:"PATCH",body:JSON.stringify({status})}); return; }
  const rows=await localRead(); const row=rows.find(x=>x.id===id); if(!row) throw new Error("Booking not found"); row.status=status; await localWrite(rows);
}
export const databaseMode=()=>useSupabase?"supabase":"local-json";
