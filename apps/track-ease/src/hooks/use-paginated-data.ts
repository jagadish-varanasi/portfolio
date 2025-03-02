import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const { data } = await axios.get("/api/data", {
    params: { page, limit, search },
  });
  return data;
};

const usePaginatedData = (page: number, limit: number, search: string) => {
  return useQuery({
    queryKey: ["data", page, limit, search],
    queryFn: () => fetchData({ page, limit, search })
  });
};
