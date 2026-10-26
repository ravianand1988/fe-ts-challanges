import { type MouseEventHandler, type ReactNode } from "react";
import styles from "./DataTable.module.css";

interface TTableDataSource<T> {
  pageSize: number;
  pages: number;
  next: (page: number, pageSize: number) => Promise<T>;
}

interface TTableColumn<T> {
  id: string;
  name: string;
  renderer: (item: T) => ReactNode;
  sort?: "asc" | "desc" | "none";
}

interface TTableProps<T extends { id: string }> {
  columns: TTableColumn<T>[];
  data: T[];
  onSort: MouseEventHandler<HTMLTableRowElement>;
  sortState?: { columnId: string; direction: "asc" | "desc" | "none" } | null;
}

const ariaSort = {
  asc: "ascending",
  desc: "descending",
  none: "none",
} as const;

function DataTable<T extends { id: string }>({
  columns,
  data,
  onSort,
  sortState,
}: TTableProps<T>) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr onClick={onSort}>
            {columns.map((col) => {
              return (
                <th
                  className={styles.headerCell}
                  data-column-id={col.id}
                  aria-sort={
                    sortState?.columnId === col.id
                      ? ariaSort[sortState.direction]
                      : "none"
                  }
                  key={col.id}
                >
                  {col.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr className={styles.row} key={item.id}>
                {Object.entries(item).map(([key, value], index) => {
                  return (
                    <td
                      key={`${key}-${index}`}
                      className={[
                        styles.cell,
                        typeof value === "number" ? styles.numeric : "",
                      ].join(" ")}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export { DataTable };
export type { TTableColumn, TTableDataSource, TTableProps };
