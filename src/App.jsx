import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Button } from "./components/Button";
import { AddAlbum } from "./components/AddAlbum";
import { AlbumContainer } from "./components/AlbumsContainer";
import { Album } from "./components/Album";
import appStyles from "./App.module.css";

const albumsList = [
  {
    title: "First Album",
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
  {
    title: "Second Album",
    id: "2",
    pics: [{ url: "", title: "image title" }],
  },
  {
    title: "Third Album",
    id: "3",
    pics: [{ url: "", title: "image title" }],
  },
  {
    title: "Fourth Album",
    id: "4",
    pics: [{ url: "", title: "image title" }],
  },
  {
    title: "Fifth Album",
    id: "5",
    pics: [{ url: "", title: "image title" }],
  },
  {
    title: "Fifth Album",
    id: "6",
    pics: [{ url: "", title: "image title" }],
  },
  {
    title: "Fifth Album",
    id: "7",
    pics: [{ url: "", title: "image title" }],
  },
  {
    title: "Fifth Album",
    id: "8",
    pics: [{ url: "", title: "image title" }],
  },
  {
    title: "Fifth Album",
    id: "9",
    pics: [{ url: "", title: "image title" }],
  },
  {
    title: "Fifth Album",
    id: "10",
    pics: [{ url: "", title: "image title" }],
  },
];

function App() {
  const [albums, setAlbums] = useState(albumsList);
  const [formOpen, setFormOpen] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);

  const albumTileClickHandle = (id) => {
    console.log("album clicked");
    const selectedAlbum = albumsList.find((item) => item.id === id);
    setCurrentAlbum(selectedAlbum);
  };

  return (
    <div>
      <Navbar />
      {!currentAlbum ? (
        <div className={appStyles.main}>
          {formOpen && <AddAlbum />}
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
          <Album currentAlbum={currentAlbum} goBack={setCurrentAlbum} />
        </div>
      )}
    </div>
  );
}

export default App;
