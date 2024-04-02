import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { fireDb } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
function SharePost() {
  const params = useParams();
  const dispatch = useDispatch("");
  const [data, setData] = useState([]);
  const [post, setPost] = useState(null);
  const [selectedUser, setSelectedUser] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    dispatch({ type: "showLoading" });
    const q = query(collection(fireDb, "users"));
    const temp = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      temp.push({ ...doc.data(), id: doc.id });
    });
    setData(temp);
    dispatch({ type: "hideLoading" });
  };
  const getPost = () => {
    getDoc(doc(fireDb, "posts", params.id))
      .then((response) => {
        setPost({ ...response.data(), id: response.id });

        dispatch({ type: "hideLoading" });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "hideLoading" });
      });
  };
  useEffect(() => {
    getData();
    getPost();
  }, []);

  const addOrRemoveUser = (user) => {
    if (selectedUser.find((obj) => obj.id === user.id)) {
      const temp = selectedUser.filter((obj) => obj.id !== user.id);
      setSelectedUser(temp);
    } else {
      const temp = [...selectedUser];
      temp.push(user);
      setSelectedUser(temp);
    }
  };
  console.log(selectedUser);
  const sharePost = async () => {
    selectedUser.forEach((user) => {
      dispatch({ type: "showLoading" });
      const tempShares = user.shares ?? [];
      tempShares.push({
        ...post,
        sharedBy: JSON.parse(localStorage.getItem("reactgram-offical-user")),
      });
      setDoc(doc(fireDb, "users", user.id), {
        ...user,
        shares: tempShares,
      }).then(() => {
        dispatch({ type: "hideLoading" });
      });
    });
    toast.success("Post Shared Success");
    navigate("/");
  };
  return (
    <>
      <DefaultLayout>
        {post && data && (
          <>
            <div>
              <img src={post.imageUrl} className="h-52 w-52 rounded" alt="" />
            </div>
            <hr />
            <h3>Select Users</h3>
            <Row className="text-center gap-1 mx-auto border text-uppercase">
              {data.map((users) => {
                const alreadySelected = selectedUser.find(
                  (obj) => obj.id === users.id
                );
                return (
                  <Col
                    className={`py-3 mx-auto cursor-pointer ${
                      alreadySelected && "border border-primary"
                    }`}
                    lg={3}
                    onClick={() => {
                      addOrRemoveUser(users);
                    }}
                  >
                    <p
                      className="rounded-circle mx-auto my-auto text-bold text-white bg-dark "
                      style={{ width: "90px", padding: "24px 0px" }}
                    >
                      {users.email.slice(0, 1)}
                    </p>{" "}
                    <p className="my-auto">{users.email.slice(0, -10)}</p>
                  </Col>
                );
              })}
            </Row>
            <h3>Share to: </h3>
            <p>
              {selectedUser.map((props) => {
                return (
                  <>
                    <p className="text-uppercase border w-50 mx-auto text-center">
                      {props.email.slice(0, -10)}
                    </p>
                  </>
                );
              })}
            </p>
            <button className="btn btn-primary my-3" onClick={sharePost}>
              Share Post
            </button>
          </>
        )}{" "}
      </DefaultLayout>
    </>
  );
}

export default SharePost;
