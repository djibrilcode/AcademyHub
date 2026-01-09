import express from 'express';
import { getComment, getComments, createComment, updateComment, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

router.get('/', getComments);
router.post('/', createComment);
router.get('/:id', getComments);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;