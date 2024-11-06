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


const autorization = async (data: IAuthData) => {
  const response = await Api.post<IAuthResponse['data'], IAuthData>({
    url: `${BASE_URL}/auth`,
    headers: {
      'Content-Type': 'application/json',
    },
    data
  });

  return response;
};

export default autorization;
