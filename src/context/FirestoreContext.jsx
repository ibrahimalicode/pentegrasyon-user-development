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
import { formatToISO } from "../utils/utils";

//REDUX
import { getUser } from "../redux/user/getUserSlice";

//SOUND
import getirYemekNewOrderSoundPath from "../assets/sound/getiryemekneworder.mp3";
import migrosYemekNewOrderSoundPath from "../assets/sound/migrosyemekneworder.mp3";
import trendyolYemekNewOrderSoundPath from "../assets/sound/trendyolyemekneworder.mp3";
import yemekSepetiNewOrderSoundPath from "../assets/sound/yemeksepetineworder.mp3";
import goFodyNewOrderSoundPath from "../assets/sound/gofodyneworder.mp3";
import siparisimPlusNewOrderSoundPath from "../assets/sound/siparisimplus.mp3";
import { useProtectPages } from "./ProtectPagesContext";

const newOrderSounds = [
  new Audio(getirYemekNewOrderSoundPath),
  new Audio(migrosYemekNewOrderSoundPath),
  new Audio(trendyolYemekNewOrderSoundPath),
  new Audio(yemekSepetiNewOrderSoundPath),
  new Audio(goFodyNewOrderSoundPath),
  new Audio(siparisimPlusNewOrderSoundPath),
];

const FirestoreContext = createContext();

export const useFirestore = () => useContext(FirestoreContext);

export const FirestoreProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.auth.login);
  const { user, loading } = useSelector((state) => state.user.getUser);
  const { setProtectedPages, setProtectedPagesBefore } = useProtectPages();

  const token = getAuth()?.token;
  const [userId, setUserId] = useState(null);
  const [statusChangedOrder, setStatusChangedOrder] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
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
      // setUserId("c8d2fdbd-37b1-4ebd-aaf3-6581a8cb3745");
    }
  }, [user]);

  // Ensure the user document exists
  const ensureUserDocExists = async () => {
    const userRef = doc(db, "users", userId);

    try {
      const docSnapshot = await getDoc(userRef);

      if (!docSnapshot.exists()) {
        await setDoc(userRef, {});

        await setDoc(doc(userRef, "newTicket", "data"), {});
        await setDoc(doc(userRef, "ticketStatus", "data"), {});
        await setDoc(doc(userRef, "newMessage", "data"), {});
        await setDoc(doc(userRef, "restaurantStatus", "data"), {});
        await setDoc(doc(userRef, "ticketAutomation", "data"), {});
        await setDoc(doc(userRef, "userLock", "data"), {});
      }
    } catch (error) {
      console.log(error);
      return;
    }
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
        const fieldsToFormat = [
          "approvalDate",
          "cancelDate",
          "deliveryDate",
          "preparationDate",
          "createdDateTime",
          "checkoutDate",
        ];

        const convertedData = { ...data[0] };

        fieldsToFormat.forEach((field) => {
          const date = convertedData[field];
          if (date) convertedData[field] = date.replace(" ", "T");
        });

        if (subcollection === "userLock")
          setProtectedPagesBefore(convertedData);

        setState(convertedData);
        console.log(subcollection, convertedData);

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
        setNewMessage
      );
      const unsubRestaurantStatus = subscribeToSubcollection(
        "restaurantStatus",
        setStatusChangedRestaurant
      );
      const unsubAutoApproval = subscribeToSubcollection(
        "ticketAutomation",
        setAutomaticApprovalDatas
      );
      const unsubProtectedPages = subscribeToSubcollection(
        "userLock",
        setProtectedPages
      );

      // Cleanup subscriptions on unmount
      return () => {
        unsubNewOrder();
        unsubOrderStatus();
        unsubNewMessage();
        unsubRestaurantStatus();
        unsubAutoApproval();
        unsubProtectedPages();
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
        newMessage,
        setNewMessage,
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
