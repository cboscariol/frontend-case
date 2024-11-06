import { render, screen, fireEvent } from "@testing-library/react";
import FilterButton from "./index";
import "@testing-library/jest-dom";

jest.mock("./index.css", () => ({}));

describe("FilterButton component", () => {
  const handleClick = jest.fn();

  it("renders the button with the correct filter type", () => {
    render(
      <FilterButton
        filterType="All"
        isActive={false}
        handleClick={handleClick}
      />
    );
    expect(screen.getByText("All")).toBeInTheDocument();
  });

  it("applies the active class when isActive is true", () => {
    render(
      <FilterButton
        filterType="Active"
        isActive={true}
        handleClick={handleClick}
      />
    );
    expect(screen.getByText("Active")).toHaveClass("active");
  });

  it("does not apply the active class when isActive is false", () => {
    render(
      <FilterButton
        filterType="Inactive"
        isActive={false}
        handleClick={handleClick}
      />
    );
    expect(screen.getByText("Inactive")).not.toHaveClass("active");
  });

  it("calls handleClick when the button is clicked", () => {
    render(
      <FilterButton
        filterType="Débito"
        isActive={false}
        handleClick={handleClick}
      />
    );
    fireEvent.click(screen.getByText("Débito"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
