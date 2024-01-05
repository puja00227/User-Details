import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Create from './pages/Create';
import View from './pages/View';
import Update from './pages/Update';
import Delete from './pages/Delete';


function App() {
  return (
    <Router>
      <SnackbarProvider>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/users/create" element={<Create />} />
            <Route exact path="/users/view/:id" element={<View />} />
            <Route exact path="/users/update/:id" element={<Update />} />
            <Route exact path="/users/delete/:id" element={<Delete />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </SnackbarProvider>
    </Router>
  );
}

export default App;
