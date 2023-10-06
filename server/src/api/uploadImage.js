import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

const storage = multer.memoryStorage();
export const multerMiddleware = multer({ storage }).single('bookCover');

async function cloudinaryUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: 'auto',
    });

    const { url } = res;
    return url;
}

export const uploadImgCloudinary = async (req, res) => {
    try {
        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

            const image = await cloudinaryUpload(dataURI);
            return res.status(200).json({
                messge: 'image has been uploded successfully to cloudinary',
                data: {
                    image,
                },
            });
        } else {
            res.status(404).json('couldn`t get image');
        }
    } catch (error) {
        res.status(500).json(error?.message || 'couldn`t upload image to cloudinary');
    }
};
