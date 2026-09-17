import { NotFoundContent } from "@/components/not-found-content";

// Catches notFound() thrown from routes inside the (site) group; the shell
// comes from the group layout.
export default function NotFound() {
  return <NotFoundContent />;
}
