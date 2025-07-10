import { Router } from 'express';
import { chatController } from '../controllers/chat.js';

const router = Router();

router.get('', (req, res) => res.render('chat'));
router.post('', chatController);

export default router;