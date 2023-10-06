import { Router } from 'express';
import { multerMiddleware, uploadImgCloudinary } from './uploadImage.js';

export const router = new Router();
router.post('/upload', multerMiddleware, uploadImgCloudinary);
