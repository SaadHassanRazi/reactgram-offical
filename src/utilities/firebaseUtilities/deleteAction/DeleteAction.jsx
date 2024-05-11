// DeleteButton.js
import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDb } from "../../../firebaseConfig";
import { toast } from "react-toastify";

const DeleteButton = ({ postId,collectionName, onDelete }) => {
    const delteHandler = async () => {
        const docRef = doc(fireDb, collectionName, postId);

        try {
            await deleteDoc(docRef);
            toast.success("Post Deleted Successfully");
            onDelete(); // Callback to update data in parent component
        } catch (error) {
            toast.error("Error Deleting Post: " + error.message);
            console.log(error.message);
        }
    };

    return (
        <button
            className="btn btn-primary d-flex mx-auto"
            onClick={delteHandler}
        >
            Delete
        </button>
    );
};

export default DeleteButton;
