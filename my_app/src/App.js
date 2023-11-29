import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage/Home.js";
import List from "./pages/list/list.js";
import Mon from "./pages/monument/mon_page.js";
import Login from "./pages/login/login.js";
import Register from "./pages/Register/register.js";
import Book from "./pages/book_cart/book_cart.js";
import Qrcode from "./pages/qrcode_page/qrcode.js";
import Add_mon from "./pages/create_mon/add_mon.js";
import A_qr_Home from "./pages/all_qrcodepage/all_qrcode_page.js";
import A_Home from "./pages/admin_home/ah.js";

function App() {
  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/slvarun.io/Entry-Way/" element={<Home />} /> */}
          <Route path="/monuments" element={<List />} />
          <Route path="/monuments/:id" element={<Mon />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/monuments/book/:id" element={<Book />} />
          <Route path="/monuments/book/:id/qr" element={<Qrcode />} />
          <Route path="/create_mon" element={<Add_mon />} />
          <Route path="/Admin/mon" element={<A_Home />} />
          <Route path="/Admin/:id" element={<A_qr_Home />} />

        </Routes>
      </BrowserRouter>
    </>
  );

}

export default App;
