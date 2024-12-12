//MODULES
import { useDispatch, useSelector } from "react-redux";
import React, { createContext, useContext, useEffect, useState } from "react";

//FIREBASE
import { db } from "../config/firebase";
import { onSnapshot } from "firebase/firestore";
import { getDoc, setDoc } from "firebase/firestore";
import { doc, collection } from "firebase/firestore";

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
import dummyOrder from "../assets/dummy/dummyOrder";

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
  const { user, loading } = useSelector((state) => state.user.getUser);
  const { success } = useSelector((state) => state.auth.login);

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

    //DUMMY DATA
    // const newOrderRef = doc(db, "users", userId, "ticketStatus", "data");
    // try {
    //   // Set the dummyOrder data to the newOrder collection
    //   await setDoc(newOrderRef, dummyOrder);
    //   console.log("Dummy order added to newOrder collection successfully");
    // } catch (error) {
    //   console.error("Error adding dummy order to newOrder collection:", error);
    // }
  };

  // Subscribe to subcollections
  const subscribeToSubcollection = (subcollection, setState) => {
    let isInitialLoad = true;
    const subcollectionRef = collection(db, `users/${userId}/${subcollection}`);

    return onSnapshot(subcollectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      if (isInitialLoad) {
        isInitialLoad = false;
        return;
      }

      if (data?.length) {
        setState(data[0]);
        console.log(subcollection, data);
        if (subcollection === "newTicket") {
          const newOrderSound = newOrderSounds[data[0].marketplaceId];
          newOrderSound.play().catch((error) => {
            console.error("Failed to play audio:", error);
          });
        }
      }
    });
  };

  useEffect(() => {
    if (!userId) return;

    const setup = async () => {
      await ensureUserDocExists();

      const unsubNewOrder = subscribeToSubcollection("newTicket", setNewOrder);
      const unsubOrderStatus = subscribeToSubcollection(
        "ticketStatus",
        setStatusChangedOrder
      );
      const unsubNewMessage = subscribeToSubcollection(
        "newMessage",
        setMessages
      );
      const unsubRestaurantStatus = subscribeToSubcollection(
        "restaurantStatus",
        setStatusChangedRestaurant
      );
      const unsubAutoApproval = subscribeToSubcollection(
        "ticketAutomation",
        setAutomaticApprovalDatas
      );

      // Cleanup subscriptions on unmount
      return () => {
        unsubNewOrder();
        unsubOrderStatus();
        unsubNewMessage();
        unsubRestaurantStatus();
        unsubAutoApproval();
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
