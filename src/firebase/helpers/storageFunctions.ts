import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebaseConfig";

export const uploadImage = async (
  image: File,
  imageName: string,
  uid: string,
  slug: string
) => {
  let downloadURL = "";
  const metadata = {
    contentType: "image/jpeg, image/png, image/jpg, image/gif",
  };
  const imageRef = ref(storage, `posts/${uid}/${slug}/${imageName}`);
  const uploadTask = uploadBytesResumable(imageRef, image, metadata);
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log("error uploading image", error.message);
      throw new Error("Error uploading image: " + error);
    },
    async () => {
      downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log("downloadUrl", downloadURL);
    }
  );
  return downloadURL;
};
