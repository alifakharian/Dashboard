import Search from "./Search";
import Words from "./Words";

function MainBody() {
  return (
    <div className="dark:bg-slate-600 bg-pink-300 btn-delay dark:text-white .btn-delay min-h-screen dark:min-h-screen">
      <Search />
      <Words />
    </div>
  );
}

export default MainBody;
