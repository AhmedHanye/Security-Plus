import { Switch } from "../ui/switch";
import useStorageVariable from "@/hooks/storageVariable";

const Choice = ({ target }: { target: string }) => {
  const { value, setValue } = useStorageVariable({
    key: target,
  });

  return (
    <div className="flex items-center justify-between">
      <h2 className="font-bold text-2xl max-md:text-xl capitalize">{target}</h2>
      <Switch
        id="airplane-mode"
        checked={value === "true"}
        onCheckedChange={(checked) => {
          setValue(checked.toString());
        }}
      />
    </div>
  );
};

export default Choice;
