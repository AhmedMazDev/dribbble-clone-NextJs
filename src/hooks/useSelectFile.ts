import { useState } from "react";

const useSelectImage = () => {
  const [image, setImage] = useState<File>();
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onReset = () => {
    setImage(undefined);
    setImageSrc("");
    setImageName("");
    setError("");
  };

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const img = new Image();
    if (file) {
      img.src = URL.createObjectURL(file);
    }

    img.onload = function () {
      const width = img.width;
      const height = img.height;
      if (width < 400 || height < 300) {
        setError("Image must be at least 400x300");
        return;
      }
      const extension = file?.name.split(".").pop();
      const name = file?.name + "-" + Date.now() + "." + extension;
      setImage(file);
      setImageName(name);
      setImageSrc(img.src);
      setError("");
    };
  };

  return {
    image,
    imageSrc,
    imageName,
    onSelectImage,
    onReset,
    error,
  };
};

export default useSelectImage;
