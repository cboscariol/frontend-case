import Todo from "./pages/Todo";
import { Login, TransactionsList } from "./pages/IBanking";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Default404 from "./pages/Default404";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/to-do" element={<Todo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transactions-list" element={<TransactionsList />} />
        <Route path="*" element={<Default404 />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
