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
    console.log("imageData => ", imageData);

    // 1. find the current album
    // currentAlbum

    // 2. find the current album in the albums array
    // albums[currentAlbum]

    // 3. Add image data
    console.log("album length => ", albums.length + 1);
    // const newCurrentAlbum = [
    //   {
    //     id: currentAlbum.pics ? currentAlbum.pics.length + 1 : 1,
    //     ...imageData,
    //   },
    //   ...currentAlbum?.pics,
    // ];
    const newCurrentAlbum = currentAlbum;

    if (currentAlbum.pics) {
      imageData.id = currentAlbum.pics.length + 1;
      newCurrentAlbum.pics.unshift(imageData);
    } else {
      imageData.id = 1;
      newCurrentAlbum.pics = [imageData];
    }

    console.log("newCurrentAlbum => ", newCurrentAlbum.id);
    setCurrentAlbum(newCurrentAlbum);

    const newAlbums = albums.map((album) => {
      if (album.id === newCurrentAlbum.id) {
        album = newCurrentAlbum;
      }
      return album;
    });

    // 4. update the albums
    setAlbums(newAlbums);
  };

  return (
    <div>
      {console.log({ currentAlbum })}
      {console.log("pics => ", currentAlbum?.pics)}
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
            // uploadImageHandle={uploadImageHandle}
          />
        </div>
      ) : (
        <div className={appStyles.albumContainer}>
          <Album
            currentAlbum={currentAlbum}
            goBack={setCurrentAlbum}
            uploadImageHandle={addImageHandle}
          />
        </div>
      )}
    </div>
  );
}

export default App;
