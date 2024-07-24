import { Tile } from "../Tile";
import albumContainerStyles from "./index.module.css";
export const AlbumContainer = ({ albums, albumTileClickHandle }) => {
  
  return (
    <div className={albumContainerStyles.bgContainer}>
      {albums.map((album) => (
        <Tile
          key={album.id}
          album={album}
          click={() => albumTileClickHandle(album.id)}
        />
      ))}
    </div>
  );
};
