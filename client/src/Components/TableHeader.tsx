import React from "react";

type AppProps = {
  headers: Array<{
    label:string;
    width:string;
  }>;
};
const TableHeader = ({ headers }: AppProps) => {
  return <thead>
  <tr>
    {headers.map((data, i) => (
      <th key={i} data-width={data.width} className={i === 1 ? "td-border" : ""}>
        {data.label}
      </th>
    ))}
  </tr>
</thead>;
};

export default TableHeader;
