import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Button } from "./components/Button";
import { AddAlbum } from "./components/AddAlbum";
import { AlbumContainer } from "./components/AlbumsContainer";
import { Album } from "./components/Album";
import { db } from "./firestore.config";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appStyles from "./App.module.css";

function App() {
  const [albums, setAlbums] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);

  // toastify alert function
  const notify = (message) => toast(message);

  // firestore live listener
  const unsubscribe = onSnapshot(collection(db, "photo-pholio"), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setAlbums(data);
  });

  /**
   * Updates the document in firestore
   * @param {Object} docRef - collection object
   * @param {Object} updatedDocument - new updated document
   */
  const updateDocument = async (docRef, updatedDocument) => {
    await updateDoc(docRef, updatedDocument);
  };

  /**
   * Adds a picture in the document array
   * @param {Object} docRef - collection object
   * @param {Object} imageData - image data object
   */
  const addPicInDoc = async (docRef, imageData) => {
    try {
      await updateDoc(docRef, {
        pics: arrayUnion(imageData),
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Delete image from the document array
   * @param {Object} docRef - collection object
   * @param {Object} itemToDelete - item object to delete
   */
  const deletePicInDoc = async (docRef, itemToDelete) => {
    try {
      await updateDoc(docRef, {
        pics: arrayRemove(itemToDelete),
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Click handle to select the current album
   * @param {String} id - id of the album
   */
  const albumTileClickHandle = (id) => {
    const selectedAlbum = albums.find((item) => item.id === id);
    setCurrentAlbum(selectedAlbum);
  };

  /**
   * Creates a new album
   * @param {Object} data - album form data
   */
  const addAlbumHandle = async (data) => {
    // adding document to the firestore
    const docRef = await addDoc(collection(db, "photo-pholio"), {
      title: data.title,
      timestamp: new Date(),
    });
    setAlbums([{ ...data, id: docRef.id }, ...albums]);
    notify(`${data.title} album added successfully!`);
  };

  /**
   * Adds an image to the a;bum
   * @param {Object} imageData - image data object
   */
  const addImageHandle = (imageData) => {
    // generate a unique ID for the new image
    imageData.id = `${Math.floor(
      Math.random() * (999999 - 9) + 9
    )}_${Date.now()}_${currentAlbum.title.split(" ")[0]}_${
      imageData.title.split(" ")[0]
    }`;

    // updating pics array
    const updatedPics = currentAlbum.pics
      ? [imageData, ...currentAlbum.pics]
      : [imageData];

    // updating current album
    const updatedCurrentAlbum = { ...currentAlbum, pics: updatedPics };
    setCurrentAlbum(updatedCurrentAlbum);

    // updating albums
    const updatedAlbums = albums.map((album) =>
      album.id === currentAlbum.id ? updatedCurrentAlbum : album
    );
    setAlbums(updatedAlbums);
    notify(`Image added successfully!`);

    // Adding images to the Firestore document
    const docRef = doc(db, "photo-pholio", currentAlbum.id);
    addPicInDoc(docRef, imageData);
  };

  /**
   * Deletes the image from the pictures array of the current album
   * @param {String} id - image id
   * @returns null if the image is not found
   */
  const deleteImageHandle = (id) => {
    let itemToDelete = null;
    const newAlbums = albums.map((album) => {
      if (album.id === currentAlbum.id) {
        // Find the index of the image to delete
        const imageIndex = album.pics.findIndex((pic) => pic.id === id);

        if (imageIndex !== -1) {
          itemToDelete = album.pics[imageIndex];
          album.pics = [
            ...album.pics.slice(0, imageIndex),
            ...album.pics.slice(imageIndex + 1),
          ];
        }
      }
      return album;
    });

    // updating the current album
    const updatedCurrentAlbum = newAlbums.find(
      (album) => album.id === currentAlbum.id
    );
    setCurrentAlbum(updatedCurrentAlbum);

    if (!itemToDelete) {
      console.error("Image not found, cannot delete.");
      return;
    }

    // Update state with the new albums array
    setAlbums(newAlbums);
    notify(`Image deleted successfully!`);

    // Delete the image from Firestore
    const docRef = doc(db, "photo-pholio", currentAlbum.id);
    deletePicInDoc(docRef, itemToDelete);
  };

  /**
   * Handle to manage image editing
   * @param {String} id - image id
   * @param {Object} newImageData - updated data of the selected image
   */
  const editImageHandle = (id, newImageData) => {
    const instanceOfCurrentAlbum = currentAlbum;

    // updating the pics array
    const newUpdatedAlbumPics = currentAlbum.pics.map((item) => {
      if (item.id === id) {
        item.title = newImageData.title;
        item.url = newImageData.url;
      }
      return item;
    });

    instanceOfCurrentAlbum.pics = newUpdatedAlbumPics;

    // updating the albums
    const updatedAlbums = albums.map((album) => {
      if (album.id === instanceOfCurrentAlbum.id) {
        album = instanceOfCurrentAlbum;
      }
      return album;
    });
    setAlbums(updatedAlbums);
    notify(`Image updated successfully!`);

    // update doc in firestore
    const docRef = doc(db, "photo-pholio", currentAlbum.id);
    updateDocument(docRef, instanceOfCurrentAlbum);
  };

  return (
    <div>
      <Navbar />
      <ToastContainer theme="dark" />
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
