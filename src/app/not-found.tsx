import "@/app/globals.css";
import { NotFoundContent } from "@/components/not-found-content";
import { SiteShell } from "@/components/site-shell";

// Catches URLs that match no route at all. These render outside the (site)
// group, so the shell and stylesheet have to be pulled in explicitly.
export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  );
}
