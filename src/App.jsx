import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { Header, Footer } from './components/'; 
import "./App.scss";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer /> 
      </BrowserRouter>
    </>
  );
}

export default App;