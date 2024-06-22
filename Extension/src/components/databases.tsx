import { useState } from "react";
import DataBase from "../components/database";
import Notification from "../components/notification";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DataBases = ({ setLoading }: { setLoading: Function }) => {
  const [notifications, setNotifications] = useState<string[]>([]);
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".database", {
      opacity: 0,
      x: 50,
      stagger: 0.2,
      duration: 0.4,
      ease: "ease-in-out",
    });
  });
  return (
    <section id={"Databases"}>
      <DataBase
        name={"URLs"}
        setNotifications={setNotifications}
        setLoading={setLoading}
      />
      <DataBase
        name={"Domains"}
        setNotifications={setNotifications}
        setLoading={setLoading}
      />
      <Notification
        message={notifications[0]}
        numMessages={notifications.length - 1}
        clearMessage={() => {
          setNotifications(notifications.slice(1));
        }}
      />
    </section>
  );
};

export default DataBases;
