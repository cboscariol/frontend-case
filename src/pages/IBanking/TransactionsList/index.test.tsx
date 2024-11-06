import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TransactionsList from "./index";
import { useGetTransactionsList } from "../../../services/getTransactionsList/useGetTransactionsList";
import "@testing-library/jest-dom";


jest.mock("./index.css", () => ({}));

const MockTransactionItem = jest.fn().mockReturnValue(<div>MockTransactionItem</div>);
jest.mock('./components/TransactionItem', () => () => <MockTransactionItem />);
const MockTransactionsCard = jest.fn().mockReturnValue(<div>MockTransactionsCard</div>);
jest.mock('./components/TransactionsCard', () => () => <MockTransactionsCard />);
const MockLogoutButton = jest.fn().mockReturnValue(<div>MockLogoutButton</div>);
jest.mock('./components/LogoutButton', () => () => <MockLogoutButton />);
const MockFIlterButton = jest.fn().mockReturnValue(<button>MockFIlterButton</button>);
jest.mock('./components/FIlterButton', () => () => <MockFIlterButton />);


jest.mock("../../../services/getTransactionsList/useGetTransactionsList");
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(() => mockNavigate),
  }));

const mockTransactions = {
  data: {
    results: [
      {
        date: "2023-10-01",
        items: [
          { id: "1", entry: "CREDIT", amount: 100 },
          { id: "2", entry: "DEBIT", amount: 50 },
        ],
      },
    ],
  },
};

const renderComponent = () => {
  render(
    <MemoryRouter>
      <TransactionsList />
    </MemoryRouter>
  );
};

describe("TransactionsList", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("auth", "token");

    (useGetTransactionsList as jest.Mock).mockReturnValue({
      data: mockTransactions,
    });

    renderComponent();
  });


  it("renders transactions list correctly", () => {
    expect(screen.getByText("01 de outubro")).toBeInTheDocument();
    expect(screen.getByText("saldo do dia")).toBeInTheDocument();
    expect(screen.getByText("R$ 0,50")).toBeInTheDocument();
  });

  it("filters transactions correctly", () => {

    fireEvent.click(screen.getAllByText("MockFIlterButton")[0]);
    expect(screen.getByText("R$ 0,50")).toBeInTheDocument();

    fireEvent.click(screen.getAllByText("MockFIlterButton")[1]);
    expect(screen.queryByText("R$ 100,00")).not.toBeInTheDocument();    
  });
});
