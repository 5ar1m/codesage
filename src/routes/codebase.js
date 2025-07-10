import { Router } from 'express';
import { selectCodebase } from '../controllers/selectCodebase.js';

const router = Router();

router.get('', (req, res) => res.render('codebase'));
router.post('', selectCodebase)

export default router;