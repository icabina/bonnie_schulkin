import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });
  const user = userEvent.setup();

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00", { exact: false });

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(scoopsSubtotal).toHaveTextContent("2.00", { exact: false });

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();

  // render parent component
  render(<Options optionType="toppings" />);

  // make sure total starts out at $0.00
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  // add cherries and check subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");

  // add hot fudge and check subtotal
  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot fudge" });
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("3.00");

  // remove hot fudge and check subtotal
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");
});

test("total starts at 0.00", async () => {
  render(<OrderEntry />);
  const grandTotal = screen.getByRole("heading", {
    name: /grand total: \$/i, //REGEX
  });
  expect(grandTotal).toHaveTextContent("0.00");
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    // Test that the total starts out at $0.00
    render(<OrderEntry />);
    const user = userEvent.setup();

    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("0.00");

    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    // add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    // add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("1.50");

    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    // add cherries
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    // grand total $1.50

    // update vanilla scoops to 2; grand total should be $5.50
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    // remove 1 scoop of vanilla and check grand total
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    // check grand total
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("3.50");

    // remove cherries and check grand total
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
