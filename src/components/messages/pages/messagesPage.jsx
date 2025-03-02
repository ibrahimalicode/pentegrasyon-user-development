//MODULES
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//COMP
import { SeenI } from "../../../assets/icon";
import CustomPing from "../../common/customPing";

//UTILS
import { formatDateString } from "../../../utils/utils";
import { useFirestore } from "../../../context/FirestoreContext";
import { useMessagesContext } from "../../../context/MessagesContext";

//REDUX
import { updateMessageStatus } from "../../../redux/messages/updateMessageStatusSlice";

const MessagesPage = () => {
  const dispatch = useDispatch();
  const { newMessage } = useFirestore();
  const { messagesData } = useMessagesContext();

  useEffect(() => {
    return () => {
      if (messagesData && messagesData.some((_) => !_.isRead)) {
        dispatch(updateMessageStatus(messagesData));
      } else if (newMessage) {
        dispatch(updateMessageStatus([newMessage]));
      }
    };
  }, [messagesData, newMessage]);

  return (
    <section className="lg:ml-[280px] pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-full text-[--black-2] py-4 text-2xl font-semibold">
        <h2>Mesajlar</h2>
      </div>

      <main className="flex flex-col gap-4">
        {messagesData &&
          messagesData
            .filter((M) => M.platforms == 2)
            .map((_) => (
              <div
                key={_.id}
                className="border-2 border-[--border-1] rounded-md p-2 bg-[--light-1]"
              >
                <p
                  className="font-bold pb-1"
                  dangerouslySetInnerHTML={{ __html: _.title }}
                >
                  {/* {_.title} */}
                </p>
                <p
                  className="text-sm pl-3"
                  dangerouslySetInnerHTML={{ __html: _.content }}
                >
                  {/* {_.content} */}
                </p>
                <div className="flex justify-end text-xs items-center gap-1.5">
                  <p>
                    {formatDateString({
                      dateString: _.createdDateTime,
                      hour: true,
                      min: true,
                    })}
                  </p>
                  <p className="flex justify-end">
                    {_.isRead ? (
                      <SeenI className="fill-[--green-1] text-[--green-1]" />
                    ) : (
                      <CustomPing
                        bgColor1="var(--green-1)"
                        bgColor2="var(--green-1)"
                      />
                    )}
                  </p>
                </div>
              </div>
            ))}
      </main>
    </section>
  );
};

export default MessagesPage;
