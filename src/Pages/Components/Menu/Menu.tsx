import { PiSunBold } from "react-icons/pi";
import { useDarkmodecontext } from "../Context/Darkmode";
import { FaRegMoon } from "react-icons/fa";
import { useLancontext } from "../Context/Language";

function Menu() {
  const { darkMode, setDarkMode } = useDarkmodecontext();
  const { changeLanguage, currentLanguage } = useLancontext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(e.target.value as "fa" | "En" | "fr" | "de");
  };
  return (
    <>
      <div className="flex flex-wrap bg-fuchsia-600 btn-delay justify-center sm:justify-between bg-go py-4 gap-x-[300px] gap-y-6 dark:bg-slate-800 dark:text-white px-1 pt-3">
        <h1 className="font-bold text-rose-300 dark:text-white">
          Translation Management
        </h1>
        <div className="flex gap-x-3 flex-row-reverse pr-1">
          <button
            className="text-[25px] outline-none"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? <PiSunBold className="dark:text-yellow-400" /> : <FaRegMoon className="text-white" />}
          </button>
          <select
            onChange={handleChange}
            value={currentLanguage}
            className="text-rose-600 bg-pink-100 dark:bg-slate-500 dark:text-stone-100 text-center font-bold outline-none rounded-lg w-[80px] px-3"
          >
            <option className="text-rose-600 dark:text-stone-100 " value="En">En</option>
            <option className="text-rose-600 dark:text-stone-100 " value="fr">fr</option>
            <option className="text-rose-600 dark:text-stone-100 " value="de">de</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Menu;
