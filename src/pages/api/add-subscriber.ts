// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Subscriber } from '@prisma/client';
import { prisma } from '../../db/client';

interface Error {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Subscriber | Error>
) {
  const { email } = req.body;

  try {
    const userAlreadyRegistered = await prisma.subscriber.findFirst({
      where: { email },
    });

    if (!email || typeof email !== 'string')
      return res.status(400).json({ message: 'Email is required!' });

    if (userAlreadyRegistered)
      return res.status(409).json({ message: 'User already registered!' });

    const newSubscriber = await prisma.subscriber.create({ data: { email } });

    return res.status(200).json(newSubscriber);
  } catch (error) {
    return res.status(500).json(error as Error);
  }
}
