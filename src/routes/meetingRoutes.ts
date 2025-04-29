import { Router } from 'express';
import { createMeeting, getMeetings, inviteUser } from '../controllers/meetingController';

const router = Router();

router.post('/meetings', createMeeting);
router.get('/meetings', getMeetings);
router.post('/invite/:userId', inviteUser);

export default router;
