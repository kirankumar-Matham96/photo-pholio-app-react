import { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import uploadImageFormStyles from "./index.module.css";

export const UploadImage = ({ uploadImageHandle, albumTitle }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

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
    console.log("imageData", imageData);
    uploadImageHandle(imageData);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setUrl("");
  };

  return (
    <div className={uploadImageFormStyles.bgContainer}>
      <h1>Add image to {albumTitle}</h1>
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
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};
