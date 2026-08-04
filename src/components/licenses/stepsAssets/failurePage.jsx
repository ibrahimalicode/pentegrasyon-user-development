import { Link } from "react-router-dom";
import failed_card from "../../../assets/img/failed_card.png";
import { TOOLBAR_BTN_PRIMARY } from "../../../components/common/toolbarStyles";
import { cn } from "../../../lib/utils";
const FailurePage = ({ currentPath, actionType }) => {
  return (
    <main className="flex flex-col justify-start items-center pt-16">
      <div className="w-[25rem] overflow-visible">
        <img src={failed_card} alt="failed_card" />
      </div>

      <div className="pt-8 text-center">
        <p className="text-3xl mb-4 text-[--black-2]">Ödeme Başarısız ! 😔</p>
        <p className="text-[--gr-1] px-4">
          İşleminiz teknik bir hata nedeniyle başarısız oldu. Lütfen tekrar
          deneyin.
        </p>
      </div>

      <div className="w-full flex justify-center pt-4">
        <Link
          to={currentPath?.replace(`/${actionType}`, "")}
          className={cn(TOOLBAR_BTN_PRIMARY, "group")}
        >
          Lisanslara git
        </Link>
      </div>
    </main>
  );
};

export default FailurePage;
