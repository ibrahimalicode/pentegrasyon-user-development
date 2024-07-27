import CheckI from "../../assets/icon/check";

const CustomCheckbox = ({ label, checked, onChange, className }) => {
  return (
    <label className={`flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span className="w-6 h-6 flex justify-center items-center border-2 border-[--border-1] rounded-md bg-[--white-1] relative transition duration-300 ease-in-out">
        {checked && (
          <CheckI className="h-4 text-[--primary-1]" strokeWidth="4" />
        )}
      </span>
      {label && <span className="ml-2 text-[--gr-1]">{label}</span>}
    </label>
  );
};

export default CustomCheckbox;
