import { Router } from 'express';

import categories from './categories.routes.js';
import consoles from './consoles.routes.js';
import faq from './faq.routes.js';
import games from './games.routes.js';
import users from './users.routes.js';
import report from './report.routes.js'

const router = Router();

router.use('/categories', categories)
router.use('/consoles', consoles)
router.use('/faq', faq)
router.use('/games', games)
router.use('/users', users)
router.use('/report', report)

export default router
