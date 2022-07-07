import React from "react";
import Modal from "react-bootstrap/Modal";

export default function FollowModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Follow</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <center>
          <div className="blog-author align-items-center">
            <img src="/logo512.png" alt="Avatar" className="avatar" />
            <div>
              <h5>{props.user.username}</h5>
              <h6>{props.user.email}</h6>
            </div>
          </div>
        </center>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-danger" onClick={props.onHide}>
          Close
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            props.onHide();
            props.onSubmit(props.user._id);
          }}
        >
          Follow
        </button>
      </Modal.Footer>
    </Modal>
  );
}
