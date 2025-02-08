import express from 'express';
import userRoutes from './userRoutes';
import eventRoutes from './eventRoutes';
import videoRoutes from './videoRoutes';
import reportRoutes from './reportRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/videos', videoRoutes);
router.use('/reports', reportRoutes);

export default router;
