import { parseAsString, useQueryState } from "nuqs";

export function useSearchParam(key: string = "search") {
  return useQueryState(
    key,
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );
}
