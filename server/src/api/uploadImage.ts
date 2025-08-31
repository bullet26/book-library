import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { Request, Response } from 'express';

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

const storage = multer.memoryStorage();
export const multerMiddleware = multer({ storage }).single('file');

async function cloudinaryUpload(file: string) {
    const res = await cloudinary.uploader.upload(file, {
        folder: 'books',
        resource_type: 'auto',
    });

    const { url } = res;
    return url;
}

export const uploadImgCloudinary = async (req: MulterRequest, res: Response) => {
    try {
        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

            const image = await cloudinaryUpload(dataURI);
            return res.status(200).json({
                message: 'image has been uploaded successfully to cloudinary',
                data: {
                    image,
                },
            });
        } else {
            res.status(404).json('couldn`t get image');
        }
    } catch (error: any) {
        res.status(500).json(error?.message || 'couldn`t upload image to cloudinary');
    }
};
