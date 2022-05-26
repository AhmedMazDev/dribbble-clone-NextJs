import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";
import { storage } from "../firebase/firebaseConfig";

const useUploadImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageURL, setImageURL] = useState("");

  const uploadImage = async (
    image: File,
    imageName: string,
    uid: string,
    slug?: string
  ) => {
    setLoading(true);
    const metadata = {
      contentType: "image/jpeg, image/png, image/jpg, image/gif",
    };
    let imageRef;
    if (slug) {
      imageRef = ref(storage, `posts/${uid}/${slug}/${imageName}`);
    } else {
      imageRef = ref(storage, `users/${uid}/${imageName}`);
    }
    const uploadTask = uploadBytesResumable(imageRef, image, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setError("Error uploading image: " + error);
        setLoading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageURL(downloadURL);
        setLoading(false);
      }
    );
  };

  return {
    loading,
    error,
    imageURL,
    uploadImage,
  };
};
export default useUploadImage;
