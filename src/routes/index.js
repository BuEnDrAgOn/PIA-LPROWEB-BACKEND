import { Router } from 'express';

import categories from './categories.routes.js';
import consoles from './consoles.routes.js';
import fqa from './fqa.routes.js';
import games from './games.routes.js';
import users from './users.routes.js';

const router = Router();

router.use('/categories', categories)
router.use('/consoles', consoles)
router.use('/fqa', fqa)
router.use('/games', games)
router.use('/users', users)
