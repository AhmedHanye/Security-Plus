import { handleUrlAction } from "@/lib/controlerUtils";
import { BrickWall, DoorOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface CheckerCtrlProps {
  url: string | undefined;
}

const CheckerCtrl: React.FC<CheckerCtrlProps> = ({ url }) => {
  const [hotkeys, setHotkeys] = useState<string[]>([
    "alt+a",
    "alt+b",
    "alt+c",
    "alt+s",
  ]);

  const allowDomainRef = useRef<HTMLButtonElement>(null);
  const blockDomainRef = useRef<HTMLButtonElement>(null);
  const allowPageRef = useRef<HTMLButtonElement>(null);
  const blockPageRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const whichOs = navigator.userAgent.toLowerCase();
    if (whichOs.includes("mac os"))
      setHotkeys(["option+a", "option+b", "option+c", "option+s"]);
  }, []);

  useHotkeys(hotkeys[0], () => allowDomainRef.current?.click(), [hotkeys]);
  useHotkeys(hotkeys[1], () => blockDomainRef.current?.click(), [hotkeys]);
  useHotkeys(hotkeys[2], () => allowPageRef.current?.click(), [hotkeys]);
  useHotkeys(hotkeys[3], () => blockPageRef.current?.click(), [hotkeys]);

  const handleUserSubmit = (rule: rule) =>
    handleUrlAction(rule, () => {
      if (url) {
        window.location.replace(url);
      }
    });

  return (
    <div
      id="checker-controler"
      className="text-black px-4 max-lg:px-2 h-full center"
    >
      <div className="flex flex-wrap h-fit my-auto justify-between items-center gap-y-2">
        <button
          ref={allowDomainRef}
          className="ctrl-button ctrl-button-allow"
          onClick={() =>
            handleUserSubmit({
              domain: new URL(url as string).hostname,
              status: "allowed",
            })
          }
          title={hotkeys[0]}
        >
          <DoorOpen className="ctrl-button-icon" />
          <span>Allow Domain</span>
        </button>

        <button
          ref={blockDomainRef}
          className="ctrl-button ctrl-button-block"
          onClick={() =>
            handleUserSubmit({
              domain: new URL(url as string).hostname,
              status: "blocked",
            })
          }
          title={hotkeys[1]}
        >
          <BrickWall className="ctrl-button-icon" />
          <span>Block Domain</span>
        </button>

        <button
          ref={allowPageRef}
          className="ctrl-button ctrl-button-allow"
          onClick={() =>
            handleUserSubmit({
              url: url,
              status: "allowed",
            })
          }
          title={hotkeys[2]}
        >
          <DoorOpen className="ctrl-button-icon" />
          <span>Allow Page</span>
        </button>

        <button
          ref={blockPageRef}
          className="ctrl-button ctrl-button-block"
          onClick={() =>
            handleUserSubmit({
              url: url,
              status: "blocked",
            })
          }
          title={hotkeys[3]}
        >
          <BrickWall className="ctrl-button-icon" />
          <span>Block Page</span>
        </button>
      </div>
    </div>
  );
};

export default CheckerCtrl;
