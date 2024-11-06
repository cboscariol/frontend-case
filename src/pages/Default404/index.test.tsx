import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Default404 from "./index";

jest.mock("../../assets/logo.svg", () => "mocked-logo.svg");
jest.mock("./index.css", () => ({}));

describe("Default404 Page", () => {
    test("renders the 404 page with correct elements", () => {
        render(<Default404 />);

        const logo = screen.getByAltText("404");
        const heading1 = screen.getByText("404");
        const heading2 = screen.getByText("Página não encontrada");

        expect(logo).toBeInTheDocument();
        expect(heading1).toBeInTheDocument();
        expect(heading2).toBeInTheDocument();
    });
});
