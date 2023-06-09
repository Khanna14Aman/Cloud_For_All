import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";
import ErrorMessage from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import ReactMarkdown from "react-markdown";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useParams } from "react-router-dom";

function SingleNote() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.updateNote);
  const { loading, error } = noteUpdate;
  const ID = useParams();
  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  // const deleteHandler = (id) => {
  //   if (window.confirm("Are you sure?")) {
  //     dispatch(deleteNoteAction(id));
  //   }
  //   navigate("/mynotes");
  // };

  const [deleteid, setdeleteid] = useState("");
  const [showDelete, setDelete] = useState(false);
  const DeleteModal = () => {
    const widthMatch = useMediaQuery("(min-width:500px)");

    useEffect(() => {
      document.body.style.overflowY = "hidden";
      return () => (document.body.style.overflowY = "scroll");
    }, []);
    return (
      <>
        <div className="blur-background"></div>
        <div
          style={{
            zIndex: "3",
            borderRadius: "20px",
            height: "30%",
            width: widthMatch ? "40%" : "100%",
            backgroundColor: "red",
            position: "fixed",
            left: widthMatch ? "30%" : "0%",
            top: "35%",
            padding: "2vh",
            textAlign: "center",
            position: "fixed",
          }}
        >
          <div>
            <h2>
              <b>Are You Sure?</b>
            </h2>
          </div>
          <div
            style={{
              marginTop: "12vh",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              onClick={() => {
                dispatch(deleteNoteAction(deleteid));
                setDelete(false);
                navigate("/mynotes");
              }}
            >
              Delete
            </Button>
            <Button onClick={() => setDelete(false)}>Close</Button>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${ID.id}`);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [ID.id, date]);
  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(ID.id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/mynotes");
  };

  return (
    <>
      <MainScreen title="Edit Note">
        {showDelete && <DeleteModal />}
        <Card>
          <Card.Header>Edit your Note</Card.Header>
          <Card.Body>
            <Form onSubmit={updateHandler}>
              {loadingDelete && <Loading />}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {errorDelete && (
                <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
              )}
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Enter the title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter the content"
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              {content && (
                <Card>
                  <Card.Header>Note Preview</Card.Header>
                  <Card.Body>
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </Card.Body>
                </Card>
              )}

              <Form.Group controlId="content">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="content"
                  placeholder="Enter the Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              {loading && <Loading size={50} />}
              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: "1vh" }}
              >
                Update Note
              </Button>
              <Button
                className="mx-2"
                variant="danger"
                onClick={() => {
                  // deleteHandler(ID.id)
                  setdeleteid(ID.id);
                  setDelete(true);
                }}
                style={{ marginTop: "1vh" }}
              >
                Delete Note
              </Button>
            </Form>
          </Card.Body>

          <Card.Footer className="text-muted">
            Updated on - {date.substring(0, 10)}
          </Card.Footer>
        </Card>
      </MainScreen>
    </>
  );
}

export default SingleNote;
