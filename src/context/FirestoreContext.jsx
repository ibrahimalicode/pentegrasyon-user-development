//MODULES
import { useDispatch, useSelector } from "react-redux";
import React, { createContext, useContext, useEffect, useState } from "react";

//FIREBASE
import { db } from "../config/firebase";
import { doc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { getDoc, setDoc } from "firebase/firestore";

//UTILS
import { getAuth } from "../redux/api";

//REDUX
import { getUser } from "../redux/user/getUserSlice";

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

const FirestoreContext = createContext();

export const useFirestore = () => {
  return useContext(FirestoreContext);
};

export const FirestoreProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.auth.login);
  const { user, loading } = useSelector((state) => state.user.getUser);

  const token = getAuth()?.token;
  const [userId, setUserId] = useState(null);
  const [statusChangedOrder, setStatusChangedOrder] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newOrder, setNewOrder] = useState(null);
  const [statusChangedRestaurant, setStatusChangedRestaurant] = useState(null);
  const [automaticApprovalDatas, setAutomaticApprovalDatas] = useState(null);

  //GET USER
  useEffect(() => {
    if (!user && token && !loading) {
      dispatch(getUser());
    }
  }, [user, success, token]);

  //SET USER ID
  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  // Ensure the user document exists
  const ensureUserDocExists = async () => {
    const userRef = doc(db, "users", userId);
    const docSnapshot = await getDoc(userRef);

    if (!docSnapshot.exists()) {
      await setDoc(userRef);
    }
  };

  let isInitialLoad = true;

  useEffect(() => {
    if (!userId) return;

    const setup = async () => {
      await ensureUserDocExists();

      const userDocRef = doc(db, "users", userId);
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (isInitialLoad) {
          isInitialLoad = false;
          return;
        }

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();

          // Check which field was updated
          if (data.newTicket) {
            setNewOrder(data.newTicket);
            console.log("New ticket data received:", data.newTicket);
            const newOrderSound = newOrderSounds[data.newTicket.marketplaceId];
            newOrderSound.play().catch((error) => {
              console.error("Failed to play audio:", error);
            });
          }
          if (data.ticketStatus) {
            console.log("Ticket status data received:", data.ticketStatus);
            setStatusChangedOrder(data.ticketStatus);
          }
          if (data.newMessage) {
            console.log("New message data received:", data.newMessage);
            setMessages(data.newMessage);
          }
          if (data.restaurantStatus) {
            console.log(
              "Restaurant status data received:",
              data.restaurantStatus
            );
            setStatusChangedRestaurant(data.restaurantStatus);
          }
          if (data.ticketAutomation) {
            console.log(
              "Restaurant status data received:",
              data.ticketAutomation
            );
            setAutomaticApprovalDatas(data.ticketAutomation);
          }
        }
      });

      // Cleanup subscriptions on unmount
      return () => {
        unsubscribe();
      };
    };

    let cleanup; // To hold the cleanup function
    const initialize = async () => {
      cleanup = await setup();
    };
    initialize();

    // Cleanup on unmount
    return () => {
      if (cleanup) cleanup();
    };
  }, [userId]);

  return (
    <FirestoreContext.Provider
      value={{
        userId,
        setUserId,
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
    </FirestoreContext.Provider>
  );
};
