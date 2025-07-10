import { Router } from 'express';
import { selectCodebase } from '../controllers/codebase.js';

const router = Router();

router.get('', (req, res) => res.render('codebase'));
router.post('', selectCodebase);

export default router;