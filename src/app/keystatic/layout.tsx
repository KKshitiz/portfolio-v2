// Deliberately isolated from the (site) route group: the site's globals.css
// (Tailwind preflight + theme tokens) would otherwise override Keystatic's
// own admin UI styling.
export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
