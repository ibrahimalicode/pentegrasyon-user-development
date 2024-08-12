//RestaurantTransfer
import { useEffect, useRef, useState } from "react";
import { DeleteI, EditI } from "../../assets/icon";
import EyeI from "../../assets/icon/eye";
import MenuI from "../../assets/icon/menu";
import CustomInput from "../common/customInput";
import CustomSelect from "../common/customSelector";
import CustomToggle from "../common/customToggle";
import { usePopup } from "../../context/PopupContext";

const RestaurantTransfer = () => {
  const templateMenuRef = useRef();
  const { contentRef, setContentRef } = usePopup();

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  function handleSelectedTemplate(index) {
    setSelectedTemplate((prev) => (prev === index ? null : index));
  }

  useEffect(() => {
    if (templateMenuRef) {
      const refs = contentRef.filter((ref) => ref.id !== "templateMenuRefId");
      setContentRef([
        ...refs,
        {
          id: "templateMenuRefId",
          outRef: null,
          ref: templateMenuRef,
          callback: () => setSelectedTemplate(null),
        },
      ]);
    }
  }, [templateMenuRef, selectedTemplate]);

  const templates = [{ days: 10, name: "Yeni Kayıt template" }];
  return (
    <form>
      <h1 className="gap-2.5 self-stretch py-2 w-full text-lg border-b border-[--border-1] max-sm:mt-8 max-md:max-w-full">
        Restoran Transfer
      </h1>
      <div className="flex gap-3 w-full mt-4">
        {/*  <CustomInput placeholder="Gun" className2="max-w-28 sm:mt-0 mt-0" /> */}
        <CustomSelect
          value={{ value: "Template Seç", label: "Template Seç" }}
          className="text-sm"
          className2="max-w-40 sm:mt-0 mt-0"
        />
        <button
          type="button"
          className="px-6 py-2.5 text-[--white-1] bg-[--primary-1] rounded-xl self-end"
          onClick={() => {}}
        >
          Ekle
        </button>
      </div>
      <div className="w-max max-w-full pt-2 border-t border-[--border-1] mt-8">
        <p className="text-xs text-[--red-1]">
          Aşağıdaki seçilen şablonlar otomatik olarak gönderilecektir.
        </p>
        <div className="max-w-full sm:pr-24 mt-2 flex flex-wrap gap-3">
          {templates.map((template, index) => (
            <div
              className="flex items-center w-max border border-[--border-1] mt-2 px-2 py-3 gap-3 rounded-md"
              key={index}
            >
              <div className="flex">
                {/* <p className="text-xs font-light">{template.days} gün</p> */}
                <p className="text-sm text-[--gr-1]">{template.name}</p>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => handleSelectedTemplate(index)}
                  ref={index === selectedTemplate ? templateMenuRef : null}
                >
                  <MenuI className="text-[--gr-1] cursor-pointer" />
                </button>
                <div
                  className={`absolute -top-8 right-5 text-sm text-[--black-1] font-light bg-[--white-1] border border-[--border-1] rounded-md shadow-md ${
                    selectedTemplate !== index && "invisible"
                  }`}
                >
                  <ul>
                    <li className="flex items-center gap-3 pl-4 pr-7 py-2 border-b border-[--border-1] cursor-pointer">
                      <EyeI className="size-4" /> Preview
                    </li>
                    <li className="flex items-center gap-3 pl-4 pr-7 py-2 border-b border-[--border-1] cursor-pointer">
                      <EditI className="size-4" /> Düzenle
                    </li>
                    <li className="flex items-center gap-3 pl-4 pr-7 py-2 text-[--red-1] cursor-pointer">
                      <DeleteI className="size-4" /> Sil
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-end mt-8">
        <CustomToggle />
        <button
          type="button"
          className="px-6 py-2.5 text-[--white-1] bg-[--primary-1] rounded-lg self-end"
          onClick={() => {}}
        >
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default RestaurantTransfer;
