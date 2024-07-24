import React, { useState } from "react";
import albumStyles from "./index.module.css";
import { Button } from "../Button";
import { Input } from "../Input";
import { Tile } from "../Tile";
import { UploadImage } from "../UploadImage";

export const Album = ({
  currentAlbum,
  goBack,
  uploadImageHandle,
  deleteImageHandle,
  editImageHandle,
}) => {
  const [openImageUploadForm, setOpenImageUploadForm] = useState(false);
  // const [openAlbumCreateForm, setOpenAlbumCreateForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageToEdit, setImageToEdit] = useState(null);
  const [pics, setPics] = useState(currentAlbum.pics);
  const [searchable, setSearchable] = useState(false);
  // useEffect(() => {
  //   console.log("effect");
  // }, [currentAlbum]);

  const searchHandle = (query) => {
    // filter with search term
    const searchResults = currentAlbum.pics.filter((pic) =>
      pic.title.toLowerCase().includes(query.toLowerCase())
    );
    setPics(searchResults);
  };

  const imageClickHandle = (id) => {
    setSelectedImage(currentAlbum.pics.find((item) => item.id === id));
  };

  const closeImageHandle = () => {
    setSelectedImage(null);
  };

  const prevHandle = () => {
    const index = currentAlbum.pics.findIndex(
      (item) => JSON.stringify(item) === JSON.stringify(selectedImage)
    );
    if (index - 1 >= 0) {
      setSelectedImage(currentAlbum.pics[index - 1]);
    } else {
      setSelectedImage(currentAlbum.pics[currentAlbum.pics.length - 1]);
    }
  };

  const nextHandle = () => {
    const index = currentAlbum.pics.findIndex(
      (item) => JSON.stringify(item) === JSON.stringify(selectedImage)
    );
    if (index + 1 <= currentAlbum.pics.length - 1) {
      setSelectedImage(currentAlbum.pics[index + 1]);
    } else {
      setSelectedImage(currentAlbum.pics[0]);
    }
  };

  const editImageDataHandle = (id) => {
    setOpenImageUploadForm(true);
    console.log("currentAlbum => ", currentAlbum);
    console.log("id => ", id);
    const selectedImage = currentAlbum.pics.find((item) => item.id === id);
    setImageToEdit(selectedImage);
  };

  return (
    <div className={albumStyles.albumContainer}>
      {openImageUploadForm && (
        <UploadImage
          uploadImageHandle={uploadImageHandle}
          currentAlbum={currentAlbum}
          imageToEdit={imageToEdit}
          editImageHandle={editImageHandle}
          setOpenImageUploadForm={setOpenImageUploadForm}
        />
      )}
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
          {currentAlbum.pics?.length > 0 && (
            <h1>Images in {currentAlbum.title}</h1>
          )}
        </div>
        {currentAlbum.pics?.length > 0 || (
          <div>
            <h1>No images found in this album!</h1>
          </div>
        )}
        <div className={albumStyles.innerDiv}>
          {searchable && (
            <Input
              className={albumStyles.searchInput}
              type="search"
              onChange={(e) => searchHandle(e.target.value)}
            />
          )}
          {currentAlbum.pics?.length > 0 && (
            <Button
              borderRadius="25rem"
              width="3.5rem"
              height="3.5rem"
              padding="0.5rem"
              bgColor="#fff"
              border="none"
              margin="0 20px 0 0"
              onClick={() => setSearchable(!searchable)}
            >
              <img
                className={albumStyles.icon}
                src="https://cdn-icons-png.flaticon.com/128/2801/2801881.png"
                alt="search"
              />
            </Button>
          )}
          <Button
            onClick={() => {
              setOpenImageUploadForm(!openImageUploadForm);
            }}
            bgColor={openImageUploadForm ? "rgba(255, 19, 0, .1)" : null}
            border={openImageUploadForm ? "2px solid red" : null}
            color={openImageUploadForm ? "#ff1300" : null}
          >
            {openImageUploadForm ? "cancel" : "Add image"}
          </Button>
        </div>
      </header>
      <div className={albumStyles.imagesContainer}>
        {pics?.map((pic) => (
          <Tile
            key={pic.id}
            album={{ url: pic.url, title: pic.title, id: pic.id }}
            click={() => imageClickHandle(pic.id)}
            deleteImageHandle={deleteImageHandle}
            editImageDataHandle={editImageDataHandle}
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
