// types/event.ts
import { Event } from '@prisma/client'

export interface EventWithParticipantsAndWinners
  extends Omit<Event, 'participants' | 'winners'> {
  participants: number[] // participants의 ID 배열로 정의
  winners: number[] // winners의 ID 배열로 정의
}
