import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import GigList from "./pages/GigList";
import GigDetails from "./pages/GigDetail";
import CreateGig from "./pages/CreateGig";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MyGigs from "./pages/MyGigs";
import ViewBids from "./pages/ViewBids";





function App() {


  



  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        {/* <Route path="/" element={<GigList />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      
        <Route path="/create-gig" element={<CreateGig />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route element={<ProtectedRoute />}></Route>
         <Route
  path="/my-gigs"
  element={
    
      <MyGigs />

  }
/>

  
         <Route path="/gigs/:gigId" element={<GigDetails />} />
<Route path="/gigs/:gigId/bids" element={<ViewBids />} />

         <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
