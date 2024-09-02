import React from "react";
import Card from "react-bootstrap/Card";
import "../components/Component.css";
import { FcLike, FcComments } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
function 
Post({ post }) {
  const navigate = useNavigate();
  return (
    <div>
      <Card
        onClick={() => {
          navigate(`/post/${post.id}`);
        }}
        className="mx-auto my-3 cursor-pointer"
        style={{ width: "350px" }}
      >
        <Card.Body>
          <Card.Text className="text-uppercase d-flex gap-2">
            <p className="rounded-circle p-3 px-4 my-auto text-bold text-white bg-dark ">
              {post.user.email.slice(0, 1)}
            </p>{" "}
            <p className="my-auto">{post.user.email.slice(0, -10)}</p>
          </Card.Text>
        </Card.Body>
        <div
          className="mx-auto overflow-hidden"
          style={{ width: "50%", height: "30vh" }}
        >
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
            <FcLike className="h4" />
            <p>{post.likes.length}</p>
            <FcComments className="h4" />
            <p>{post.comments.length}</p>
          </div>
        </Card.Body>
      </Card>

      {/* <img
        src=
        alt=""
        className="h-60 rounded d-flex mx-auto w-60"
      /> */}
    </div>
  );
}

export default Post;
