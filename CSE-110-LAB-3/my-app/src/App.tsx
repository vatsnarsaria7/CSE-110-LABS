import React, { useContext } from "react";
import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Label, Note } from "./types";
import { dummyNotesList } from "./constant";
import { ThemeContext, themes } from "./hooks/ThemeContext";
import { StickyNotes } from "./stickyNotes";

import "./App.css";
import { ToDoList } from "./toDoList";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./navBar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<StickyNotes />} />
        <Route path="/todolist/:name" element={<ToDoList />} />
      </Routes>
    </div>
  );
};

export default App;
