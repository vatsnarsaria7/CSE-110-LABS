import React, { useContext } from "react";
import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Label, Note } from "./types";
import { dummyNotesList } from "./constant";
import { ThemeContext, themes } from "./hooks/ThemeContext";

function App() {
  const [notes, setNotes] = useState(dummyNotesList);

  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    isFavorite: false,
  };

  const [createNote, setCreateNote] = useState(initialNote);

  const createNotHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  const deleteHandles = (id: number) => {
    const remainingNotes = notes.filter((note) => note.id != id);
    setNotes(remainingNotes);
  };

  const theme = useContext(ThemeContext);
  const [favoriteNotes, setFavoriteNotes] = useState<Note[]>([]);
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  const manageFav = (id: number) => {
    const updatedNotes = notes.map(
      (note) =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note //If id matched, create a copy of note and change isFavorite property
    );
    setNotes(updatedNotes);
  };

  useEffect(() => {
    const favoriteNotes = notes.filter((note) => note.isFavorite);
    setFavoriteNotes(favoriteNotes);

    console.log("Updated favorite notes:", favoriteNotes);
  }, [notes]);
  return (
    <ThemeContext.Provider value={currentTheme}>
      <div
        className="app-container"
        style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
        }}
      >
        <form className="noteForm" onSubmit={createNotHandler}>
          <div>
            <input
              placeholder="Note Title"
              value={createNote.title}
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })
              }
              required
            ></input>
          </div>
          <div>
            <textarea
              value={createNote.content}
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })
              }
              required
            ></textarea>
          </div>
          <div>
            <select
              value={createNote.label}
              onChange={(event) =>
                setCreateNote({
                  ...createNote,
                  label: event.target.value as Label,
                })
              }
              required
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>
          <div>
            <button type="submit">Create Note</button>
          </div>
        </form>

        <div
          className="notes-grid"
          style={{ background: currentTheme.background }}
        >
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-item"
              style={{
                background: currentTheme.background,
                color: currentTheme.foreground,
              }}
            >
              <div
                className="notes-header"
                style={{
                  background: currentTheme.background,
                  color: currentTheme.foreground,
                }}
              >
                <button onClick={() => manageFav(note.id)}>
                  {note.isFavorite ? "❤️" : "♡"}
                </button>
                <button onClick={() => deleteHandles(note.id)}>X</button>
              </div>
              <div>
                <h2 contentEditable={true}> {note.title} </h2>
                <p contentEditable={true}> {note.content} </p>
                <p contentEditable={true}> {note.label} </p>
              </div>
            </div>
          ))}
        </div>

        <div className="favorites-list">
          <h2>Favorite Notes:</h2>
          {favoriteNotes.length > 0 ? (
            favoriteNotes.map((note) => (
              <div key="note.id">
                <h3>{note.title}</h3>
              </div>
            ))
          ) : (
            <p>None</p>
          )}
        </div>
        <button
          onClick={toggleTheme}
          style={{
            background: currentTheme.background,
            color: currentTheme.foreground,
          }}
        >
          Change Theme
        </button>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
