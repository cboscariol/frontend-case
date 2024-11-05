import { ReactNode } from "react";
import "./index.css";

interface TransactionsCardProps {
  children: ReactNode;
}

function TransactionsCard({ children }: Readonly<TransactionsCardProps>) {
  return (
    <>
      <div className="transactions__style top"></div>
      <div className="transactions__card">{children}</div>
      <div className="transactions__style botton"></div>
    </>
  );
}

export default TransactionsCard;
