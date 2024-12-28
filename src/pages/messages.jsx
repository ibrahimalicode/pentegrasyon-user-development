import NotFound from "./404";
import { Route, Routes } from "react-router-dom";
import MessagesPage from "../components/messages/pages/messagesPage";

const Messages = () => {
  return (
    <Routes>
      <Route path="/" element={<MessagesPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Messages;
