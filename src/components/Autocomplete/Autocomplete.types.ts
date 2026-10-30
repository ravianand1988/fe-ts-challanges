import type { TAutocompleteItem } from "src/api";

export interface IAutocomplete<T> {
  label?: string;
  placeholder?: string;
  options: TAutocompleteItem<T>[];
  onSelect: (item: TAutocompleteItem<T>) => void;
  onQueryChange: (query: string) => void;
  getOptionLabel: (item: T) => string;
  loading: boolean;
  error: string | null;
}
