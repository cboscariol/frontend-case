import Todo from "./pages/Todo";
import IBanking from "./pages/IBanking";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TransactionsList from "./pages/IBanking/TransactionsList";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/to-do" element={<Todo />} />
        <Route path="/ibanking" element={<IBanking />} />
        <Route
          path="/transactions-list"
          element={<TransactionsList />}
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
