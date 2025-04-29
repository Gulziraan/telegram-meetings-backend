import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createMeeting = async (req: Request, res: Response) => {
  const { title, date, organizer } = req.body;
  try {
    const meeting = await prisma.meeting.create({
      data: { title, date: new Date(date), organizer },
    });
    res.json(meeting);
  } catch (error) {
    res.status(500).json({ error: 'Error creating meeting' });
  }
};

export const getMeetings = async (req: Request, res: Response) => {
  try {
    const meetings = await prisma.meeting.findMany({ include: { participants: true } });
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching meetings' });
  }
};

export const inviteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { meetingId } = req.body;
  try {
    const updatedMeeting = await prisma.meeting.update({
      where: { id: Number(meetingId) },
      data: {
        participants: {
          connect: { id: Number(userId) },
        },
      },
      include: { participants: true }
    });
    res.json(updatedMeeting);
  } catch (error) {
    res.status(500).json({ error: 'Error inviting user' });
  }
};
