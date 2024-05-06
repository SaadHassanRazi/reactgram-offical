import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { fireDb } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
function Profile() {
  const currentUser = JSON.parse(
    localStorage.getItem("reactgram-offical-user")
  );
  const navigate = useNavigate();
  const dispatch = useDispatch("");
  const params = useParams();
  const [post, setPost] = useState([]);
  const [user, setUser] = useState(null);
  const getData = async () => {
    dispatch({ type: "showLoading" });
    const q = query(collection(fireDb, "posts"));
    const temp = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      temp.push({ ...doc.data(), id: doc.id });
    });
    const filteredPosts = temp.filter((post) => post.user.id === params.id);
    setPost(filteredPosts);
    dispatch({ type: "hideLoading" });
  };
  const getUser = async () => {
    const result = await getDoc(doc(fireDb, "users", params.id));
    setUser(result.data());
    dispatch({ type: "hideLoading" });
  };
  useEffect(() => {
    getData();
    getUser();
  }, []);

  return (
    <DefaultLayout>
      {user && (
        <>
          <div>
            <div className="text-uppercase d-flex gap-2">
              <p className="rounded-circle p-3 px-4 my-auto text-bold text-white bg-dark ">
                {user.email.slice(0, 1)}
              </p>{" "}
              <p className="my-auto">{user.email.slice(0, -10)}</p>
            </div>
            <p className="">Bio: {user.bio}</p>
          </div>

          <div>
            <p>Posts Uploaded By: {user.email}</p>

            <Row className="mx-auto ">
              {post.map((post) => {
                return (
                  <Col className="m-auto mb-4" lg>
                    <Post post={post} />
                    <button
                      className="btn btn-primary d-flex mx-auto"
                      onClick={() => {
                        const docRef = doc(fireDb, "posts", post.id);

                        deleteDoc(docRef)
                          .then(() => {
                            toast.success("Post Deleted Successfully");
                            getData();
                          })
                          .catch((error) => {
                            toast.error(
                              "Error Deleting Post: " + error.message
                            );
                            console.log(error.message);
                          });
                      }}
                    >
                      Delete
                    </button>
                  </Col>
                );
              })}
            </Row>
          </div>
        </>
      )}
    </DefaultLayout>
  );
}

export default Profile;
