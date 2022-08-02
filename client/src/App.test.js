import { render, screen } from "@testing-library/react";
import App from "./App";
import Header from "./components/Header/Header";
import { UserContextProvider } from "./contexts/userContext";
import { MemoryRouter } from "react-router-dom";

test("renders learn react link", () => {
  const element = render(
    <UserContextProvider>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </UserContextProvider>
  );
  const linkElement = element.getByText(/joinerry/i);
  expect(linkElement).toBeInTheDocument();
});
