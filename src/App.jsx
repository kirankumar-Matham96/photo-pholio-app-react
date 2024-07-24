import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Button } from "./components/Button";
import { AlbumContainer } from "./components/AlbumsContainer";
import appStyles from "./App.module.css";

const albumsList = [
  {
    title: "First Album",
    id: "1",
    pics: [{ url: "", title: "image title" }],
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
    id: "5",
    pics: [{ url: "", title: "image title" }],
  },
  {
    title: "Fifth Album",
    id: "5",
    pics: [{ url: "", title: "image title" }],
  },
  {
    title: "Fifth Album",
    id: "5",
    pics: [{ url: "", title: "image title" }],
  },
  {
    title: "Fifth Album",
    id: "5",
    pics: [{ url: "", title: "image title" }],
  },
  {
    title: "Fifth Album",
    id: "5",
    pics: [{ url: "", title: "image title" }],
  },
];

function App() {
  const [albums, setAlbums] = useState(albumsList);
  return (
    <div>
      <Navbar />
      <div className={appStyles.main}>
        <div className={appStyles.header}>
          <h1>Your Albums</h1>
          <Button>Add Album</Button>
        </div>
        <AlbumContainer albums={albums} />
      </div>
    </div>
  );
}

export default App;
