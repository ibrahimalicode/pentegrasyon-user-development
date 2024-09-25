import { createContext, useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserRestaurants } from "../redux/restaurants/getUserRestaurantsSlice";
import * as signalR from "@microsoft/signalr";

const SignalRContext = createContext();

export const useSignalR = () => useContext(SignalRContext);

export const SignalRProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.getUser);
  const { restaurants } = useSelector(
    (state) => state.restaurants.getUserRestaurants
  );

  const [userId, setUserId] = useState(user?.id || null);
  const [restaurantsId, setRestaurantsId] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newOrder, setNewOrder] = useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(getUserRestaurants({ userId }));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (restaurants && restaurants.data.length > 0) {
      const ids = restaurants.data.map((r) => r.id);
      setRestaurantsId(ids);
    }
  }, [restaurants]);

  useEffect(() => {
    if (userId && restaurantsId.length > 0) {
      // Initialize the SignalR connection
      const connectionGeneralHub = new signalR.HubConnectionBuilder()
        .withUrl("https://api.pentegrasyon.net/generalHub")
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      connectionGeneralHub.serverTimeoutInMilliseconds = 2 * 60 * 1000; // 2 minutes timeout

      connectionGeneralHub.on("ReceiveNewTicket", function (ticket) {
        setNewOrder(ticket);
      });

      connectionGeneralHub.on("ReceiveTicketStatus", function (ticket) {
        setOrderData(ticket);
        console.log("New status Received: ", ticket);
      });

      connectionGeneralHub.on("ReceiveTicketCancellation", function (ticket) {
        setOrderData(ticket);
        console.log("Ticket Cancelled: ", ticket);
      });

      connectionGeneralHub.on(
        "ReceiveTicketCourierLocation",
        function (ticket) {
          console.log("Courier Location for Ticket ID: ", ticket);
        }
      );

      connectionGeneralHub.on("ReceiveNewMessage", function (message) {
        setMessages((prevMessages) => [message, ...prevMessages]);
        console.log("New Message Received: ", message);
      });

      // Start the connection and join groups for each restaurant
      connectionGeneralHub
        .start()
        .then(() => {
          console.log("SignalR connection established");

          // Join group for each restaurant ID
          restaurantsId.forEach((restaurantId) => {
            connectionGeneralHub
              .invoke("JoinRestaurantGroup", restaurantId)
              .catch((err) => {
                console.error(
                  `Error joining restaurant group ${restaurantId}:`,
                  err
                );
              });
          });

          // Join user group
          connectionGeneralHub.invoke("JoinUserGroup", userId).catch((err) => {
            console.error(`Error joining user group ${userId}:`, err);
          });
        })
        .catch((err) => {
          console.error("SignalR connection error: ", err);
        });

      // Reconnect on close
      connectionGeneralHub.onclose((error) => {
        console.log("Connection closed: ", error);
        connectionGeneralHub.start().catch((err) => {
          console.error("Error restarting SignalR connection: ", err);
        });
      });
    }
  }, [userId, restaurantsId]);

  return (
    <SignalRContext.Provider
      value={{
        userId,
        setUserId,
        restaurantsId,
        setRestaurantsId,
        newOrder,
        setNewOrder,
        orderData,
        setOrderData,
        messages,
        setMessages,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};
