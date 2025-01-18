import Choice from "@/components/settings/choice";
import Title from "@/hooks/title";

const Settings = () => {
  Title("Settings");
  return (
    <section id="settings" className="px-5 max-md:px-0">
      <h1 className="heading-color text-5xl font-extrabold pb-14">Settings</h1>
      <div className="px-8 max-md:px-4 flex flex-col gap-5">
        <Choice target="virusTotal" />
        <Choice target="whoIs" />
      </div>
    </section>
  );
};

export default Settings;
