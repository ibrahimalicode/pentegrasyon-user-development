import { CloudUI } from "../../assets/icon";

const CustomFileInput = ({ onChange, value, accept, className, required }) => {
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
      for="dropzone-file"
      className={`flex flex-col items-center justify-center w-full h-64 text-[--gr-1] border-2 border-[--light-1] border-dashed rounded-lg cursor-pointer bg-[--white-1] ${className}`}
    >
      <div class="flex flex-col items-center justify-center">
        {!value ? (
          <>
            <CloudUI className="size-[2.5rem]" strokeWidth={1.5} />
            <p className="mb-2 text-sm">
              <span className="font-semibold">Yüklemek için tıklayın</span> veya
              sürükleyip bırakın
            </p>
            <p className="text-xs">
              {getReadableAcceptText(accept)} (MAX. 800x400px)
            </p>
          </>
        ) : (
          <>
            <p className="mb-2 text-sm">
              <span className="font-semibold">Seçilen dosya: </span>
              <span className="font-semibold text-[--primary-1]">
                {value.name}
              </span>
            </p>
            <p className="text-xs">
              Boyut: {(value.size / 1024).toFixed(2)} KB
            </p>
          </>
        )}
      </div>
      <input
        id="dropzone-file"
        type="file"
        class="hidden"
        onChange={onChange}
        accept={accept}
        required={required}
      />
    </label>
  );
};

export default CustomFileInput;
