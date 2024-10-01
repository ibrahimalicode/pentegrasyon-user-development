import { createContext, useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserRestaurants } from "../redux/restaurants/getUserRestaurantsSlice";
import * as signalR from "@microsoft/signalr";
import { getUser } from "../redux/user/getUserSlice";
import { getAuth } from "../redux/api";

const SignalRContext = createContext();

export const useSignalR = () => useContext(SignalRContext);

export const SignalRProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.getUser);
  const { success } = useSelector((state) => state.auth.login);
  const { restaurants } = useSelector(
    (state) => state.restaurants.getUserRestaurants
  );

  const token = getAuth()?.token;
  const [userId, setUserId] = useState(null);
  const [restaurantsId, setRestaurantsId] = useState([]);
  const [statusChangedOrder, setStatusChangedOrder] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newOrder, setNewOrder] = useState(null);

  //GET USER
  useEffect(() => {
    if (!user && token) {
      dispatch(getUser());
    }
  }, [user, success, token]);

  //SET USER ID
  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  //GET RESTAURANT
  useEffect(() => {
    if (userId) {
      dispatch(getUserRestaurants({ userId }));
    }
  }, [userId, dispatch]);

  //SET RESTAURANT IDS
  useEffect(() => {
    if (restaurants && restaurants.data.length > 0) {
      const ids = restaurants.data.map((r) => r.id);
      setRestaurantsId(ids);
    }
  }, [restaurants]);

  // Start the connection and join groups for each restaurant
  async function startConnection(conn) {
    try {
      conn.start().then(() => {
        console.log("SignalR connection established");

        // Join group for each restaurant ID
        restaurantsId.forEach((restaurantId) => {
          conn.invoke("JoinRestaurantGroup", restaurantId).catch((err) => {
            console.error(
              `Error joining restaurant group ${restaurantId}:`,
              err
            );
          });
        });

        // Join user group
        conn.invoke("JoinUserGroup", userId).catch((err) => {
          console.error(`Error joining user group ${userId}:`, err);
        });
      });
    } catch (err) {
      console.log("Error in SignalR connection:", err);
      setTimeout(() => startConnection(conn), 5000);
    }
  }

  useEffect(() => {
    if (userId && restaurantsId.length > 0) {
      // Initialize the SignalR connection
      const conn = new signalR.HubConnectionBuilder()
        .withUrl("https://api.pentegrasyon.net/generalHub")
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      conn.serverTimeoutInMilliseconds = 2 * 60 * 1000; // 2 minutes timeout

      conn.keepAliveIntervalInMilliseconds = 15 * 1000; // 30 second

      conn.on("ReceiveNewTicket", (ticket) => {
        console.log("ReceiveNewTicket", ticket);
        setNewOrder(ticket);
      });
      conn.on("ReceiveTicketStatus", (ticket) => {
        console.log("ReceiveTicketStatus", ticket);
        setStatusChangedOrder(ticket);
      });
      conn.on("ReceiveTicketCancellation", (ticket) => {
        setStatusChangedOrder(ticket);
      });

      conn.on("ReceiveTicketCourierLocation", (ticket) => {
        console.log("Courier Location for Ticket ID: ", ticket);
      });

      conn.on("ReceiveNewMessage", function (message) {
        setMessages((prevMessages) => [message, ...prevMessages]);
        console.log("New Message Received: ", message);
      });

      // Handle automatic reconnect
      conn.onreconnecting((error) => {
        console.log(
          `Connection lost. Attempting to reconnect... Error: ${error}`
        );
        // Optionally show reconnection attempt message to the user
      });

      conn.onreconnected((connectionId) => {
        console.log(
          `Connection reestablished. Connected with connectionId: ${connectionId}`
        );
        // Optionally notify user of successful reconnection
      });

      // Reconnect on close
      conn.onclose((error) => {
        console.log("Connection closed: ", error);
        conn.start().catch((err) => {
          console.error("Error restarting SignalR connection: ", err);
        });
      });
      startConnection(conn);

      const handleVisibilityChange = () => {
        if (
          document.visibilityState === "visible" &&
          conn.state === signalR.HubConnectionState.Disconnected
        ) {
          startConnection(conn);
        }
      };

      // setInterval(() => {
      //   if (conn.state === signalR.HubConnectionState.Disconnected) {
      //     console.log("Connection lost. Attempting to reconnect...");
      //     startConnection(conn);
      //   }
      //   console.log("Connection Checked");
      // }, 1000);

      document.addEventListener("visibilitychange", handleVisibilityChange);
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
