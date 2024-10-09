import React, { useContext, useState } from "react";
import { ThemeContext, themes } from "./ThemeContext";

function ClickCounter() {
  const [count, setCount] = useState(0);

  // const handleClick = () => {
  //   setCount(count + 1);
  //   console.log("Count:", count);
  // };

  const theme = useContext(ThemeContext);

  return (
    <div
      style={{
        background: theme.background,
        color: theme.foreground,
        padding: "20px",
      }}
    >
      <p>You clicked {count} times </p>
      <button
        onClick={() => setCount(count + 1)}
        style={{ background: theme.foreground, color: theme.background }}
      >
        Click me
      </button>
    </div>
  );
}

function ToggleTheme() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <button onClick={toggleTheme}> Toggle Theme</button>
      <ClickCounter />
    </ThemeContext.Provider>
  );
}
export default ToggleTheme;
