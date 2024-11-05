import Axios from "axios";

export interface IRequest {
  url: string;
  data?: any;
  headers?: { [key: string]: string };
}

export const BASE_URL = "http://localhost:3000";

const Api = {
  post: ({ url, data, headers }: IRequest): Promise<any> =>
    Axios.post(url, data, { headers }),

  get: ({ url, headers }: IRequest): Promise<any> =>
    Axios.get(url, { headers }),
};

export default Api;
