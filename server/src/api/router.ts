import { Router } from 'express';
import { multerMiddleware, uploadImgCloudinary } from './uploadImage';

export const router = Router();
router.post('/upload', multerMiddleware, uploadImgCloudinary);
