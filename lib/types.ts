export type BookingStatus = "New" | "In Review" | "Contacted" | "In Progress" | "Completed" | "Declined";
export type Booking = { id:string; reference:string; name:string; email:string; phone:string; business:string; websiteType:string; style:string; budget:string; timeline:string; brief:string; status:BookingStatus; createdAt:string };
