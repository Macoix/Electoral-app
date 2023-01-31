import multer from 'multer';

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('png') ||
    file.mimetype.includes('jpg') ||
    file.mimetype.includes('jpeg')
  ) {
    cb(null, true);
  } else {
    cb('Please upload only img file.', false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/server/public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

var uploadImg = multer({ storage: storage, fileFilter: imageFilter });

export default uploadImg;
