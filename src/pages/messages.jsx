import { Route, Routes } from "react-router-dom";
import NotFound from "./404";
import MessagesPage from "../components/messages/pages/messages";

const Messages = () => {
  return (
    <Routes>
      <Route path="/" element={<MessagesPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Messages;
