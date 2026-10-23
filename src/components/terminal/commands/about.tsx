import { profile } from "@/content/profile";
import type { Command } from "@/types/terminal";
import { AsciiLogo } from "../output/AsciiLogo";

export const about = {
  name: "about",
  aliases: ["bio", "who"],
  description: "Who is behind the prompt.",
  usage: "about",
  run: () => ({
    type: "element",
    component: (
      <div className="term-block">
        <AsciiLogo />
        <p className="term-text">{profile.bio}</p>
        <p className="term-text term-muted">
          {profile.role} · {profile.location}
        </p>
      </div>
    ),
  }),
} satisfies Command;
