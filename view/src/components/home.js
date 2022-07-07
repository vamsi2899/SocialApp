import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FollowModal from "../layout/follow_modal";
import LoadingWidget from "../layout/loading_widget";
import { fetchData, postData } from "../main";

export default function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [postUser, setPostUser] = useState({});

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const userObject = localStorage.getItem("user");
    if (!userObject) navigate("/login");
    else setUser(JSON.parse(userObject));

    fetchPosts();
  }, [navigate]);

  const fetchPosts = () => {
    setLoading(true);
    fetchData("/post/", "GET")
      .then((res) => {
        setPosts(res.post);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        console.log(`Error! ${error.message}`);
      });
  };

  const createFollow = (followUser) => {
    setLoading(true);
    postData("/follow/", "POST", {
      user_follow: followUser._id,
      user_follower: user._id,
    })
      .then((res) => {
        setLoading(false);
        if (res.success) fetchPosts();
      })
      .catch((error) => {
        setLoading(false);

        console.log(`Error! ${error}`);
      });
  };

  return (
    <div>
      <LoadingWidget loading={loading} />
      {posts.map((item, index) => {
        let postUser = {};
        if (item.user.length > 0) postUser = item.user[0];
        return (
          <div key={index} className="blog-container">
            <div className="blog-header">
              <div className="blog-author d-flex align-items-center">
                <img src="/logo512.png" alt="Avatar" className="avatar" />
                <div>
                  <h5>{postUser.username}</h5>
                  <h6>{postUser.email}</h6>
                </div>
              </div>
            </div>

            <div className="blog-body">
              {/* <div className="blog-title">
                <h1>
                  <a href="/">This Post Has No Cover Image</a>
                </h1>
              </div> */}
              <div className="blog-summary">
                <p>{item.title}</p>
              </div>
            </div>

            {postUser._id ? (
              <div className="blog-footer">
                <button
                  onClick={() => {
                    setPostUser(postUser);
                    setOpenModal(true);
                  }}
                  className="btn btn-outline-primary mt-2 mb-2"
                >
                  {" "}
                  View{" "}
                </button>
              </div>
            ) : (
              <div />
            )}
          </div>
        );
      })}
      <FollowModal
        show={openModal}
        onHide={() => setOpenModal(false)}
        onSubmit={createFollow}
        user={postUser}
      />
    </div>
  );
}
