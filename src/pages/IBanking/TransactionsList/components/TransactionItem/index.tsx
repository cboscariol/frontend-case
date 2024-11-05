import "./index.css";
import ENTRY_ARROW from "../../../../../assets/entry-transaction.svg";
import EXIT_ARROW from "../../../../../assets/exit-transaction.svg";
import REVERSE_ARROW from "../../../../../assets/reverse-transaction.svg";
import { ITransactionItem } from "../../../types";
import { sanitizeDate } from "../../../../../utils/sanitizeDate/sanitizeDate";
import { formatAmount } from "../../../../../utils/formatAmount/formatAmount";

function TransactionItem({ item }: Readonly<{ item: ITransactionItem }>) {
  
    const getTransactionsStyles = {
        ENTRY: {
            icon: ENTRY_ARROW,
            className: "transaction__entry",
            amountSymbol: "+",
        },
        EXIT: {
            icon: EXIT_ARROW,
            className: "transaction__exit",
            amountSymbol: "-",
        },
        REVERSE: {
            icon: REVERSE_ARROW,
            className: "transaction__reserse",
            amountSymbol: "",
        },
    };
  
  return (
    <li className="transaction__item">
      <div>
        <img
          src={getTransactionsStyles[item.transactionType].icon}
          alt={`${item.transactionType}`}
        />
        <p className={getTransactionsStyles[item.transactionType].className}>
          {item.name}
        </p>
        <p className="transaction__label__date">{item.label}</p>
        <p className="transaction__label__date">{sanitizeDate(item.dateEvent)}</p>
        <span className={getTransactionsStyles[item.transactionType].className}>
            {getTransactionsStyles[item.transactionType].amountSymbol} {formatAmount(item.amount)}</span>
      </div>
    </li>
  );
}

export default TransactionItem;
