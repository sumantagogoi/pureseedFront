import { Container } from "@mui/material";
import Category from "./components/Category";
import Header from "./components/Header";
import Menu from "./components/Menu";


function App() {
  return (
    <>
     <Header/>
     <Container>
     <Category/>
     <Menu/>
     </Container>
   
    </>
   
  );
}

export default App;
