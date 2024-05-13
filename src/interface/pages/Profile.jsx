import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { fireDb } from "../../firebaseConfig";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import fetchDataFromFirestore from "../../utilities/firebaseUtilities/firestoreUtil";
import DeleteButton from "../../utilities/deleteAction/DeleteAction";
function Profile() {
  const currentUser = JSON.parse(
    localStorage.getItem("reactgram-offical-user")
  );
  const dispatch = useDispatch("");
  const params = useParams();
  const [post, setPost] = useState([]);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const getData = async () => {
    dispatch({ type: "showLoading" });
    const tempData = await fetchDataFromFirestore(fireDb, "posts");
    const filteredPosts = tempData.filter((post) => post.user.id === params.id);
    setPost(filteredPosts);
    dispatch({ type: "hideLoading" });
  };
  const getUser = async () => {
    const result = await getDoc(doc(fireDb, "users", params.id));
    setUser(result.data());

    dispatch({ type: "hideLoading" });
  };

  const getUserData = async () => {
    const tempData = await fetchDataFromFirestore(fireDb, "users");

    const userEmail = tempData.map((user) => {
      return user.email;
    });
    setUserData(userEmail);
  };

  useEffect(() => {
    getData();
    getUser();
    getUserData();
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
                    <DeleteButton
                      postId={post.id}
                      collectionName={"posts"}
                      onDelete={getData}
                    />
                  </Col>
                );
              })}
            </Row>
            <div className="border">
              <h1>User Profiles</h1>
              <p>List of Users who have logged in to Reactgram</p>
              {userData && (
                <>
                  {userData.map((email, emailIndex) => {
                    return (
                      <ul className="my-5" key={emailIndex}>
                        <li>
                          <span className="rounded-circle p-3 px-4 my-auto text-bold text-white bg-dark text-uppercase">
                            {email.slice(0, 1).toUpperCase()}
                          </span>
                          <span>{email.slice(0, -10).toUpperCase()}</span>
                        </li>
                      </ul>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </DefaultLayout>
  );
}

export default Profile;
