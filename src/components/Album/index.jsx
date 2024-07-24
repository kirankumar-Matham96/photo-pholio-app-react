import React, { useState } from "react";
import albumStyles from "./index.module.css";
import { Button } from "../Button";
import { Tile } from "../Tile";

export const Album = ({ currentAlbum, goBack }) => {
  const [openUploadForm, setOpenUploadForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const imageClickHandle = (id) => {
    setSelectedImage(currentAlbum.pics.find((item) => item.id === id));
  };

  const closeImageHandle = () => {
    setSelectedImage(null);
  };

  const prevHandle = () => {
    console.log("prevHandle");
    const index = currentAlbum.pics.findIndex(
      (item) => JSON.stringify(item) === JSON.stringify(selectedImage)
    );
    console.log("index => ", index);
    if (index - 1 >= 0) {
      setSelectedImage(currentAlbum.pics[index - 1]);
    } else {
      setSelectedImage(currentAlbum.pics[currentAlbum.pics.length - 1]);
    }
  };

  const nextHandle = () => {
    console.log("nextHandle");
    const index = currentAlbum.pics.findIndex(
      (item) => JSON.stringify(item) === JSON.stringify(selectedImage)
    );
    console.log("index => ", index);
    console.log("last index => ", currentAlbum.pics.length - 1);
    if (index + 1 <= currentAlbum.pics.length - 1) {
      setSelectedImage(currentAlbum.pics[index + 1]);
    } else {
      setSelectedImage(currentAlbum.pics[0]);
    }
  };

  return (
    <div className={albumStyles.albumContainer}>
      {console.log("selectedImage => ", selectedImage)}
      <header className={albumStyles.header}>
        <div className={albumStyles.innerDiv}>
          <Button
            borderRadius="25rem"
            width="3.5rem"
            height="3.5rem"
            padding="0.5rem"
            bgColor="#fff"
            shadow="0 0 3px 2px  #e1e1e1"
            border="none"
            margin="0 20px 0 0"
            onClick={() => goBack(null)}
          >
            <img
              className={albumStyles.icon}
              src="https://cdn-icons-png.flaticon.com/128/709/709624.png"
              alt="back"
            />
          </Button>
          <h1>Images in {currentAlbum.title}</h1>
        </div>
        <div className={albumStyles.innerDiv}>
          <Button
            borderRadius="25rem"
            width="3.5rem"
            height="3.5rem"
            padding="0.5rem"
            bgColor="#fff"
            border="none"
            margin="0 20px 0 0"
          >
            <img
              className={albumStyles.icon}
              src="https://cdn-icons-png.flaticon.com/128/2801/2801881.png"
              alt="search"
            />
          </Button>
          <Button
            onClick={() => {
              setOpenUploadForm(!openUploadForm);
            }}
            bgColor={openUploadForm ? "rgba(255, 19, 0, .1)" : null}
            border={openUploadForm ? "2px solid red" : null}
            color={openUploadForm ? "#ff1300" : null}
          >
            {openUploadForm ? "cancel" : "Add image"}
          </Button>
        </div>
      </header>
      <div className={albumStyles.imagesContainer}>
        {currentAlbum.pics?.map((pic, index) => (
          <Tile
            key={pic.id}
            album={{ url: pic.url, title: pic.title }}
            click={() => imageClickHandle(pic.id)}
          />
        ))}
      </div>
      {selectedImage && (
        <div className={albumStyles.displayImageContainer}>
          <div className={albumStyles.closeBtnContainer}>
            <Button
              borderRadius="25rem"
              width="3.5rem"
              height="3.5rem"
              padding="0.5rem"
              bgColor="#fff"
              border="none"
              onClick={closeImageHandle}
            >
              <img
                className={albumStyles.icon}
                src="https://cdn-icons-png.flaticon.com/128/17284/17284977.png"
                alt="close"
              />
            </Button>
          </div>
          <div className={albumStyles.imageOverlayContainer}>
            <Button
              borderRadius="25rem"
              width="3.5rem"
              height="3.5rem"
              padding="0.5rem"
              bgColor="#fff"
              border="none"
              margin="0 20px 0 0"
              onClick={prevHandle}
            >
              <img
                className={albumStyles.icon}
                src="https://cdn-icons-png.flaticon.com/128/2722/2722991.png"
                alt="prev"
              />
            </Button>
            <div className={albumStyles.imageContainer}>
              <img
                className={albumStyles.image}
                src={selectedImage.url}
                alt={selectedImage.title}
              />
            </div>
            <Button
              borderRadius="25rem"
              width="3.5rem"
              height="3.5rem"
              padding="0.5rem"
              bgColor="#fff"
              border="none"
              margin="0 0 0 20px"
              onClick={nextHandle}
            >
              <img
                className={albumStyles.icon}
                src="https://cdn-icons-png.flaticon.com/128/2722/2722985.png"
                alt="next"
              />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
