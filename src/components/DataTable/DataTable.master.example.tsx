import { useMemo } from "react";
import { fetchStock, type Stock } from "src/utilities";
import { type TTableColumn, type TTableDataSource } from "./DataTable";
import { DataTableMaster } from "./DataTable.master";

const columns: TTableColumn<Stock>[] = [
  { id: "serial", name: "Sr.", renderer: (s) => s.id },
  { id: "symbol", name: "Symbol", renderer: (s) => s.symbol },
  { id: "name", name: "Name", renderer: (s) => s.name },
  { id: "price", name: "Price", renderer: (s) => `$${s.price.toFixed(2)}` },
  {
    id: "change",
    name: "Change",
    renderer: (s) => (
      <span style={{ color: s.change >= 0 ? "green" : "red" }}>
        {s.change > 0 ? "+" : ""}
        {s.change.toFixed(2)}
      </span>
    ),
  },
  {
    id: "changePercent",
    name: "% Change",
    renderer: (s) => (
      <span style={{ color: s.changePercent >= 0 ? "green" : "red" }}>
        {s.changePercent.toFixed(2)}%
      </span>
    ),
  },
  { id: "volume", name: "Volume", renderer: (s) => s.volume.toString() },
  {
    id: "marketCap",
    name: "Market Cap",
    renderer: (s) => s.marketCap.toString(),
  },
  { id: "peRatio", name: "P/E Ratio", renderer: (s) => s.peRatio.toString() },
];

const defaultComparator =
  (columnId: keyof Stock, direction: "asc" | "desc") =>
  (a: Stock, b: Stock): number => {
    const modifier = direction === "asc" ? 1 : -1;
    if (typeof a[columnId] === "string" && typeof b[columnId] === "string") {
      return a[columnId].localeCompare(b[columnId]) * modifier;
    }
    if (typeof a[columnId] === "number" && typeof b[columnId] === "number") {
      return (a[columnId] - b[columnId]) * modifier;
    }
    return 0;
  };

const dataSource: () => TTableDataSource<Stock> = () => {
  const pageSize = 5;
  const pages = Math.ceil(20 / pageSize);

  return {
    pages,
    pageSize,
    next: async (page: number, size: number) => {
      if (page >= pages) {
        return [];
      }
      const res = await fetchStock(page, size);
      return res.data;
    },
  };
};

export const DataTableMasterExample = () => {
  const dataSourceLocal = useMemo(() => dataSource(), []);
  const search = (query: string, data: Stock[]) => {
    const res = data.filter((d) =>
      Object.values(d).some((v) =>
        String(v).toLowerCase().includes(query.toLowerCase()),
      ),
    );
    return res;
  };

  return (
    <>
      <DataTableMaster
        columns={columns}
        dataSource={dataSourceLocal}
        search={(query, data) => search(query, data)}
        comparator={defaultComparator}
      />
    </>
  );
};
