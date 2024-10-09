import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};


const avatarUploadDir = path.join(__dirname, '../uploads/avatar');
const postImagesUploadDir = path.join(__dirname, '../uploads/postimages');


createFolderIfNotExists(avatarUploadDir);
createFolderIfNotExists(postImagesUploadDir);


const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarUploadDir); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const postImagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, postImagesUploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadAvatar = multer({ storage: avatarStorage });
const uploadPostImages = multer({ storage: postImagesStorage });

// File deletion function
const deleteFile = (filePath, folder) => {
  const fullPath = path.join(__dirname, `../uploads/${folder}`, filePath);
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      console.log('File deleted successfully');
    }
  });
};


export { uploadAvatar, uploadPostImages, deleteFile };
