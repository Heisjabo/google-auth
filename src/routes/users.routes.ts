import { Router, Request, Response } from 'express';
import { getUserById, getUsers, registerUser, updateUserById } from '../controllers/userController';
import upload from '../middlewares/multer';
const router = Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.patch('/:id', upload.single("profileImage"), updateUserById)
router.post('/', upload.single("profileImage"), registerUser);

export default router;