import DataTableDemo from "@/components/database/dataTable";
import Title from "@/hooks/title";
import { handleData } from "@/lib/controlerUtils";
import { useEffect, useState } from "react";

const DataBase = () => {
  const [data, setData] = useState<rule[]>([]);
  Title("DataBase");
  useEffect(() => {
    handleData((response) => {
      setData([...response.pageRules, ...response.domainRules]);
    });
  }, []);

  return (
    <section id="data-base" className="h-full px-5 max-md:px-0">
      <h1 className="text-5xl font-extrabold pb-10 heading-color">DataBase</h1>
      <DataTableDemo data={data} />
    </section>
  );
};

export default DataBase;
