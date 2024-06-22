import { useRef } from "preact/hooks";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBell } from "@fortawesome/free-solid-svg-icons";

function Notification({
  message,
  numMessages,
  clearMessage,
}: {
  message: string;
  numMessages: number;
  clearMessage: () => void;
}): any {
  const notificationRef = useRef(null);
  useGSAP(() => {
    const notificationAnimation = gsap.fromTo(
      notificationRef.current,
      { opacity: 0, right: -5 },
      { opacity: 1, right: 20, duration: 0.6 }
    );
    if (message) {
      notificationAnimation.play();
    } else {
      notificationAnimation.reverse();
    }
  }, [message]);

  const handleClear = () => {
    clearMessage();
  };

  return (
    <div
      id={"notification"}
      ref={notificationRef}
      className={
        "fixed text-sm opacity-0 bottom-20 w-80 h-34 font-bold rounded-lg bg-Onyx text-white shadow-2xl shadow-black dark:text-black dark:bg-Alice_Blue p-3 flex flex-col gap-2"
      }
    >
      <div className={"w-full flex justify-between"}>
        <p className={"flex items-center gap-2"}>
          <FontAwesomeIcon icon={faBell} />
          <span>{numMessages} Left</span>
        </p>
        <button onClick={handleClear}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <p
        className={"overflow-y-auto"}
        dangerouslySetInnerHTML={{ __html: message }}
      ></p>
    </div>
  );
}

export default Notification;
