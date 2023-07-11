import { useState, useEffect } from "react";
//Components
import Todo from "./components/Todo";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const dark = JSON.parse(localStorage.getItem("darkMode"));
    if (dark) {
      setDarkMode(dark);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={darkMode ? "App" : "App-light"}>
      <div>
        <Todo darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
}

export default App;
