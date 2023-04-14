import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import Login from "./screens/login/login";
import Register from "./screens/register/register";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import About from "./screens/About/About";
import Contact from "./screens/Contact_Owner/Contact";
import HomePage from "./screens/HomePage/HomePage";
import MyContacts from "./screens/MyContacts/MyContacts";
import Forgot from "./screens/Forgot/Forgot";
import NotFound from "./screens/NOT_FOUND/NotFound";
import SingleContact from "./screens/SingleContact/SingleContact";

function App() {
  const [search, setSearch] = useState("");
  console.log(search);

  return (
    <>
      <BrowserRouter>
        <Header setSearch={setSearch} />
        <main>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<ProfileScreen />} />
            <Route exact path="/mynotes/createnote" element={<CreateNote />} />
            <Route exact path="/note/:id" element={<SingleNote />} />
            <Route
              path="/mynotes"
              element={<MyNotes search={search} />}
            ></Route>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contactowner" element={<Contact />} />
            <Route
              exact
              path="/mycontact"
              element={<MyContacts search={search} />}
            />
            <Route exact path="/forgot" element={<Forgot />} />
            <Route exact path="/mycontact/:id" element={<SingleContact />} />
            <Route exact path="/*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
