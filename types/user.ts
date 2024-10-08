export interface PostWithDate {
  id: number
  created_at: Date
}

export interface UserProfileWithTotalsAndDates {
  id: number
  username: string
  posts: PostWithDate[] | null
  totalLikes: number | null
  totalCutes: number | null
  totalSurprises: number | null
  totalAwesomes: number | null
  eventParticipationCount: number | null // 유저가 참여한 이벤트 개수
}
