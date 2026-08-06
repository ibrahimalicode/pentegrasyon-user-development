import { useState } from "react";
import { CloudUI } from "../../assets/icon";
import toast from "react-hot-toast";
import { cn } from "../../lib/utils";

//image/png, image/jpeg, image/gif, application/pdf

const CustomFileInput = ({ onChange, value, accept, className, required }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file && onChange) {
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    const fileType = file.type;
    const allowedTypes = accept.split(",").map((type) => type.trim());
    if (!allowedTypes.includes(fileType)) {
      toast.error("Invalid file type");
      return;
    }
    onChange(file);
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const getReadableAcceptText = (accept) => {
    if (!accept) return "";
    return accept
      .split(",")
      .map((type) => {
        if (type.includes("image/")) return type.split("/")[1].toUpperCase();
        if (type === "application/pdf") return "PDF";
        return type;
      })
      .join(", ");
  };

  return (
    <label
      htmlFor="dropzone-file"
      className={cn(
        "relative flex flex-col items-center justify-center w-full h-64 px-4 text-center",
        "rounded-xl border-2 border-dashed border-[--border-1] bg-[--white-1] text-[--gr-1]",
        "cursor-pointer transition-colors hover:border-[--primary-1] hover:bg-[--light-3]",
        "focus-within:border-[--primary-1] focus-within:ring-2 focus-within:ring-[color-mix(in_srgb,var(--primary-1)_20%,transparent)]",
        isDragging && "border-[--primary-1] bg-[--light-1]",
        className
      )}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center gap-1">
        {!value ? (
          <>
            <span className="flex items-center justify-center size-14 mb-2 rounded-full bg-[--light-3] text-[--gr-1]">
              <CloudUI className="size-[1.75rem]" strokeWidth={1.5} />
            </span>
            <p className="text-sm text-[--black-2]">
              <span className="font-semibold text-[--primary-1]">
                Yüklemek için tıklayın
              </span>{" "}
              veya sürükleyip bırakın
            </p>
            <p className="text-xs text-[--gr-1]">
              {getReadableAcceptText(accept)} (MAX. 800x400px)
            </p>
          </>
        ) : (
          <>
            <p className="mb-1 text-sm text-[--black-2]">
              <span className="font-semibold">Seçilen dosya: </span>
              <span className="font-semibold text-[--primary-1]">
                {value.name}
              </span>
            </p>
            <p className="text-xs text-[--gr-1]">
              Boyut: {(value.size / 1024).toFixed(2)} KB
            </p>
          </>
        )}
      </div>
      <input
        type="file"
        id="dropzone-file"
        name="dropzone-file"
        className="absolute top-0 inset-0 opacity-0 cursor-pointer"
        onChange={handleInputChange}
        accept={accept}
        required={required}
      />
    </label>
  );
};

export default CustomFileInput;
