import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fireDb } from "../../firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FcLike, FcComments, FcShare } from "react-icons/fc";
import { FaRegWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";

function PostDesc() {
  const currentUser = JSON.parse(
    localStorage.getItem("reactgram-offical-user")
  );
  const [showLikes, setShowLikes] = useState(false);
  const [post, setPost] = useState(null);
  const [likedPost, setLikedPost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getData = () => {
    dispatch({ type: "showLoading" });
    getDoc(doc(fireDb, "posts", params.id))
      .then((response) => {
        setPost({ ...response.data(), id: response.id });
        if (response.data().likes.find((user) => user.id === currentUser.id)) {
          setLikedPost(true);
        } else {
          setLikedPost(false);
        }
        dispatch({ type: "hideLoading" });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "hideLoading" });
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const likeUnlikeHandler = () => {
    let updatedLikes = post.likes;
    if (likedPost) {
      updatedLikes = post.likes.filter((user) => user.id !== currentUser.id);
    } else {
      updatedLikes.push({
        id: currentUser.id,
        email: currentUser.email,
      });
    }

    setDoc(doc(fireDb, "posts", post.id), {
      ...post,
      likes: updatedLikes,
    })
      .then(() => {
        getData();
        toast.success("Post Liked Success");
      })
      .catch(() => {
        toast.error("Something Went Wrong");
      });
  };
  const addComments = () => {
    let updatedComments = post.comments;

    updatedComments.push({
      id: currentUser.id,
      email: currentUser.email,
      commentText,
    });

    setDoc(doc(fireDb, "posts", post.id), {
      ...post,
      comments: updatedComments,
    })
      .then(() => {
        getData();

        setCommentText("");
      })
      .catch(() => {
        toast.error("Something Went Wrong");
      });
  };
  return (
    <>
      <Container>
        {post && (
          <Card
            className="mx-auto my-3 cursor-pointer"
            style={{ width: "300px" }}
          >
            <Card.Body>
              <Card.Text className="text-uppercase d-flex gap-2">
                <p className="rounded-circle p-3 px-4 my-auto text-bold text-white bg-dark ">
                  {post.user.email.slice(0, 1)}
                </p>{" "}
                <p className="my-auto">{post.user.email.slice(0, -10)}</p>
              </Card.Text>
            </Card.Body>
            <div className="mx-auto overflow-hidden" style={{}}>
              <Card.Img
                variant="bottom"
                className="img-fluid rounded"
                style={{
                  overflow: "hidden",
                }}
                src={post.imageUrl}
              />
            </div>

            <Card.Body>
              <Card.Text>{post.description}</Card.Text>
              <div className="d-flex gap-3">
                <FcLike className="h4" onClick={likeUnlikeHandler} />
                <p className="underline">{post.likes.length}</p>
                <div>
                  <Link
                    className="nav-link"
                    onClick={() => {
                      setShowLikes(true);
                      toast.success("Liked List Opened");
                    }}
                  >
                    Show Likes
                  </Link>
                </div>
                <FcComments className="h4" />
                <p
                  onClick={() => {
                    setShowComments(true);
                    toast.success("Comment Section Opened");
                  }}
                >
                  {post.comments.length}
                </p>
                <FcShare
                  className="h4 cursor-pointer"
                  onClick={() => navigate(`/sharepost/${post.id}`)}
                />
              </div>
            </Card.Body>
          </Card>
        )}
        {showComments && (
          <>
            <FaRegWindowClose
              className="h2 mx-auto cursor-pointer"
              onClick={() => {
                setShowComments(false);
                toast.success("Comment Section Closed");
              }}
            />
            <h1>Comments</h1>
            {post.comments.map((item) => {
              return (
                <div className="border rounded border-dark text-center">
                  <h3>{item.commentText}</h3>
                  <p className="">By {item.email.slice(0, -10)}</p>
                </div>
              );
            })}
            <div className="border">
              <h1 className="mt-10">Add Comment</h1>
              <textarea
                name=""
                value={commentText}
                className=""
                typeof="text"
                class="border d-flex w-100 border-dark rounded p-2"
                onChange={(e) => {
                  setCommentText(e.target.value);
                }}
                id=""
                cols="20"
                rows="6"
              ></textarea>
            </div>
            <button className="btn btn-primary m-auto" onClick={addComments}>
              {" "}
              Add Comment
            </button>
          </>
        )}
        {showLikes && (
          <div>
            <FaRegWindowClose
              className="h2 mx-auto cursor-pointer"
              onClick={() => {
                setShowLikes(false);
                toast.success("Liked List Closed");
              }}
            />
            {post.likes.map((like) => {
              return (
                <div className="">
                  <div className="text-center border bg-danger text-white w-50 mx-auto rounded">
                    <p className="m-auto py-4 text-uppercase">
                      <span className="rounded-circle p-3 px-4 my-auto text-bold text-white bg-dark ">
                        {like.email.slice(0, 1)}
                      </span>{" "}
                      <span>{like.email.slice(0, -10)}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
}

export default PostDesc;
