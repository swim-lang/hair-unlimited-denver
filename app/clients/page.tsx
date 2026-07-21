import type { Metadata } from "next";
import ClientBooking from "./client-booking";

export const metadata: Metadata = {
  title: "Current Client Booking | Hair Unlimited of Denver",
  description: "Demo booking portal for current Hair Unlimited clients.",
};

export default function ClientsPage() {
  return <ClientBooking />;
}
