import React, { useContext } from "react";
import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Label, Note } from "./types";
import { dummyNotesList } from "./constant";
import { ThemeContext, themes } from "./hooks/ThemeContext";

function App() {
  const [notes, setNotes] = useState(dummyNotesList);
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
        <form className="noteForm">
          <div>
            <input placeholder="Note Title"></input>
          </div>
          <div>
            <textarea></textarea>
          </div>
          <select>
            <option>personal</option>
            <option>work</option>
            <option>study</option>
            <option>other</option>
          </select>
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
                <button>x</button>
              </div>
              <h2> {note.title} </h2>
              <p> {note.content} </p>
              <p> {note.label} </p>
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
