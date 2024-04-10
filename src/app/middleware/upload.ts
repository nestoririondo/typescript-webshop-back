import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory

export const multerMemoryStorage = multer({ storage }); // we pass an object with the storage key set to the storage engine
