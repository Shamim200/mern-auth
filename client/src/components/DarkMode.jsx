import { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
const DarkMode = () => {
  const [toggle, setToggle] = useState(true);
  const [theme, setTheme] = useState("light-theme");

  const handleToggle = () => {
    theme === "light-theme"
      ? setTheme("dark-theme") || localStorage.setItem("theme", "dark-theme")
      : setTheme("light-theme") || localStorage.setItem("theme", "light-theme");
    setToggle(!toggle);
  };

  useEffect(() => {
    document.body.className = theme;
    const useLocalStoreage = localStorage.getItem("theme");
    if (useLocalStoreage) {
      setTheme(useLocalStoreage);
    }
  }, [theme]);
  return (
    <div onClick={handleToggle} className="dark-icon">
      {toggle ? <FaSun /> : <FaMoon />}
    </div>
  );
};
export default DarkMode;
