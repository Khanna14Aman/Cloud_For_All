import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen/MainScreen";
import "../../cssfile/Home.css";

const HomePage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  return (
    <div>
      <MainScreen title="">
        <div className="home-first">
          <b>
            Hi<span style={{ color: "black" }}>!</span> Welcome to CLOUD_FOR_ALL
          </b>
        </div>
        <div className="home-second">
          <b>What you get here?</b>
        </div>
        <div className="home-third">
          <h3>
            Here you can save all your important <strong>Lecture Notes</strong>{" "}
            and <strong>Contacts</strong> in Cloud safely and access them from
            anywhere anytime you need them.
          </h3>
        </div>
        <div className="home-fourth">
          <b>Features we provide in saving Contacts:</b>
        </div>
        <div className="home-fifth">
          <ul>
            <h3>
              <li>
                <strong>CREATE CONTACT</strong> with there information like:
                Country, City, Designation, etc.
              </li>
            </h3>
            <h3>
              <li>
                <strong>EDIT</strong> contact information like: Country, City,
                Designation, etc.
              </li>
            </h3>
            <h3>
              <li>
                <strong>VIEW</strong> all the mobile numbers of particular
                person in a very well defined structure.
              </li>
            </h3>
            <h3>
              <li>
                <strong>UNIQUE</strong> name for every contact. You will not get
                confuse between similar names.
              </li>
            </h3>
            <h3>
              <li>
                <strong>ADD</strong> and <strong>Delete</strong> each contact
                according to your need.
              </li>
            </h3>
          </ul>
        </div>
        <div className="home-sixth">
          <b>Features we provide in saving Notes:</b>
        </div>
        <div>
          <ul>
            <h3>
              <li>
                <strong>CREATE</strong> notes with adding Title, Content, and
                Type of note.
              </li>
            </h3>
            <h3>
              <li>
                <strong>UPDATE</strong> and <strong>DELETE</strong> notes.
              </li>
            </h3>
            <h3>
              <li>
                <strong>STRUCTURED</strong> view of each and every notes.
              </li>
            </h3>
            <h3>
              <li>
                <strong>'# '</strong> used for making headings in notes content.
              </li>
            </h3>
            <h3>
              <li>
                <strong>'* '</strong> used for making{" "}
                <strong>"unordered list"</strong> in notes content.
              </li>
            </h3>
            <h3>
              <li>
                For more details on styling of note content{" "}
                <a
                  href="https://blog.logrocket.com/how-to-safely-render-markdown-using-react-markdown/"
                  target="blank"
                >
                  <button>click here</button>
                </a>
              </li>
            </h3>
          </ul>
        </div>
      </MainScreen>
    </div>
  );
};

export default HomePage;
