import multer from 'multer';
import cloudinary from '../../db/cloudinary';

const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string,
) => {
  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        error ? reject(error) : resolve(result?.url || '');
      },
    );
    uploadStream.end(file.buffer);
  });
};
