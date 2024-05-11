import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDb } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImageToStorage = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, `/posts/${image.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(ref(storage, `/posts/${image.name}`));
      return downloadURL;
    } catch (error) {
      throw new Error("Error uploading image to storage.");
    }
  };

  const addPostToFirestore = async (imageUrl) => {
    const user = JSON.parse(localStorage.getItem("reactgram-offical-user"));

    try {
      await addDoc(collection(fireDb, "posts"), {
        description,
        imageUrl,
        likes: [],
        comments: [],
        user,
      });
      toast.success("Post Created Successfully");
      dispatch({ type: "hideLoading" });
      navigate("/");
    } catch (error) {
      throw new Error("Error adding post to Firestore.");
    }
  };

  const addPostHandler = async () => {
    dispatch({ type: "showLoading" });

    try {
      const imageUrl = await uploadImageToStorage();
      await addPostToFirestore(imageUrl);
    } catch (error) {
      dispatch({ type: "hideLoading" });
      toast.error("Something Went Wrong");
    }

    setDescription("");
    setImage("");
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
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input type="file" onChange={handleImageChange} />
        {image && (
          <img src={URL.createObjectURL(image)} className="rounded h-[200px] w-[200px]" />
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
