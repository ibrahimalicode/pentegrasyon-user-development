import CustomCheckbox from "../../common/customCheckbox";
const SelectRol = ({ roles, setRoles }) => {
  return (
    <div className="pt-4">
      <div className="border border-solid border-[--border-1] rounded-md text-center max-w-48 py-2">
        Rol Seç
      </div>
      <div className="flex gap-2 text-xs font-[300] pt-2">
        <label
          htmlFor="dealer"
          className="py-2.5 px-5 border border-solid border-[--border-1] rounded-md cursor-pointer"
        >
          <CustomCheckbox
            id="dealer"
            label="Bayi"
            size="4 rounded-[4px]"
            checked={roles.dealer}
            onChange={() =>
              setRoles((prev) => {
                return {
                  ...prev,
                  dealer: !roles.dealer,
                };
              })
            }
          />
        </label>
        <label
          htmlFor="user"
          className="py-2.5 px-5 border border-solid border-[--border-1] rounded-md cursor-pointer"
        >
          <CustomCheckbox
            id="user"
            label="Kullanıcı"
            size="4 rounded-[4px]"
            checked={roles.user}
            onChange={() =>
              setRoles((prev) => {
                return {
                  ...prev,
                  user: !roles.user,
                };
              })
            }
          />
        </label>
        <label
          htmlFor="admin"
          className="py-2.5 px-5 border border-solid border-[--border-1] rounded-md cursor-pointer"
        >
          <CustomCheckbox
            id="admin"
            label="Yetkili"
            size="4 rounded-[4px]"
            checked={roles.admin}
            onChange={() =>
              setRoles((prev) => {
                return {
                  ...prev,
                  admin: !roles.admin,
                };
              })
            }
          />
        </label>
      </div>
    </div>
  );
};

export default SelectRol;
