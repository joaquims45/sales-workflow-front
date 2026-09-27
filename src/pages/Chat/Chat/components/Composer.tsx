import { useState, type FormEvent } from "react";

import { styles } from "../styles";

interface ComposerProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export function Composer({ onSend, disabled }: ComposerProps) {
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const trimmed = value.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} style={styles.composer}>
      <input
        style={styles.composerInput}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Escribí un mensaje…"
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || !value.trim()}>
        Enviar
      </button>
    </form>
  );
}
