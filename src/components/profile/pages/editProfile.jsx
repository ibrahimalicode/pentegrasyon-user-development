import { useMemo } from "react";
import EditUserProfile from "./editUserProfile";
import EditAdminProfile from "./editAdminProfile";
import { getAuth } from "../../../redux/api";

const EditProfile = () => {
  const localUser = useMemo(() => getAuth(), []);
  return localUser?.isManager ? <EditAdminProfile /> : <EditUserProfile />;
};

export default EditProfile;
