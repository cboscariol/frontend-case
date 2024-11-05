export type ITodoTypes = "pending" | "done";

type ILinks = {
  name: string;
  url: string;
};

export type ITodoElements = {
  id: string;
  ref: string;
  title: string;
  description: JSX.Element;
  status: string;
  required: boolean;
  links?: ILinks[];
};
