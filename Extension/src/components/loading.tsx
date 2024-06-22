import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Loading = ({ loading }: { loading: boolean }) => {
  return (
    <div
      class={`fixed top-0 text-white bg-Charcoal dark:bg-gray-200 dark:bg-opacity-20 dark:text-white bg-opacity-30 text-6xl z-50 h-screen w-screen flex items-center justify-center ${loading? "block" : "hidden"}`}
    >
      <FontAwesomeIcon icon={faCircleNotch} className={"animate-spin"} />
    </div>
  );
};

export default Loading;
