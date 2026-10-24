import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyChooseUs from "./components/WhyChooseUs";
import FeaturedEvents from "./components/FeaturedEvents";
import Footer from "./components/Footer";
import Events from "./components/Events";
import About from "./components/About";
import EventRegistration from "./components/EventRegistration";
import Admin from "./Admin";

function App() {
  return (
    <div className="min-h-screen bg-[#fff8f0] pt-20">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <WhyChooseUs />
              <FeaturedEvents />
            </>
          }
        />

        <Route path="/events" element={<Events />} />
        <Route path="/register" element={<EventRegistration />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
