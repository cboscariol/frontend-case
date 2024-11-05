export interface ITransactionItem {
  id: string;
  description: string;
  label: string;
  entry: "DEBIT" | "CREDIT";
  amount: number;
  name: string;
  dateEvent: Date;
  status: "COMPLETED" | "PENDING" | "FAILED";
  transactionType: "EXIT" | "ENTRY" | "REVERSE";
}

export interface ITransaction {
  date: string;
  items: ITransactionItem[];
}
