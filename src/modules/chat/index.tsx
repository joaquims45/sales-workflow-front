import { Route, Routes } from "react-router-dom";

import Chat from "@/pages/Chat/Chat";

export default function ChatModule() {
  return (
    <Routes>
      <Route index element={<Chat />} />
    </Routes>
  );
}
