import { getAuth } from "../redux/api";
import * as signalR from "@microsoft/signalr";
import { getUser } from "../redux/user/getUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { createContext, useState, useContext, useEffect } from "react";
import { getUserRestaurants } from "../redux/restaurants/getUserRestaurantsSlice";

//SOUND
import getirYemekNewOrderSoundPath from "../assets/sound/getiryemekneworder.mp3";
import migrosYemekNewOrderSoundPath from "../assets/sound/migrosyemekneworder.mp3";
import trendyolYemekNewOrderSoundPath from "../assets/sound/trendyolyemekneworder.mp3";
import yemekSepetiNewOrderSoundPath from "../assets/sound/yemeksepetineworder.mp3";
import goFodyNewOrderSoundPath from "../assets/sound/gofodyneworder.mp3";
import siparisimPlusNewOrderSoundPath from "../assets/sound/siparisimplus.mp3";

const newOrderSounds = [
  new Audio(getirYemekNewOrderSoundPath),
  new Audio(migrosYemekNewOrderSoundPath),
  new Audio(trendyolYemekNewOrderSoundPath),
  new Audio(yemekSepetiNewOrderSoundPath),
  new Audio(goFodyNewOrderSoundPath),
  new Audio(siparisimPlusNewOrderSoundPath),
];

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
  const [statusChangedRestaurant, setStatusChangedRestaurant] = useState(null);
  const [automaticApprovalDatas, setAutomaticApprovalDatas] = useState(null);

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
      registerSignalREvents(conn);
    } catch (err) {
      console.log("Error in SignalR connection:", err);
      setTimeout(() => startConnection(conn), 5000);
    }
  }

  // SUBSCRIPTIONS
  function registerSignalREvents(conn) {
    //NEW ORDER
    conn.on("ReceiveNewTicket", (ticket) => {
      setNewOrder(ticket);
      const newOrderSound = newOrderSounds[ticket.marketplaceId];
      newOrderSound.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
      console.log("ReceiveNewTicket", ticket);
    });

    //STATUS
    conn.on("ReceiveTicketStatus", (ticket) => {
      // console.log("ReceiveTicketStatus", ticket);
      setStatusChangedOrder(ticket);
    });

    //CANCELED ORDER
    conn.on("ReceiveTicketCancellation", (ticket) => {
      setStatusChangedOrder(ticket);
    });

    conn.on("ReceiveTicketCourierLocation", (ticket) => {
      console.log("Courier Location for Ticket ID: ", ticket);
    });

    //MESSAGE
    conn.on("ReceiveNewMessage", function (message) {
      setMessages((prevMessages) => [message, ...prevMessages]);
      console.log("New Message Received: ", message);
    });

    //RESTAURANT STATUS
    conn.on("ReceiveRestaurantStatus", function (restaurant) {
      setStatusChangedRestaurant(restaurant);
      console.log("New Restaurant status Received: ", restaurant);
    });

    //AUTOMATION STATUS
    conn.on("ReceiveUserTicketAutomation", function (autoData) {
      setAutomaticApprovalDatas(autoData);
      console.log("Automation status Changed: ", autoData);
    });
  }

  useEffect(() => {
    if (userId && restaurantsId.length > 0) {
      // INITIALIZE THE SIGNALR CONNECTION
      const conn = new signalR.HubConnectionBuilder()
        .withUrl("https://api.pentegrasyon.net/generalHub")
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      conn.serverTimeoutInMilliseconds = 2 * 60 * 1000; // 2 minutes timeout
      conn.keepAliveIntervalInMilliseconds = 15 * 1000; // 30 second

      // HANDLE AUTO RECONNECT
      //RECONNECTION
      conn.onreconnecting((error) => {
        console.log(
          `Connection lost. Attempting to reconnect... Error: ${error}`
        );
      });

      //RECONNECTED
      conn.onreconnected((connectionId) => {
        console.log(
          `Connection reestablished. Connected with connectionId: ${connectionId}`
        );
        registerSignalREvents(conn);
      });

      // RECONNECT ON CLOSE
      conn.onclose((error) => {
        console.log("Connection closed: ", error);
        conn.start().catch((err) => {
          console.error("Error restarting SignalR connection: ", err);
        });
      });
      startConnection(conn);

      //CHECK IF THE DEVICE WAKES UP
      const handleVisibilityChange = () => {
        if (
          document.visibilityState === "visible" &&
          conn.state === signalR.HubConnectionState.Disconnected
        ) {
          startConnection(conn);
        }
      };

      //PING 2SEC
      // setInterval(() => {
      //   console.log(`Connection state: ${conn.state}`);
      //   if (conn.state === signalR.HubConnectionState.Disconnected) {
      //     console.log("Connection lost. Attempting to reconnect...");
      //     startConnection(conn);
      //   }
      // }, 2000);

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
        statusChangedRestaurant,
        setStatusChangedRestaurant,
        automaticApprovalDatas,
        setAutomaticApprovalDatas,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};
