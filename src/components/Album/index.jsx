import React, { useState } from "react";
import albumStyles from "./index.module.css";
import { Button } from "../Button";
import { Tile } from "../Tile";

export const Album = ({ currentAlbum, goBack }) => {
  const [openUploadForm, setOpenUploadForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const imageClickHandle = (id) => {
    console.log("imageClickHandle");
    console.log(currentAlbum.pics.find((item) => item.id === id));
    setSelectedImage(currentAlbum.pics.find((item) => item.id === id));
  };

  const closeImageHandle = () => {
    setSelectedImage(null);
  };

  return (
    <div className={albumStyles.albumContainer}>
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
            onClick={() => goBack(null)}
          >
            <img
              className={albumStyles.image}
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
          >
            <img
              className={albumStyles.image}
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
        {currentAlbum.pics?.map((pic) => (
          <Tile
            key={pic.id}
            album={{ url: pic.url, title: pic.title }}
            click={() => imageClickHandle(pic.id)}
          />
        ))}
      </div>
      {selectedImage && (
        <div className={albumStyles.displayImageContainer}>
          <div>
            <Button onClick={closeImageHandle}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/17284/17284977.png"
                alt="close"
              />
            </Button>
          </div>
          <div>
            <Button>
              <img
                src="https://cdn-icons-png.flaticon.com/128/271/271220.png"
                alt="prev"
              />
            </Button>
            <div>
              <img src={selectedImage.url} alt={selectedImage.title} />
            </div>
            <Button>
              <img
                src="https://cdn-icons-png.flaticon.com/128/271/271228.png"
                alt="next"
              />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
