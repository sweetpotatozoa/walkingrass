// actions/getEvent.ts
'use server'
// actions/getLatestEvent.ts
import prisma from '@/lib/prismaClient'
import type { EventWithParticipantsAndWinners } from '@/types/event' // types에서 타입을 가져옴

export async function getLatestEvent(): Promise<EventWithParticipantsAndWinners | null> {
  const event = await prisma.event.findFirst({
    orderBy: {
      created_at: 'desc',
    },
    include: {
      participants: {
        select: {
          id: true, // participants의 id 값만 가져옴
        },
      },
      winners: {
        select: {
          id: true, // winners의 id 값만 가져옴
        },
      },
    },
  })

  if (!event) return null

  return {
    ...event,
    participants: event.participants.map((p) => p.id),
    winners: event.winners.map((w) => w.id),
  }
}
