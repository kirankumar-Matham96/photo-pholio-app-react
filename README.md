# Photo-Pholio

An image organizing app simulates album. Can add albums and add, edit and delete images in the albums. Can view the image by just clicking on them. Built with react and firestore.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Known Issues & Improvements](#known-issues-&-improvements)
- [Contributing](#contributing)
- [License](#license)

## Features

- Can view the list of albums.
  - Main screen with the albums list.
  - Every item is an album, which contains set of images.
- Adding album:
  - By clicking the add album button the the top right position, a form will be displayed.
  - By adding a title, you can create a new album.
- Album:
  - On clicking any album will open the album and displays the list of images init.
  - On clicking the image, the image will be shown.
  - Next and Previous buttons will be helpful for viewing the images in the album.
  - Close button at the right top corner will help to close the image.
- Adding an image to the album:
  - By clicking the add album button in the album, a form to add an image will be displayed.
  - By providing the title and the url of the image, it will add the image to the album.
- Edit and Delete Image:
  - On hovering the image tile, edit and delete options will be revealed.
  - On clicking the delete button, the image will be deleted.
  - On clicking the edit button, the form will be populated with that image data to be edited.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kirankumar-Matham96/photo-pholio-app-react.git

   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the app: ([see React Docs for more scripts](#react-readme-file))

```bash
  npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Technologies Used

- ReactJS
- react-dom
- react-scripts
- styled-components
- firebase

## React Reference

- [ReadMe.md](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/README.md)

## Known Issues & Improvements

- Issues:

  - When an image or album is added or deleted, the UI is rendering a bit later. Adding the state manipulation also not helped it.
  - Even though utilizing the live data rendering from the firestore, the data in the albums is not updated until reload the page or close and open the album, when the app opened in multiple windows.

- Improvements:

  - Edit and delete options can be implemented for the albums.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
