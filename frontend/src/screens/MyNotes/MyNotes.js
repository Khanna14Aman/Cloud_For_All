import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import ErrorMessage from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";

function MyNotes({ search }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;
  // console.log(typeof notes);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.updateNote);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  return (
    <>
      <MainScreen title={userInfo.name}>
        <LinkContainer to="createnote">
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Create New Note
          </Button>
        </LinkContainer>
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {/* {loadingDelete && <Loading />} */}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && (
          <div style={{ height: "5vh" }}>
            <Loading />
          </div>
        )}
        {notes
          ?.reverse()
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            <Accordion key={note._id} value={note}>
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    {/* <contextAwareToogle as={Card.Text} variant="link" eventKey="0"> */}
                    <Accordion.Header>{note.title}</Accordion.Header>
                    {/* </contextAwareToogle> */}
                  </span>
                  <div>
                    <Button>
                      {" "}
                      <Link
                        to={`/note/${note._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                {/* <AccordionCollapse eventKey="0"> */}
                <Accordion.Body>
                  <Card.Body>
                    <h5>
                      <Badge variant="success">{note.category}</Badge>
                    </h5>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created On{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Body>
                {/* </AccordionCollapse> */}
              </Card>
            </Accordion>
          ))}
      </MainScreen>
    </>
  );
}

export default MyNotes;

//  <Card style={{ margin: 10 }}>
//    <Card.Header style={{ display: "flex" }}>
//      <span
//        style={{
//          color: "black",
//          textDecoration: "none",
//          flex: 1,
//          cursor: "pointer",
//          alignSelf: "center",
//          fontSize: 18,
//        }}
//      >
//        {/* title */}
//      </span>
//      <div>
//        <Button>Edit</Button>
//        <Button variant="danger" className="mx-2">
//          Delete
//        </Button>
//      </div>
//    </Card.Header>
//  </Card>;
