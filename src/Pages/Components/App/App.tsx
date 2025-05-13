import AppProviders from "../Context/AppProvider";
import Wapper from "../Wapper/Wapper";

export default function App() {
  return (
    <>
      <AppProviders>
        <Wapper />
      </AppProviders>
    </>
  );
}
