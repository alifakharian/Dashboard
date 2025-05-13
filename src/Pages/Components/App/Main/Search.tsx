import { useWordcontext } from "../../Context/words";

function Search() {
  const { input, inputhandler, handleAddWord } = useWordcontext();

  return (
    <div className="flex justify-center py-5 gap-3 flex-wrap mx-5">
      <div className="w-full max-w-md  md:w-[800px]">
        <input
          value={input}
          onChange={inputhandler}
          className="w-full text-gray-700 dark:text-white text-center  bg-slate-200 dark:bg-slate-400 placeholder-rose-300 dark:placeholder-white font-semibold text-sm border-2 border-rose-200 dark:border-slate-500 rounded-lg px-4 py-2 focus:outline-none"
          placeholder="اضافه کردن کلمه"
        />
      </div>
      <button className="btn-button w-[120px]" onClick={handleAddWord}>
        Add new word
      </button>
    </div>
  );
}

export default Search;
