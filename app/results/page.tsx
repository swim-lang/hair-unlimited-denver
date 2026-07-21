import type { Metadata } from "next";
import ResultsGallery from "./results-gallery";

export const metadata: Metadata = {
  title: "Client Transformations | Hair Unlimited of Denver",
  description: "Before-and-after transformations from real Hair Unlimited clients in Denver.",
};

export default function ResultsPage() {
  return <ResultsGallery />;
}
