import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Container} from '@mui/material';
import RecipeFinder from "./pages/RecipeFinder";
import {NoContent} from "./pages/NoContent";
import {Update} from "./pages/Update";
import {Add} from "./pages/Add";
import './App.css'

function App() {
  return (
    <>
    <Container maxWidth="md">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RecipeFinder />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/add" element={<Add />} />
          <Route path="*" element={<NoContent />} />
        </Routes>
      </BrowserRouter>
     
    </Container>
    </>
  );
}

export default App;
