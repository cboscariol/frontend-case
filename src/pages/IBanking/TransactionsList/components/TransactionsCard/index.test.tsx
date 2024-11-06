import { render } from "@testing-library/react";
import TransactionsCard from "./index";

import "@testing-library/jest-dom";

jest.mock("./index.css", () => ({}));

describe("TransactionsCard", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <TransactionsCard>
        <div>Test Child</div>
      </TransactionsCard>
    );
    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("renders top and bottom styles correctly", () => {
    const { container } = render(
      <TransactionsCard>
        <div>Test Child</div>
      </TransactionsCard>
    );
    expect(
      container.querySelector(".transactions__style.top")
    ).toBeInTheDocument();
    expect(
      container.querySelector(".transactions__style.botton")
    ).toBeInTheDocument();
  });

  it("applies the correct class to the card", () => {
    const { container } = render(
      <TransactionsCard>
        <div>Test Child</div>
      </TransactionsCard>
    );
    expect(container.querySelector(".transactions__card")).toBeInTheDocument();
  });
});
