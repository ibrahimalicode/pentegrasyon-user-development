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
  const [statusChangedOrder, setStatusChangedOrder] = useState(null);
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
        setStatusChangedOrder(ticket);
        console.log("New status Received: ", ticket);
      });

      connectionGeneralHub.on("ReceiveTicketCancellation", function (ticket) {
        setStatusChangedOrder(ticket);
        // console.log("Ticket Cancelled: ", ticket);
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
      async function startConnection() {
        try {
          connectionGeneralHub.start().then(() => {
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
            connectionGeneralHub
              .invoke("JoinUserGroup", userId)
              .catch((err) => {
                console.error(`Error joining user group ${userId}:`, err);
              });
          });
        } catch (err) {
          console.log("Error in SignalR connection:", err);
          setTimeout(startConnection, 5000);
        }
      }

      // Handle automatic reconnect
      connectionGeneralHub.onreconnecting((error) => {
        console.log(
          `Connection lost. Attempting to reconnect... Error: ${error}`
        );
        // Optionally show reconnection attempt message to the user
      });

      connectionGeneralHub.onreconnected((connectionId) => {
        console.log(
          `Connection reestablished. Connected with connectionId: ${connectionId}`
        );
        // Optionally notify user of successful reconnection
      });

      // Reconnect on close
      connectionGeneralHub.onclose((error) => {
        console.log("Connection closed: ", error);
        connectionGeneralHub.start().catch((err) => {
          console.error("Error restarting SignalR connection: ", err);
        });
      });
      startConnection();

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          if (
            connectionGeneralHub.state ===
            signalR.HubConnectionState.Disconnected
          ) {
            startConnection();
          }
        }
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
        statusChangedOrder,
        setStatusChangedOrder,
        messages,
        setMessages,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};
