// app/Mainpage.tsx

'use client'

import { Post, User } from '@/types/post'

export default function Mainpage({
  postList,
  userdata,
}: {
  postList: Post[]
  userdata: User
}) {
  const handleReaction = async (postId: number, reactionType: string) => {
    try {
      const response = await fetch(`/api/reactions/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userdata.id, // 현재 유저 ID
          reactionType: reactionType, // 반응 종류 (Like, Awesome, Cute, Surprise)
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update reaction')
      }

      const updatedPost = await response.json()
      console.log('Updated post:', updatedPost)
    } catch (error) {
      console.error('Error updating reaction:', error)
    }
  }

  return (
    <div className="min-h-screen">
      <div>
        <p>Logged in as: {userdata.username}</p>
        <p>Phone: {userdata.phone}</p>
      </div>

      {postList.map((post: Post, index: number) => (
        <div
          key={index}
          className="min-h-screen flex flex-row overflow-x-auto relative text-white"
        >
          {/* Buttons */}
          <div className="text-xs absolute flex flex-col bottom-16 right-4 justify-center items-center">
            <button
              className="bg-transparent rounded m-2 w-10 h-10"
              onClick={() => handleReaction(post.id, 'Like')}
            >
              <img
                src="/images/dotori-icon.png"
                alt="Likes"
                className="w-full h-full object-contain"
              />
            </button>
            <p>좋아요 : {post.likes || 0}</p>

            <button
              className="bg-transparent rounded m-2 w-10 h-10"
              onClick={() => handleReaction(post.id, 'Cute')}
            >
              <img
                src="/images/mushroom.png"
                alt="Cute"
                className="w-full h-full object-contain"
              />
            </button>
            <p>귀여워요 : {post.cutes || 0}</p>

            <button
              className="bg-transparent rounded m-2 w-10 h-10"
              onClick={() => handleReaction(post.id, 'Surprise')}
            >
              <img
                src="/images/leaf.png"
                alt="Surprise"
                className="w-full h-full object-contain"
              />
            </button>
            <p>놀라워요 : {post.surprises || 0}</p>

            <button
              className="bg-transparent rounded m-2 w-10 h-10"
              onClick={() => handleReaction(post.id, 'Awesome')}
            >
              <img
                src="/images/pretzel.png"
                alt="Awesome"
                className="w-full h-full object-contain"
              />
            </button>
            <p>최고예요 : {post.awesomes || 0}</p>
          </div>

          {/* landscape_photo */}
          <div className="w-[430px] h-[932px] bg-gray-200 flex-shrink-0">
            <img
              src={post.landscape_photo}
              alt="Landscape"
              className="w-full h-full object-cover"
            />
          </div>

          {/* event_photo */}
          <div className="w-[430px] h-[932px] bg-gray-200 flex-shrink-0">
            <img
              src={post.event_photo}
              alt="Event"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
