import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  container: {
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    maxWidth: "640px",
  },
  messageList: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    overflowY: "auto",
    padding: "1rem 0",
  },
  bubbleUser: {
    alignSelf: "flex-end",
    background: "#aa3bff",
    color: "#fff",
    borderRadius: "12px 12px 2px 12px",
    padding: "0.5rem 0.9rem",
    maxWidth: "80%",
  },
  bubbleAssistant: {
    alignSelf: "flex-start",
    background: "#2a2a2a",
    color: "#fff",
    borderRadius: "12px 12px 12px 2px",
    padding: "0.5rem 0.9rem",
    maxWidth: "80%",
  },
  composer: {
    display: "flex",
    gap: "0.5rem",
    borderTop: "1px solid #444",
    paddingTop: "1rem",
  },
  composerInput: {
    flex: 1,
    padding: "0.5rem 0.75rem",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "transparent",
    color: "inherit",
  },
};
