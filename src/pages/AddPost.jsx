import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDb } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const addPostHandler = () => {
    dispatch({ type: "showLoading" });
    const storage = getStorage();
    const storageRef = ref(storage, `/posts/${image.name}`);
    uploadBytes(storageRef, image)
      .then((snapshot) => {
        getDownloadURL(ref(storage, `/posts/${image.name}`)).then((url) => {
          addDoc(collection(fireDb, "posts"), {
            description,
            imageUrl: url,
            likes: [],
            comments: [],
            user: JSON.parse(localStorage.getItem("reactgram-offical-user")),
          })
            .then(() => {
              toast.success("Post Created Successfully");
              dispatch({ type: "hideLoading" });
              navigate("/");
            })
            .catch(() => {
              dispatch({ type: "hideLoading" });
              toast.error("Something Went Wrong");
            });
        });
      })
      .catch(() => {
        toast.error("Something Went Wrong");
      });

    setDescription("");
    setImage("");
  };
  const imageChangeHandler = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <DefaultLayout>
      <div className="py-4 space-y-10">
        <h1>Add Post</h1>
        <textarea
          className="border form-control border-dark p-2"
          id=""
          cols="90"
          rows="3"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <input
          type="file"
          onChange={(e) => {
            imageChangeHandler(e);
          }}
        />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            className="rounded h-[200px] w-[200px]"
          />
        )}
        {description && image && (
          <button className="bg-primary rounded p-2" onClick={addPostHandler}>
            Add Post
          </button>
        )}
      </div>
    </DefaultLayout>
  );
}

export default AddPost;
