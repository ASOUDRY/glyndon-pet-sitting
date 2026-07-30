import "./App.css";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import About from "./components/About/About";
import ServiceArea from "./components/ServiceArea/ServiceArea";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Carousel from "./components/Carousel/Carousel";

function App() {
  return (
    <>
      <Header />

      <main>
        <Carousel />
        <Hero />
        <Services />
        <About />
        <ServiceArea />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;