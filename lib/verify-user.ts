import { currentUser } from '@clerk/nextjs/server';
import db from './prisma';

export async function verifyUser() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name,
        imageUrl: user.imageUrl,
      },
    });

    return newUser;
  } catch (error: any) {
    console.log('[VERIFY USER ERROR]', error.message);
  }
}
