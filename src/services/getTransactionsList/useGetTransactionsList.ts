import { useQuery, UseQueryResult } from "@tanstack/react-query";
import getTransactionsList from "./getTransactionsList";

export const useGetTransactionsList = (): UseQueryResult<any> => {
  const result = useQuery({
    queryKey: ["transactionsList"],
    queryFn: () => getTransactionsList(),
    refetchOnWindowFocus: false,
  });

  return result;
};
