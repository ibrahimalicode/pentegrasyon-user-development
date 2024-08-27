import { useMemo } from "react";
import EditUserProfile from "./editUserProfile";
import EditAdminProfile from "./editAdminProfile";
import { getAuth } from "../../../redux/api";

const EditProfile = ({ user, cities }) => {
  const localUser = useMemo(() => getAuth(), []);
  return localUser?.isManager ? (
    <EditAdminProfile />
  ) : (
    <EditUserProfile user={user} cities={cities} />
  );
};

export default EditProfile;
