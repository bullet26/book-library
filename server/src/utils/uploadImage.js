import { v2 as cloudinary } from 'cloudinary';
import { multer } from 'multer';
import { runMiddleware } from './midleware.js';

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('bookCover');

async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: 'auto',
    });
    return res;
}

export const uploadImgCloudinary = async (req, res) => {
    try {
        await runMiddleware(req, res, multerUploads);
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
        const cldRes = await handleUpload(dataURI);
        res.json(cldRes);
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message,
        });
    }
};
