import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { fireDb } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import Post from "../components/Post";
import { Col, Row } from "react-bootstrap";

const Shares = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("reactgram-offical-user")
  );
  const dispatch = useDispatch("");
  const [data, setData] = useState([]);

  const getData = async () => {
    dispatch({ type: "showLoading" });
    const q = await getDoc(doc(fireDb, "users", currentUser.id));

    setData(q.data().shares);

    dispatch({ type: "hideLoading" });
  };

  const deleteShare = async (postId) => {
    try {
      await updateDoc(doc(fireDb, "users", currentUser.id), {
        shares: data.filter((post) => post.id !== postId),
      });
      getData(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting share:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <DefaultLayout>
        <h2 className="my-4">
          <span className="rounded-circle p-3 px-4 my-auto text-bold text-white bg-dark text-uppercase">
            {currentUser.email.slice(0, 1)}
          </span>
          <span className="text-uppercase">
            {currentUser.email.slice(0, -10)}
          </span>{" "}
        </h2>
        {data && (
          <Row className="mx-auto ">
            {data.map((post) => {
              return (
                <Col className="m-auto border" lg key={post.id}>
                  <p className="text-secondary">
                    Shared By: {post.sharedBy.email}
                  </p>
                  <Post post={post} />
                  <button
                    className="btn btn-primary d-flex mx-auto"
                    onClick={() => deleteShare(post.id)}
                  >
                    Delete Share
                  </button>
                </Col>
              );
            })}
          </Row>
        )}
      </DefaultLayout>
    </>
  );
};

export default Shares;
