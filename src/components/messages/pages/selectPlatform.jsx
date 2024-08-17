import CustomCheckbox from "../../common/customCheckbox";
const SelectPlatform = ({ platforms, setPlatforms }) => {
  return (
    <div>
      <div className="border border-solid border-[--border-1] rounded-md text-center max-w-48 py-2.5">
        Platform Seç
      </div>
      <div className="w-[90%] h-[1px] bg-[--border-1] mt-2"></div>
      <div className="flex gap-2 text-xs font-[300] pt-4">
        <label
          htmlFor="SMS"
          className="py-2.5 px-5 border border-solid border-[--border-1] rounded-md cursor-pointer"
        >
          <CustomCheckbox
            id="SMS"
            label="SMS"
            size="4 rounded-[4px]"
            checked={platforms.SMS}
            onChange={() =>
              setPlatforms((prev) => {
                return {
                  ...prev,
                  SMS: !platforms.SMS,
                };
              })
            }
          />
        </label>
        <label
          htmlFor="Email"
          className="py-2.5 px-5 border border-solid border-[--border-1] rounded-md cursor-pointer"
        >
          <CustomCheckbox
            id="Email"
            label="Email"
            size="4 rounded-[4px]"
            checked={platforms.email}
            onChange={() =>
              setPlatforms((prev) => {
                return {
                  ...prev,
                  email: !platforms.email,
                };
              })
            }
          />
        </label>
        <label
          htmlFor="Desktop"
          className="py-2.5 px-5 border border-solid border-[--border-1] rounded-md cursor-pointer"
        >
          <CustomCheckbox
            id="Desktop"
            label="Desktop"
            size="4 rounded-[4px]"
            checked={platforms.desktop}
            onChange={() =>
              setPlatforms((prev) => {
                return {
                  ...prev,
                  desktop: !platforms.desktop,
                };
              })
            }
          />
        </label>
      </div>
    </div>
  );
};

export default SelectPlatform;
