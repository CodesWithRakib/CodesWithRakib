import { profile } from "@/content/profile";
import type { Command } from "@/types/terminal";

export const contact = {
  name: "contact",
  aliases: ["email", "hire"],
  description: "Open a channel.",
  usage: "contact",
  run: () => ({
    type: "element",
    component: (
      <div className="term-block">
        <p className="term-text">
          email:{" "}
          <a className="term-link" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </p>
        <p className="term-text term-muted">elsewhere:</p>
        <ul className="term-socials">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a
                className="term-link"
                href={social.url}
                target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.url.startsWith("mailto:") ? undefined : "noreferrer"}
              >
                {social.label} ↗
              </a>
            </li>
          ))}
        </ul>
        <p className="term-text term-muted">Based in {profile.location} · usually replies within two working days.</p>
        <p className="term-text term-muted">Tip: `sudo hire-me` for a shortcut.</p>
      </div>
    ),
  }),
} satisfies Command;
