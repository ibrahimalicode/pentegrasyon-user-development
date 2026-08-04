import { useEffect, useRef } from "react";
import { useSlideBar } from "../../context/SlideBarContext";
import { cn } from "../../lib/utils";

const SlideBar = () => {
  const slideBarRef = useRef();

  const { slideBarContent, setSlideBarContent } = useSlideBar();

  function handleClickOutside(e) {
    if (!slideBarRef.current.contains(e.target)) {
      setSlideBarContent(null);
    }
  }

  useEffect(() => {
    if (slideBarContent) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [slideBarContent]);

  return (
    <div
      onClick={handleClickOutside}
      className={cn(
        "fixed inset-0 items-center transition-colors z-[9999]",
        slideBarContent
          ? "flex bg-[--black-1]/40 backdrop-blur-[2px]"
          : "hidden",
        !slideBarContent?.content && "justify-end"
      )}
    >
      <div
        ref={slideBarRef}
        className={cn(
          "w-[90%] max-w-[35rem] rounded-xl border border-solid border-[--border-1] bg-[--white-1] shadow-modal",
          "transition-transform duration-500 ease-out",
          slideBarContent ? "translate-x-0" : "translate-x-[200%]"
        )}
      >
        {slideBarContent?.content || slideBarContent}
      </div>
    </div>
  );
};

export default SlideBar;
