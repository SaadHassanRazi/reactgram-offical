import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";

import { useDispatch } from "react-redux";
import Post from "../components/Post";
import { Col, Row, InputGroup, Form, Button } from "react-bootstrap";
import fetchDataFromFirestore from "../../firebaseUtilities/firestoreUtil";
import { fireDb } from "../../firebaseConfig";

const Home = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("reactgram-offical-user")
  );
  const dispatch = useDispatch("");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterSearch, setFilterSearch] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const getData = async () => {
    dispatch({ type: "showLoading" });
    const tempData = await fetchDataFromFirestore(fireDb, "posts");
    setData(tempData);
    dispatch({ type: "hideLoading" });
  };

  useEffect(() => {
    getData();
  }, []);

  const postFilter = (searchText) => {
    const filteredPosts = data.filter((post) =>
      post.description.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilterSearch(filteredPosts);
    setShowSearchResults(true);
  };

  const handleCloseSearch = () => {
    setShowSearchResults(false);
    setSearch("");
    setFilterSearch([]);
  };

  return (
    <DefaultLayout>
      <h2 className="my-4">
        <span className="rounded-circle p-3 px-4 my-auto text-bold text-white bg-dark text-uppercase">
          {currentUser.email.slice(0, 1)}
        </span>
        <span className="text-uppercase">
          {currentUser.email.slice(0, -10)}
        </span>{" "}
      </h2>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button className="btn btn-primary" onClick={() => postFilter(search)}>
          Search
        </button>
      </InputGroup>
      <div className="border">
        {showSearchResults && filterSearch.length > 0 ? (
          <>
            <Button variant="danger" onClick={handleCloseSearch}>
              Close Search
            </Button>
            {filterSearch.map((post) => (
              <Col key={post.id} className="m-auto" lg>
                <Post post={post} />
              </Col>
            ))}
          </>
        ) : showSearchResults && filterSearch.length === 0 ? (
          <p>No results found.</p>
        ) : null}
      </div>
      <Row className="mx-auto ">
        {data.map((post) => (
          <Col key={post.id} className="m-auto" lg>
            <Post post={post} />
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
};

export default Home;
