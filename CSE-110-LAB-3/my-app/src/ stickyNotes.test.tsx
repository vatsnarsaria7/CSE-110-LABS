import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { get } from "http";

describe("Create StickyNote", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates a new note", () => {
    render(<StickyNotes />);

    // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });
});

test("Read: Are all created notes displayed on the screen?", () => {
  render(<StickyNotes />);
  const title = screen.getByPlaceholderText("Note Title");
  const content = screen.getByPlaceholderText("Note Content");
  const createNoteButton = screen.getByText("Create Note");

  fireEvent.change(title, { target: { value: "Finish Homework" } });
  fireEvent.change(content, { target: { value: "Complete all the tasks" } });
  fireEvent.click(createNoteButton);

  const newNoteTitle = screen.getByText("Finish Homework");
  const newNoteContent = screen.getByText("Complete all the tasks");

  expect(newNoteTitle).toBeInTheDocument();
  expect(newNoteContent).toBeInTheDocument();
});

test("Update: Can you update a note?", () => {
  render(<StickyNotes />);
  const title = screen.getByPlaceholderText("Note Title");
  const content = screen.getByPlaceholderText("Note Content");
  const createNoteButton = screen.getByText("Create Note");

  fireEvent.change(title, { target: { value: "Finish Homework" } });
  fireEvent.change(content, { target: { value: "Complete all the tasks" } });
  fireEvent.click(createNoteButton);

  const newNoteTitle = screen.getByText("Finish Homework");
  const newNoteContent = screen.getByText("Complete all the tasks");

  expect(newNoteTitle).toBeInTheDocument();
  expect(newNoteContent).toBeInTheDocument();

  const titleToEdit = screen.getByText("Finish Homework");
  const contentToEdit = screen.getByText("Complete all the tasks");

  fireEvent.input(titleToEdit, { target: { innerHTML: "Wash car" } });
  fireEvent.input(contentToEdit, {
    target: { innerHTML: "Use wax to polish" },
  });

  const updatedTitle = screen.getByText("Wash car");
  const updatedContent = screen.getByText("Use wax to polish");

  expect(updatedTitle).toBeInTheDocument();
  expect(updatedContent).toBeInTheDocument();
});
test("Delete: Can you delete a note?", () => {
  render(<StickyNotes />);

  let deleteButtons = screen.queryAllByText("X-del");
  deleteButtons.forEach((button) => fireEvent.click(button));

  const title = screen.getByPlaceholderText("Note Title");
  const content = screen.getByPlaceholderText("Note Content");
  const createNoteButton = screen.getByText("Create Note");

  fireEvent.change(title, { target: { value: "Wash Car" } });
  fireEvent.change(content, { target: { value: "Clean interior" } });
  fireEvent.click(createNoteButton);

  const newNoteTitle = screen.getByText("Wash Car");
  const newNoteContent = screen.getByText("Clean interior");

  expect(newNoteTitle).toBeInTheDocument();
  expect(newNoteContent).toBeInTheDocument();
  const deleteNewNoteButton = screen.getByText("X-del");
  fireEvent.click(deleteNewNoteButton);

  expect(screen.queryByText("Wash Car")).not.toBeInTheDocument();
  expect(screen.queryByText("Clean interior")).not.toBeInTheDocument();
});

test("Can you delete all notes?", () => {
  render(<StickyNotes />);
  const title = screen.getByPlaceholderText("Note Title");
  const content = screen.getByPlaceholderText("Note Content");
  const createNoteButton = screen.getByText("Create Note");

  fireEvent.change(title, { target: { value: "Finish Homework" } });
  fireEvent.change(content, { target: { value: "Complete all the tasks" } });
  fireEvent.click(createNoteButton);

  const newNoteTitle = screen.getByText("Finish Homework");
  const newNoteContent = screen.getByText("Complete all the tasks");

  expect(newNoteTitle).toBeInTheDocument();
  expect(newNoteContent).toBeInTheDocument();

  const deleteButton = screen.getAllByText("X-del");
  for (let i = 0; i < deleteButton.length; i++) {
    fireEvent.click(deleteButton[i]);
  }

  expect(newNoteTitle).not.toBeInTheDocument();
  expect(newNoteContent).not.toBeInTheDocument();
});

test("Favorite notes displays none when no notes are favorited", () => {
  render(<StickyNotes />);
  const favoriteNotes = screen.getByText("Favorite Notes:");
  expect(favoriteNotes).toBeInTheDocument();
  const none = screen.getByText("None");
  expect(none).toBeInTheDocument();
});
