import { useQuery } from "@tanstack/react-query";
import getTransactionsList from "./getTransactionsList";

export const useGetTransactionsList = () => {
  const result = useQuery({
    queryKey: ["transactionsList"],
    queryFn: () => getTransactionsList(),
    refetchOnWindowFocus: false,
  });

  return result;
};
