import * as express from 'express';
import { controller } from './controller';
import { User } from './model';

const router = express.Router();
const ctrl = controller(User);
const passport = require('passport');

//Base Url-- /api/v1/users

//POST /api/v1/users/login
router.post('/login', ctrl.login);

//POST /api/v1/users/register
router.post('/register', ctrl.register);

//PUT /api/v1/users/:id
router.put('/:id', ctrl.update);

export = router;
