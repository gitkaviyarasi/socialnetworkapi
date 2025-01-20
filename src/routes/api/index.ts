import { Router } from 'express';
import { UserRouter } from './userRoutes.js';
import { ThoughtRouter } from './thoughtRoutes.js';

const router = Router();

router.use('/users', UserRouter);
router.use('/thoughts', ThoughtRouter);

export default router;