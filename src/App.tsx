import "./App.css";
import Header from "./components/Header/Header";
import Services from "./components/Services/Services";
import About from "./components/About/About";
import ServiceArea from "./components/ServiceArea/ServiceArea";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import AvailabilityCalendar from "./components/Calendar/AvailabilityCalendar";
import DogCursor from "./components/DogCursor/DogCursor";

function App() {
  return (
    <>
<DogCursor/>
      <Header />

      <main>
        <Home />
        <About />
        <Services />
        <ServiceArea />
        <AvailabilityCalendar />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;