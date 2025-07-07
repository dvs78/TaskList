import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Toast from "./Components/Toast";

function App({ setUserLogged }) {
  return (
    <div className="app_components">
      <Login setUserLogged={setUserLogged} />
      <Toast />
    </div>
  );
}

export default App;
