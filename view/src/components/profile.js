import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingWidget from "../layout/loading_widget";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userObject = localStorage.getItem("user");
    if (!userObject) navigate("/login");
    else {
      const user = JSON.parse(userObject);
      setUser(user);
      fetchPosts(user);
    }
  }, [navigate]);

  const fetchPosts = (user) => {
    setLoading(true);

    fetchData(`/post/profile/${user._id}/`, "GET")
      .then((res) => {
        setLoading(false);

        setPosts(res.post);
      })
      .catch((error) => {
        setLoading(false);

        console.log(`Error! ${error.message}`);
      });
  };

  const createPost = (title) => {
    setLoading(true);

    postData("/post/", "POST", { user_id: user._id, title })
      .then((res) => {
        setLoading(false);

        setPosts([res.post, ...posts]);
      })
      .catch((error) => {
        setLoading(false);

        console.log(`Error! ${error.message}`);
      });
  };

  const updatePost = (title, id) => {
    setLoading(true);

    postData("/post/", "PUT", { user_id: user.id, title, id })
      .then((res) => {
        setLoading(false);

        setPosts(
          posts.map((item) => {
            if (item._id === id) item = res.post;
            return item;
          })
        );
      })
      .catch((error) => {
        setLoading(false);

        console.log(`Error! ${error.message}`);
      });
  };

  const deletePost = (id) => {
    setLoading(true);

    fetchData("/post/" + id, "DELETE")
      .then((res) => {
        setLoading(false);

        if (res.success) setPosts(posts.filter((item) => item._id !== id));
      })
      .catch((error) => {
        setLoading(false);

        console.log(`Error! ${error.message}`);
      });
  };

  return (
    <>
      <LoadingWidget loading={loading} />
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

                      <button className="btn btn-primary">Following</button>
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
    </>
  );
}
