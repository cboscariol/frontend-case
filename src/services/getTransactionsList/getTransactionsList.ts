import Api, { BASE_URL } from "../../apiconfig/api";

type IAuthResponse = {
  data: {
    token: string;
  };
};

const getTransactionsList = async (): Promise<IAuthResponse> => {
  const token = localStorage.getItem("auth");

  const response = await Api.get({
    url: `${BASE_URL}/list`,
    headers: {
      token: token || "",
      "Content-Type": "application/json",
    },
  });

  return response as IAuthResponse;
};

export default getTransactionsList;
