import Api, { BASE_URL } from "../../apiconfig/api";

type IAuthResponse = {
    data: {
        token: string;
    }
};

type IAuthData = {
    cpf: string;
    password: string;
}


const autorization = async (data: IAuthData): Promise<IAuthResponse> => {
  const response = await Api.post({
    url: `${BASE_URL}/auth`,
    headers: {
      'Content-Type': 'application/json',
    },
    data
  });

  return response as IAuthResponse;
};

export default autorization;
