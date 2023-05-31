
import Header from "./components/header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
      <div className="bg-backgroundCl">
        <ToastContainer />
        <Header />
        <br />
        <Outlet />
      </div>
    </>
  )
}

export default App
