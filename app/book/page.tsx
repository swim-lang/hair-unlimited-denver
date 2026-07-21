import type { Metadata } from "next";
import SiteFooter from "../site-footer";
import SiteHeader from "../site-header";
import NewClientBooking from "./new-client-booking";

export const metadata: Metadata = {
  title: "Book a Private Consultation | Hair Unlimited of Denver",
  description: "Demo booking flow for new Hair Unlimited clients.",
};

export default function BookPage() {
  return (
    <>
      <SiteHeader />
      <NewClientBooking />
      <SiteFooter />
    </>
  );
}
