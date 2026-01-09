import express from 'express'
import { createPost, getPosts, getPost, updatePost, deletePost, togglePost } from '../controllers/postController.js'

const router = express.Router();

router.post('/', createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', togglePost);

export default router;