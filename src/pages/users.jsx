import { Route, Routes } from "react-router-dom";
import UsersPage from "../components/users/pages/usersPage";
import NotFound from "./404";
import UserRestaurants from "../components/users/pages/userRestaurantsPage";

const Users = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/restaurants/:id" element={<UserRestaurants />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Users;
