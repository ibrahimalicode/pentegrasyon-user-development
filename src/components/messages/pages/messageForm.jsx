import CustomInput from "../../common/customInput";
import CustomTextarea from "../../common/customTextarea";

const MessageForm = ({ message, setMessage }) => {
  return (
    <main>
      <CustomInput
        label="Başlık"
        placeholder="Başlık"
        value={message.title}
        className="max-w-[25rem]"
        onChange={(e) => {
          setMessage((prev) => {
            return {
              ...prev,
              title: e,
            };
          });
        }}
      />
      <CustomTextarea
        value={message.body}
        label="İçerik"
        placeholder="Mesajınızı yazın"
        className="max-w-[55rem] min-h-40"
        onChange={(e) => {
          setMessage((prev) => {
            return {
              ...prev,
              body: e.target.value,
            };
          });
        }}
      />
    </main>
  );
};

export default MessageForm;
