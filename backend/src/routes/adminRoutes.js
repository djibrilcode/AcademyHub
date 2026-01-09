import express from 'express';
import { createUserByAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.post(
    '/users/create',
    createUserByAdmin
);

export default router;
