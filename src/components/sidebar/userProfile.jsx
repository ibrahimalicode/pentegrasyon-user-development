import ArrowIR from "../../assets/icon/arrowR";

function UserProfile() {
  return (
    <div className="flex items-center gap-3 px-6 py-4 font-normal whitespace-nowrap border-t border-neutral-200">
      <div className="flex flex-1 gap-3">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/40650358102fa8387818bec83e4b93414faef9e77009d0ef4df1095af33dd8c9?apiKey=1f4fb250339844f88428d2cbf4e019e9&&apiKey=1f4fb250339844f88428d2cbf4e019e9"
          alt="User avatar"
          className="shrink-0 self-start w-10 rounded-full aspect-square"
        />
        <div className="flex flex-col flex-1">
          <div className="text-sm leading-5 text-slate-900">Liwasoft</div>
          <div className="text-xs leading-5 text-slate-500">Admin</div>
        </div>
      </div>
      <div>
        <ArrowIR className="text-[--black-1] font-bold" />
      </div>
    </div>
  );
}

export default UserProfile;
