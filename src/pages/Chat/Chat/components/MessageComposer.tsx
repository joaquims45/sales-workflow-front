import { useState, type FormEvent, type KeyboardEvent } from "react";

import { styles } from "../styles";

interface MessageComposerProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export function MessageComposer({ onSend, disabled }: MessageComposerProps) {
  const [value, setValue] = useState("");

  function submit() {
    const trimmed = value.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setValue("");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    submit();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.composer}>
      <textarea
        style={styles.composerInput}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribí un mensaje… (Enter para enviar, Shift+Enter para nueva línea)"
        disabled={disabled}
        rows={1}
      />
      <button type="submit" style={styles.composerButton} disabled={disabled || !value.trim()}>
        Enviar
      </button>
    </form>
  );
}
