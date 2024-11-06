import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import LogoutButton from "./index";
import "@testing-library/jest-dom";

jest.mock("./index.css", () => ({}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("LogoutButton", () => {
  it("should render the logout button", () => {
    render(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /sair/i });
    expect(button).toBeInTheDocument();
  });

  it("should remove auth from localStorage and navigate to /login on click", () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    localStorage.setItem("auth", "some-auth-token");

    render(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /sair/i });
    fireEvent.click(button);

    expect(localStorage.getItem("auth")).toBeNull();
    expect(navigate).toHaveBeenCalledWith("/login");
  });
});
