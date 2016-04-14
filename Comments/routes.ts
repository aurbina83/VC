import * as express from 'express';
import { Event } from '../Events/model';
import { Comment } from './model';
import { controller } from './controller';
import * as jwt from 'express-jwt';

const router = express.Router();
const ctrl = controller(Comment, Event);
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

// Base route -- /api/v1/comments

// POST: /api/v1/comments
router.post('/', auth, ctrl.create);

// DELETE: /api/v1/comments/:id
router.delete('/:id', auth, ctrl.remove);

router.put('/:id', auth, ctrl.update);

export = router;
