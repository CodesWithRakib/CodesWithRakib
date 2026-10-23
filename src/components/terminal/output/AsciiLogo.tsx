import { profile } from "@/content/profile";

const WORDMARK = [
  "██████╗  █████╗ ██╗  ██╗██╗██████╗ ",
  "██╔══██╗██╔══██╗██║ ██╔╝██║██╔══██╗",
  "██████╔╝███████║█████╔╝ ██║██████╔╝",
  "██╔══██╗██╔══██║██╔═██╗ ██║██╔══██╗",
  "██║  ██║██║  ██║██║  ██╗██║██████╔╝",
  "╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═════╝ ",
].join("\n");

export function AsciiLogo() {
  return (
    <div className="term-block">
      <pre aria-hidden className="term-ascii">
        {WORDMARK}
      </pre>
      <p className="term-accent">{profile.name}</p>
    </div>
  );
}
