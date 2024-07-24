import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Button } from "./components/Button";
import { AddAlbum } from "./components/AddAlbum";
import { AlbumContainer } from "./components/AlbumsContainer";
import { Album } from "./components/Album";
import appStyles from "./App.module.css";

const albumsList = [
  {
    title: "Anime",
    id: "1",
    pics: [
      {
        id: "1",
        url: "https://img.asmedia.epimg.net/resizer/v2/YFFD3QBX2ZHX5CQCLGKWBTBUJA.png?auth=36c623cae111b8cb33e03f29a9d01acf02bbe47543da3edd735fccb8f7d64a29&width=644&height=362&smart=true",
        title: "GolDRoger",
      },
      {
        id: "2",
        url: "https://imgix.ranker.com/list_img_v2/6502/3206502/original/3206502?fit=crop&fm=pjpg&q=80&dpr=2&w=1200&h=720",
        title: "Shanks",
      },
    ],
  },
];

function App() {
  const [albums, setAlbums] = useState(albumsList);
  const [formOpen, setFormOpen] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);

  const albumTileClickHandle = (id) => {
    const selectedAlbum = albums.find((item) => item.id === id);
    setCurrentAlbum(selectedAlbum);
  };

  const addAlbumHandle = (data) => {
    setAlbums([
      { ...data, id: albums.length + 1, timestamp: Date.now() },
      ...albums,
    ]);
  };

  const addImageHandle = (imageData) => {
    const newCurrentAlbum = currentAlbum;

    if (currentAlbum.pics) {
      imageData.id = currentAlbum.pics.length + 1;
      newCurrentAlbum.pics.unshift(imageData);
    } else {
      imageData.id = 1;
      newCurrentAlbum.pics = [imageData];
    }

    setCurrentAlbum(newCurrentAlbum);

    const newAlbums = albums.map((album) => {
      if (album.id === newCurrentAlbum.id) {
        album = newCurrentAlbum;
      }
      return album;
    });

    setAlbums(newAlbums);
  };

  const deleteImageHandle = (id) => {
    const newAlbums = albums.map((album) => {
      if (album.id === currentAlbum.id) {
        // find image
        const imageIndex = album.pics.findIndex((pic) => pic.id === id);
        album.pics.splice(imageIndex, 1);
      }
      return album;
    });

    setAlbums(newAlbums);
  };

  const editImageHandle = (id, newImageData) => {
    const instanceOfCurrentAlbum = currentAlbum;
    const newUpdatedAlbumPics = currentAlbum.pics.map((item) => {
      if (item.id === id) {
        item.title = newImageData.title;
        item.url = newImageData.url;
      }
      return item;
    });

    instanceOfCurrentAlbum.pics = newUpdatedAlbumPics;
    const updatedAlbums = albums.map((album) => {
      if (album.id === instanceOfCurrentAlbum.id) {
        album = instanceOfCurrentAlbum;
      }
      return album;
    });
    setAlbums(updatedAlbums);
  };

  return (
    <div>
      {console.log("currentAlbum in render => ", currentAlbum)}
      {console.log("pics in render => ", currentAlbum?.pics)}
      {console.log("albums in render => ", albums)}
      <Navbar />
      {!currentAlbum ? (
        <div className={appStyles.main}>
          {formOpen && <AddAlbum addAlbumHandle={addAlbumHandle} />}
          <div className={appStyles.header}>
            <h1>Your Albums</h1>
            <Button
              onClick={() => setFormOpen(!formOpen)}
              bgColor={formOpen ? "rgba(255, 19, 0, .1)" : null}
              border={formOpen ? "2px solid red" : null}
              color={formOpen ? "#ff1300" : null}
            >
              {formOpen ? "cancel" : "Add Album"}
            </Button>
          </div>

          <AlbumContainer
            albums={albums}
            albumTileClickHandle={albumTileClickHandle}
          />
        </div>
      ) : (
        <div className={appStyles.albumContainer}>
          <Album
            currentAlbum={currentAlbum}
            goBack={setCurrentAlbum}
            uploadImageHandle={addImageHandle}
            deleteImageHandle={deleteImageHandle}
            editImageHandle={editImageHandle}
          />
        </div>
      )}
    </div>
  );
}

export default App;
