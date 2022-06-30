import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostModal from "../layout/post_modal";
import UpdatePostModal from "../layout/update_modal";
import { fetchData, postData } from "../main";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setUpdateShowModal] = useState(false);

  useEffect(() => {
    const userObject = localStorage.getItem("user");
    if (!userObject) navigate("/login");
    else {
      setUser(JSON.parse(userObject));
      fetchPosts();
    }
  }, [navigate]);

  const fetchPosts = () => {
    fetchData("/post/", "GET")
      .then((res) => {
        setPosts(res.post);
      })
      .catch((error) => {
        console.log(`Error! ${error.message}`);
      });
  };

  const createPost = (title) => {
    postData("/post/", "POST", { user_id: user.id, title })
      .then((res) => {
        setPosts([res.post, ...posts]);
      })
      .catch((error) => {
        console.log(`Error! ${error.message}`);
      });
  };

  const updatePost = (title, id) => {
    postData("/post/", "PUT", { user_id: user.id, title, id })
      .then((res) => {
        setPosts(
          posts.map((item) => {
            if (item._id === id) item = res.post;
            return item;
          })
        );
      })
      .catch((error) => {
        console.log(`Error! ${error.message}`);
      });
  };

  const deletePost = (id) => {
    fetchData("/post/" + id, "DELETE")
      .then((res) => {
        if (res.success) setPosts(posts.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.log(`Error! ${error.message}`);
      });
  };

  return (
    <div className="container mt-5">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="favicon.ico"
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    <h4>{user.username}</h4>
                    <p className="text-secondary mb-1">{user.email}</p>

                    <button className="btn btn-primary">Follow</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="d-flex justify-content-end mb-3">
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary align-self-end"
              >
                Create
              </button>
            </div>
            <ul className="list-group">
              {posts.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between p-4"
                  >
                    {item.title}
                    <div>
                      <i
                        onClick={() => {
                          setCurrentPost(item);
                          setUpdateShowModal(true);
                        }}
                        class="bi bi-pencil text-primary"
                      ></i>
                      <i
                        onClick={() => deletePost(item._id)}
                        class="bi bi-trash text-danger ml-2"
                      ></i>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <PostModal
        show={showModal}
        onHide={() => setShowModal(false)}
        createPost={createPost}
      />

      <UpdatePostModal
        show={showUpdateModal}
        onHide={() => setUpdateShowModal(false)}
        createPost={updatePost}
        post={currentPost}
      />
    </div>
  );
}
