import "./index.css";
import TransactionItem from "./components/TransactionItem";
import TransactionsCard from "./components/TransactionsCard";
import { getDayAndMonth } from "../../../utils/getDayAndMonth/getDayAndMonth";
import FilterButton from "./components/FIlterButton";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTransactionsList } from "../../../services/getTransactionsList/useGetTransactionsList";
import { formatAmount } from "../../../utils/formatAmount/formatAmount";
import LogoutButton from "./components/LogoutButton";
import { ITransaction, ITransactionItem } from "../types";

function TransactionsList() {
  const [filterType, setFilterType] = useState("ALL");
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("auth");
    if (!authToken) {
      navigate("/login");
    }
  }, [navigate]);

  const { data: transactionsList } = useGetTransactionsList();

  const handleFilter = (transactionType: string) => {
    setFilterType(transactionType);
  };

  const filteredTransactions = useMemo(() => {
    if (!transactionsList) return [];

    return transactionsList.data.results.reduce((acc: ITransaction[], transaction: ITransaction) => {
      const filteredItems = transaction.items?.filter((item: ITransactionItem) => {
        if (filterType === "ALL") return true;
        return item.entry === filterType;
      });

      if (filteredItems && filteredItems.length > 0) {
        acc.push({ ...transaction, items: filteredItems });
      }

      return acc;
    }, []);
  }, [filterType, transactionsList]);

  const calculateDailyBalance = (items: ITransactionItem[]) => {
    const total = items.reduce((total, item) => {
      if (item.entry === "CREDIT") return total + item.amount;
      if (item.entry === "DEBIT") return total - item.amount;
      return total;
    }, 0);
    return formatAmount(total);
  };

  const Transaction = ({ transaction }: { transaction: ITransaction }) => {
    const dailyBalance = calculateDailyBalance(transaction.items);

    return (
      <div className="transactions__list">
        <div className="transactions__header__infos">
          <h3>{getDayAndMonth(transaction.date)}</h3>
          <p>
            saldo do dia <span>{dailyBalance}</span>
          </p>
        </div>

        <TransactionsCard>
          <ul>
            {transaction.items?.map((transactionItem: ITransactionItem) => (
              <TransactionItem
                item={transactionItem}
                key={transactionItem.id}
              />
            ))}
          </ul>
        </TransactionsCard>
      </div>
    );
  };

  return (
    <main className="transaction__list__container">
      <div className="transaction__list__action__buttons">
        <div>
          <FilterButton
            filterType="Todos"
            isActive={filterType === "ALL"}
            handleClick={() => handleFilter("ALL")}
          />
          <FilterButton
            filterType="Débito"
            isActive={filterType === "DEBIT"}
            handleClick={() => handleFilter("DEBIT")}
          />
          <FilterButton
            filterType="Crédito"
            isActive={filterType === "CREDIT"}
            handleClick={() => handleFilter("CREDIT")}
          />
        </div>

        <LogoutButton />
      </div>

      {filteredTransactions.map((transaction: ITransaction) => (
        <Transaction key={transaction.date} transaction={transaction} />
      ))}
    </main>
  );
}

export default TransactionsList;
