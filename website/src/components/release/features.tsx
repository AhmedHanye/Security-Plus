import clsx from "clsx";

const Features = ({ data, color }: { data: string[]; color: boolean }) => {
  return (
    <div className="p-5 max-md:p-2">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex justify-start gap-x-2 py-1 font-bold max-md:text-sm"
        >
          <div className="center h-[1.5rem] max-md:h-[1.25rem]">
            <div
              className={clsx(
                "triangle",
                color ? "bg-blueLight" : "bg-purpleLight",
              )}
            ></div>
          </div>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
