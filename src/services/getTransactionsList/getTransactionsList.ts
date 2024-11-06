import Api, { BASE_URL } from "../../apiconfig/api";
import { ITransaction } from "../../pages/IBanking/types";

export interface ApiResponse {
  results: ITransaction[];
  itemsTotal: number;
}

const getTransactionsList = async () => {
  const token = localStorage.getItem("auth") ?? '';

  const response = await Api.get<ApiResponse>({
    url: `${BASE_URL}/list`,
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });

  return response 
};

export default getTransactionsList;
