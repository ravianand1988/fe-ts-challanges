import { useEffect, useMemo, useState } from "react";
import { fetchStock, type Stock } from "src/utilities";
import { DataTable, type TTableColumn } from "./DataTable";
import styles from "./DataTable.module.css";

type SortDirection = "asc" | "desc" | "none";
const nextDir = { none: "asc", asc: "desc", desc: "none" } as const;

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
const PAGE_SIZE = 5;

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

export const DataTableExample = () => {
  const [stockData, setStockData] = useState<Stock[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<{
    columnId: keyof Stock;
    direction: SortDirection;
  } | null>(null);

  async function load(page = 0) {
    if (stockData.length >= (PAGE_SIZE * totalPages || 1)) {
      return;
    }

    setIsLoading(true);
    const data = await fetchStock(page, PAGE_SIZE);
    setIsLoading(false);
    setCurrentPage(data.page);
    setStockData((existingData) => [...existingData, ...data.data]);
    setTotalPages(data.totalPages);
  }

  async function loadNext() {
    if (stockData.length >= (PAGE_SIZE * totalPages || 1)) {
      setCurrentPage((val) => val + 1);
    }

    load(currentPage + 1);
  }

  async function loadPrev() {
    if (stockData.length >= (PAGE_SIZE * totalPages || 1)) {
      setCurrentPage((val) => val - 1);
    }

    load(currentPage - 1);
  }

  useEffect(() => {
    load();
  }, []);

  function handleSorting(e: React.MouseEvent) {
    if (!(e.target instanceof HTMLElement) || !e.target.dataset.columnId) {
      return;
    }

    const columnId = e.target.dataset.columnId as keyof Stock;
    const col = columns.find((c) => c.id === columnId);
    if (!col) {
      return;
    }

    if (col) {
      setSort((prev) => {
        const dir =
          prev?.columnId === columnId ? prev.direction : (col.sort ?? "none");
        return { columnId, direction: nextDir[dir] };
      });
    }
  }

  const query = searchQuery.trim().toLowerCase();
  const compute = useMemo(() => {
    const filtered = query
      ? stockData.filter((stock) => {
          return Object.values(stock).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase()),
          );
        })
      : stockData;
    const sorted =
      sort && sort.direction !== "none"
        ? [...filtered].sort(defaultComparator(sort.columnId, sort.direction))
        : filtered;
    return sorted;
  }, [query, sort, stockData]);

  const chunk = compute.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE,
  );

  return (
    <>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Type anything to search..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {isLoading ? (
        <p> Loading stock data... </p>
      ) : (
        <DataTable
          data={chunk}
          columns={columns}
          onSort={(e) => handleSorting(e)}
          sortState={sort}
        />
      )}
      <div className={styles.pagination}>
        <button
          type="button"
          onClick={() => loadPrev()}
          disabled={currentPage === 0}
        >
          Prev
        </button>
        <span>{`Page: ${currentPage + 1} / ${totalPages}`}</span>
        <button
          type="button"
          onClick={() => loadNext()}
          disabled={currentPage + 1 === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};
