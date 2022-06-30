import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { replaceCamelWithSpaces } from "./App";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test("renders button", () => {
//   render(<App />);
//   const linkElement = screen.getByRole("link", { name: /learn react/i });
//   expect(linkElement).toBeInTheDocument();
// });

test("button has correct initial color", () => {
  render(<App />);
  const colorButton = screen.getByRole("button");
  expect(colorButton).toBeInTheDocument();
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  expect(colorButton.textContent).toBe("Changed to blue");
});

test("button has correct initial", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Changed to red" });
  expect(colorButton).toBeEnabled();

  const check = screen.getByRole("checkbox");
  expect(check).not.toBeChecked();
});

test("checkbox disables/enables", () => {
  render(<App />);
  const check = screen.getByRole("checkbox");
  const colorButton = screen.getByRole("button", { name: "Changed to red" });
  fireEvent.click(check);
  expect(colorButton).toBeDisabled();
  fireEvent.click(check);
  expect(colorButton).toBeEnabled();
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple capital letter", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
