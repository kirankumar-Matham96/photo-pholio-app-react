import React, { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import addAlbumFormStyles from "./index.module.css";

export const AddAlbum = ({ addAlbumHandle }) => {
  const [title, setTitle] = useState("");

  const submitHandle = (e) => {
    e.preventDefault();
    const albumData = {
      title,
    };
    addAlbumHandle(albumData);
    clearFormHandle(e);
  };

  const titleChangeHandle = (e) => {
    setTitle(e.target.value);
  };

  const clearFormHandle = (e) => {
    setTitle("");
  };

  return (
    <div className={addAlbumFormStyles.bgContainer}>
      <h1>Create an album</h1>
      <form className={addAlbumFormStyles.form} onSubmit={submitHandle}>
        <Input
          type="text"
          value={title}
          onChange={(e) => titleChangeHandle(e)}
          required
        />
        <div className={addAlbumFormStyles.btnContainer}>
          <Button
            type="reset"
            bgColor="red"
            color="white"
            border="none"
            padding="10px 28px"
            width="6.8rem"
            onClick={clearFormHandle}
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
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};
