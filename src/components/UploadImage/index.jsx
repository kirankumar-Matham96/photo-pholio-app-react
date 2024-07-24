import { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import uploadImageFormStyles from "./index.module.css";

export const UploadImage = ({
  uploadImageHandle,
  currentAlbum,
  imageToEdit,
  editImageHandle,
  setOpenImageUploadForm,
}) => {
  const [title, setTitle] = useState(imageToEdit ? imageToEdit.title : "");
  const [url, setUrl] = useState(imageToEdit ? imageToEdit.url : "");

  const changeTitleHandle = (e) => {
    setTitle(e.target.value);
  };
  
  const changeUrlHandle = (e) => {
    setUrl(e.target.value);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    const imageData = {
      title,
      url,
      timestamp: Date.now(),
    };
    imageToEdit
      ? editImageHandle(imageToEdit.id, imageData)
      : uploadImageHandle(imageData);
    resetForm();
    setOpenImageUploadForm(false);
  };

  const resetForm = () => {
    setTitle("");
    setUrl("");
  };

  return (
    <div className={uploadImageFormStyles.bgContainer}>
      <h1>
        {imageToEdit
          ? `Update image ${imageToEdit.title}`
          : `Add image to ${currentAlbum.title}`}
      </h1>
      <form onSubmit={submitHandle} className={uploadImageFormStyles.form}>
        <Input
          value={title}
          typw="text"
          onChange={changeTitleHandle}
          required
        />
        <Input value={url} typw="url" onChange={changeUrlHandle} required />
        <div className={uploadImageFormStyles.btnContainer}>
          <Button
            type="reset"
            bgColor="red"
            color="white"
            border="none"
            padding="10px 28px"
            width="6.8rem"
            margin="0 1rem 0 0"
            onClick={resetForm}
          >
            Clear
          </Button>
          <Button
            type="submit"
            bgColor="#07f"
            color="white"
            border="none"
            padding="10px 28px"
            width="6.8rem"
          >
            {imageToEdit ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </div>
  );
};
