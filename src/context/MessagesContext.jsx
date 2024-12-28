import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessages,
  resetGetMessages,
} from "../redux/messages/getMessagesSlice";
import { useFirestore } from "./FirestoreContext";
import { formatByDate } from "../utils/utils";
import newMessageMp3 from "../assets/sound/newMessage.mp3";
import { getAuth } from "../redux/api";

const MessagesContext = createContext();
export const useMessagesContext = () => useContext(MessagesContext);

export const MessagesContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const token = getAuth()?.token;
  const { newMessage, setNewMessage } = useFirestore();
  const { messages } = useSelector((state) => state.messages.getMessages);
  const { data } = useSelector((state) => state.messages.updateMessageStatus);
  const [messagesData, setMessagesData] = useState(null);
  const newMessageSound = new Audio(newMessageMp3);

  useEffect(() => {
    if (!messagesData && token) {
      dispatch(getMessages());
    }
  }, [messagesData, token]);

  useEffect(() => {
    if (messages) {
      setMessagesData(formatByDate(messages.data));
      dispatch(resetGetMessages());
    }
  }, [messages]);

  useEffect(() => {
    if (newMessage) {
      if (messagesData) {
        setMessagesData((prev) => {
          return formatByDate([...prev, newMessage]);
        });
      } else setMessagesData(newMessage);

      newMessageSound.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
      setNewMessage(null);
    }
  }, [newMessage]);

  useEffect(() => {
    if (data) {
      const updatedMessages = data
        .filter((msg) => msg.statusCode == 200)
        .map((msg) => ({ ...msg.message, isRead: true }));

      if (updatedMessages.length > 0) {
        const uniqueMessages = messagesData.filter(
          (existingMessage) =>
            !updatedMessages.some(
              (updatedMsg) => updatedMsg.id === existingMessage.id
            )
        );

        setMessagesData(formatByDate([...uniqueMessages, ...updatedMessages]));
      }
    }
  }, [data]);

  return (
    <MessagesContext.Provider value={{ messagesData, setMessagesData }}>
      {children}
    </MessagesContext.Provider>
  );
};
