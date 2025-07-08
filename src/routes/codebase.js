import { Router } from 'express';
import { addCodebase } from '../controllers/codebase.js';

const router = Router();

router.get('all', () => {});
router.get('', (req, res) => res.render('codebase'));
router.post('', addCodebase);

export default router;