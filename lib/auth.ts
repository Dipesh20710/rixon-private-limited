import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
const COOKIE="rixon_admin";
function secret(){const value=process.env.SESSION_SECRET;return value && value.length >= 32 ? value : null;}
function sign(value:string){const key=secret();if(!key)throw new Error("SESSION_SECRET must be configured with at least 32 characters.");return createHmac("sha256",key).update(value).digest("hex");}
export function configured(){return Boolean(process.env.ADMIN_PASSWORD && secret());}
export function validPassword(value:string){const expected=process.env.ADMIN_PASSWORD||""; const a=Buffer.from(value); const b=Buffer.from(expected); return Boolean(expected && a.length===b.length && timingSafeEqual(a,b));}
export async function setSession(){const jar=await cookies(); const value=`admin:${Date.now()+1000*60*60*12}`; jar.set(COOKIE,`${value}.${sign(value)}`,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:60*60*12});}
export async function clearSession(){const jar=await cookies();jar.delete(COOKIE);}
export async function isAdmin(){if(!secret())return false;const jar=await cookies();const raw=jar.get(COOKIE)?.value;if(!raw)return false;const i=raw.lastIndexOf(".");if(i<0)return false;const value=raw.slice(0,i),sig=raw.slice(i+1);const expected=sign(value);const a=Buffer.from(sig),b=Buffer.from(expected);if(a.length!==b.length||!timingSafeEqual(a,b))return false;const expiry=Number(value.split(":")[1]);return value.startsWith("admin:")&&Number.isFinite(expiry)&&expiry>Date.now();}
