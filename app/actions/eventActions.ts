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
          user_id: true, // participants의 id 값만 가져옴
        },
      },
      winners: {
        select: {
          user_id: true, // winners의 id 값만 가져옴
        },
      },
    },
  })

  if (!event) return null

  return {
    ...event,
    participants: event.participants.map((p: { user_id: number }) => p.user_id), // Participant 타입 명시
    winners: event.winners.map((w: { user_id: number }) => w.user_id), // Winner 타입 명시
  }
}
