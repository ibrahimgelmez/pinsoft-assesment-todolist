import { useState } from "react";
//Components
import Todo from "./components/Todo";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "App":"App-light"}>
      <div>
        <Todo darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
}

export default App;
