import { useEffect, useMemo, useState } from "react";
import type { TTableColumn, TTableDataSource } from "./DataTable";
import styles from "./DataTable.module.css";

interface TTablePropsMaster<T extends { id: string }> {
  columns: TTableColumn<T>[];
  dataSource: TTableDataSource<T>;
  search?: (query: string, data: T[]) => T[];
  comparator?: (
    columnId: keyof T,
    dir: "asc" | "desc",
  ) => (a: T, b: T) => number;
}

type SortDirection = "asc" | "desc" | "none";
const nextDir = { none: "asc", asc: "desc", desc: "none" } as const;

function DataTableMaster<T extends { id: string }>({
  columns,
  dataSource,
  search,
  comparator,
}: TTablePropsMaster<T>) {
  const [data, setData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{
    columnId: keyof T;
    dir: SortDirection;
  } | null>(null);

  useEffect(() => {
    dataSource
      .next(currentPage, dataSource.pageSize)
      .then((res) => setData(res as any));
  }, [dataSource]);

  const next = () => {
    if (currentPage >= dataSource.pages - 1) {
      return;
    }
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    if (data.length <= nextPage * dataSource.pageSize) {
      dataSource
        .next(nextPage, dataSource.pageSize)
        .then((d) => setData((prev) => [...prev, ...d]));
    }
  };
  const prev = () => {
    setCurrentPage(currentPage - 1);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(0);
  };

  const onSort = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (!(e.target instanceof HTMLElement) || !e.target.dataset.columnId) {
      return;
    }

    const columnId = e.target.dataset.columnId as keyof T;
    const column = columns.find((c) => c.id === columnId);
    if (!column) {
      return;
    }

    setSort((prev) => {
      const dir =
        prev?.columnId === columnId ? prev.dir : (column.sort ?? "none");
      return { columnId, dir: nextDir[dir] };
    });
  };

  const compute = useMemo(() => {
    const filtered = query && search ? search(query, data) : data;
    const sorted =
      sort && comparator && sort.dir !== "none"
        ? [...filtered].sort(comparator(sort.columnId, sort.dir))
        : filtered;

    return sorted;
  }, [query, data, sort, search, comparator, dataSource, currentPage]);

  const slicedData = () => {
    const start = currentPage * dataSource.pageSize;
    return compute.slice(start, start + dataSource.pageSize);
  };

  const content = slicedData().map((item) => {
    return (
      <tr key={item.id}>
        {columns.map((c) => {
          return (
            <td key={c.id} id={c.id} className={[styles.cell].join(" ")}>
              {c.renderer(item)}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <div className={styles.tableWrapper}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Type anything to search..."
        onChange={(e) => onSearch(e)}
      />
      <table className={styles.table}>
        <thead>
          <tr onClick={(e) => onSort(e)}>
            {columns.map((col) => {
              return (
                <th
                  key={col.id}
                  data-column-id={col.id}
                  className={styles.headerCell}
                >
                  {col.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
      <div className={styles.pagination}>
        <button disabled={currentPage === 0} onClick={prev}>
          Prev
        </button>
        <span>{`${currentPage + 1} / ${dataSource.pages}`}</span>
        <button disabled={currentPage === dataSource.pages - 1} onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
}

export { DataTableMaster };
export type { TTablePropsMaster };
