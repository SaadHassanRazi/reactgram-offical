import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { fireDb } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
function SharePost() {
  const params = useParams();
  const dispatch = useDispatch("");
  const [data, setData] = useState([]);
  const [post, setPost] = useState(null);
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
  return (
    <>
      <DefaultLayout>
        {post && data && (<>
          <div>
          <img src={post.imageUrl} className="h-52 w-52 rounded" alt="" />
        </div>
        <Row className="text-center text-uppercase">
          {data.map((users) => {
            return (
              <Col className="py-3" lg={3}>
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
</>)}      </DefaultLayout>
    </>
  );
}

export default SharePost;
