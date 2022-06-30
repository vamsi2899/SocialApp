import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

export default function UpdatePostModal(props) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (props.post) setTitle(props.post.title);
  }, [props]);

  const onSubmit = () => {
    props.createPost(title, props.post._id);
    props.onHide();
    setTitle("");
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Update Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group mb-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-describedby="emailHelp"
            required
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-danger" onClick={props.onHide}>
          Close
        </button>
        <button className="btn btn-primary" onClick={onSubmit}>
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  );
}
