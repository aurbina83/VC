import * as express from 'express';
import { controller } from './controller';
import { Event } from './model';
import * as jwt from 'express-jwt';

// "loose coupling"

const ctrl = controller(Event);
const router = express.Router();
const auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});

// Base Route == /api/v1/events

//GET: /api/v1/events
router.get('/', ctrl.getAll);

//GET: /api/v1/events/:id
router.get('/:id', ctrl.findOne);

//DELETE: /api/v1/events/:id
router.delete('/:id', auth, ctrl.remove);

//POST: /api/v1/events
router.post('/', auth, ctrl.create);

export = router;
