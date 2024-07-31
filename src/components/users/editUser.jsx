import { EditI } from "../../assets/icon";

const EditUser = () => {
  const handleClick = () => {
    console.log("edit");
  };
  return (
    <button
      className="w-full flex items-center gap-2 py-2 pl-6 text-left border-b border-solid border-[--border-1] cursor-pointer"
      onClick={handleClick}
    >
      <EditI className="w-5" strokeWidth="1.8" /> Düzenle
    </button>
  );
};

export default EditUser;
