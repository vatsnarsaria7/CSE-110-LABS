import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";

test("displays all items in the list", () => {
  render(<ToDoList />);
  const items = screen.getAllByRole("checkbox");
  expect(items.length).toBe(4);
});

test("counts items checked", () => {
  render(<ToDoList />);
  const items = screen.getAllByRole("checkbox");
  fireEvent.click(items[0]);
  fireEvent.click(items[1]);
  const numItemsBought = screen.getByText("Items bought: 2");
  expect(numItemsBought).toBeInTheDocument();
});
