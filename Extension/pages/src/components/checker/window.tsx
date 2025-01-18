import { Mosaic, MosaicWindow } from "react-mosaic-component";
import "react-mosaic-component/react-mosaic-component.css";
import { JSX, useState } from "react";
import useStorageVariable from "@/hooks/storageVariable";
import { ExternalLink, Lock, LockOpen, Shield } from "lucide-react";

// * Titles for the widgets displayed in the mosaic layout
const TITLE_MAP: { [key in "a" | "b" | "c"]: JSX.Element | string } = {
  a: (
    <div className="flex items-center gap-1 ">
      <Shield size={19} />
      <span>Checker Controler</span>
    </div>
  ),
  b: "VirusTotal",
  c: "WhoIs",
};

const Window = ({
  widgets,
  virusTotalUrlResult,
  whoIsUrlResult,
}: {
  widgets: { [key: string]: JSX.Element };
  virusTotalUrlResult: string;
  whoIsUrlResult: string;
}) => {
  // * Handle iframe interaction so that the user can't interact with the iframe when dragging the layout
  // ! This is a workaround for the issue that the iframe is blocking the drag event
  const [iframeState, setIframeState] = useState<boolean>(true);
  const handleIframeState = (state: boolean) => {
    if (state !== iframeState) {
      setIframeState(state);
      document.querySelectorAll("iframe").forEach((iframe) => {
        iframe.style.pointerEvents = state ? "auto" : "none";
      });
    }
  };

  // * Handle layout state
  const { value: orderCash, setValue: setOrderCash } = useStorageVariable({
    key: "orderCash",
  });

  const { value: lockState, setValue: setLockState } = useStorageVariable({
    key: "lockState",
  });

  // * External link for the tool
  const externalLink = (id: string) => {
    if (id === "a") return <></>;
    else {
      return (
        <a
          href={id === "b" ? virusTotalUrlResult : whoIsUrlResult}
          className="size-full px-1 text-background bg-foreground hover:brightness-75 center cursor-pointer block"
          target="_blank"
          title="Open in new tab"
        >
          <ExternalLink size={18} />
        </a>
      );
    }
  };
  return (
    <>
      <Mosaic
        renderTile={(id: "a" | "b" | "c", path) => (
          <MosaicWindow
            path={path}
            title={TITLE_MAP[id] as string}
            toolbarControls={externalLink(id)}
          >
            {widgets[id]}
          </MosaicWindow>
        )}
        initialValue={
          JSON.parse(orderCash!) || {
            first: {
              first: "a",
              second: "c",
              direction: "column",
              splitPercentage: 22.97444148810607,
            },
            second: "b",
            direction: "row",
            splitPercentage: 33.81770145310436,
          }
        }
        onChange={() => handleIframeState(false)}
        onRelease={(cash) => {
          // * When the user releases the layout, the iframe is enabled again
          handleIframeState(true);
          setOrderCash(JSON.stringify(cash));
        }}
        className={`mosaic-blueprint-theme ${
          lockState === "true" && "disable-layout-changes"
        }`}
      />
      <button
        className="fixed center bottom-8 left-8 transition-all duration-150 size-10 rounded-full z-50 bg-zinc-600 dark:bg-zinc-500 text-white"
        onClick={() => {
          setLockState(lockState === "true" ? "false" : "true");
        }}
        title={`Layout is ${lockState === "true" ? "locked" : "unlocked"}`}
      >
        {lockState === "true" ? <Lock /> : <LockOpen />}
      </button>
    </>
  );
};

export default Window;
