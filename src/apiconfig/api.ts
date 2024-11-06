import Axios from "axios";

export interface IRequest<P = unknown> {
  url: string;
  data?: P;
  headers?: { [key: string]: string };
}

export const BASE_URL = "http://localhost:3000";

const Api = {
  post: <R, P>({ url, data, headers }: IRequest<P>) =>
    Axios.post<R>(url, data, { headers }),

  get: <R>({ url, headers }: IRequest) =>
    Axios.get<R>(url, { headers }),
};

export default Api;
