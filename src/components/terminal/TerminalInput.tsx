"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useAutocomplete } from "@/hooks/useAutocomplete";
import type { Command } from "@/types/terminal";

interface TerminalInputProps {
  disabled?: boolean;
  onSubmit: (value: string) => void;
  onClear: () => void;
  recall: (direction: "up" | "down", draft: string) => string | null;
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const trimmed = query.trim();
  const index = trimmed ? text.toLowerCase().indexOf(trimmed.toLowerCase()) : -1;

  if (index < 0) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + trimmed.length)}</mark>
      {text.slice(index + trimmed.length)}
    </>
  );
}

export function TerminalInput({ disabled = false, onSubmit, onClear, recall }: TerminalInputProps) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useAutocomplete(value, open && !disabled);
  const showSuggestions = open && !disabled && value.trim().length > 0 && matches.length > 0;
  const activeOption = showSuggestions
    ? matches[Math.min(selected, matches.length - 1)]
    : undefined;

  useEffect(() => {
    if (disabled) return;
    inputRef.current?.focus();
  }, [disabled]);

  const accept = (command: Command | undefined) => {
    if (!command) return;
    setValue(`${command.name} `);
    setOpen(false);
    setSelected(0);
    window.requestAnimationFrame(() => {
      const input = inputRef.current;
      input?.focus();
      input?.setSelectionRange(input.value.length, input.value.length);
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = value.trim();
    if (!command) return;
    onSubmit(command);
    setValue("");
    setOpen(false);
    setSelected(0);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      onClear();
      return;
    }

    if (event.key === "Escape") {
      if (showSuggestions) {
        event.preventDefault();
        setOpen(false);
      }
      return;
    }

    if (event.key === "Tab") {
      if (showSuggestions) {
        event.preventDefault();
        accept(activeOption);
      }
      return;
    }

    // Enter accepts a completion only when it would add something; an exact
    // command runs immediately instead of needing a second Enter.
    if (event.key === "Enter" && showSuggestions && activeOption?.name !== value.trim()) {
      event.preventDefault();
      accept(activeOption);
      return;
    }

    if ((event.key === "ArrowDown" || event.key === "ArrowUp") && showSuggestions) {
      event.preventDefault();
      setSelected((current) => {
        const step = event.key === "ArrowDown" ? 1 : -1;
        return (current + step + matches.length) % matches.length;
      });
      return;
    }

    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = recall(event.key === "ArrowUp" ? "up" : "down", value);
      if (next === null) return;
      setValue(next);
      setOpen(false);
      window.requestAnimationFrame(() => {
        inputRef.current?.setSelectionRange(next.length, next.length);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <label htmlFor="terminal-input" className="sr-only">
        Terminal command
      </label>

      <div className="term-input-row">
        <span className="term-input-prompt" aria-hidden>
          visitor@portfolio:~$
        </span>

        <input
          ref={inputRef}
          id="terminal-input"
          type="text"
          className="term-input"
          style={{ width: `${Math.max(value.length, 1)}ch` }}
          value={value}
          disabled={disabled}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          role="combobox"
          aria-expanded={showSuggestions}
          aria-controls="terminal-suggestions"
          aria-autocomplete="list"
          aria-activedescendant={
            showSuggestions && activeOption ? `terminal-suggestion-${activeOption.name}` : undefined
          }
          onChange={(event) => {
            setValue(event.target.value);
            setOpen(true);
            setSelected(0);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => setOpen(false)}
        />

        {!disabled ? <span aria-hidden className="term-caret" /> : null}
        {!disabled && value.length === 0 ? (
          <span aria-hidden className="term-input-ghost">
            type a command
          </span>
        ) : null}
      </div>

      {showSuggestions ? (
        <ul id="terminal-suggestions" className="term-suggestions" role="listbox">
          {matches.map((command, index) => (
            <li
              key={command.name}
              id={`terminal-suggestion-${command.name}`}
              role="option"
              aria-selected={index === Math.min(selected, matches.length - 1)}
              className="term-suggestion"
              onMouseDown={(event) => {
                event.preventDefault();
                accept(command);
              }}
            >
              <span>
                <HighlightMatch text={command.name} query={value} />
              </span>
              <span className="term-suggestion-desc">{command.description}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}
