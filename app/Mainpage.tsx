'use client'

// 타입 정의
type User = {
  id: number
  username: string
  phone: string
  created_at: string
  updated_at: string
  posts: Post[]
  likes: Like[]
  cutes: Cute[]
  surprises: Surprise[]
  awesomes: Awesome[]
}

type Post = {
  id: number
  user_id: number
  event_photo: string
  landscape_photo: string
  created_at: Date
  user: User
  likes: Like[]
  cutes: Cute[]
  surprises: Surprise[]
  awesomes: Awesome[]
}

type Like = {
  id: number
  user_id: number
  post_id: number
  created_at: Date
}

type Cute = {
  id: number
  user_id: number
  post_id: number
  created_at: Date
}

type Surprise = {
  id: number
  user_id: number
  post_id: number
  created_at: Date
}

type Awesome = {
  id: number
  user_id: number
  post_id: number
  created_at: Date
}

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
      // 이 데이터를 이용해 UI 업데이트 가능 (예: 좋아요 수 갱신)
    } catch (error) {
      console.error('Error updating reaction:', error)
    }
  }

  return (
    <div className="min-h-screen">
      {/* 유저 데이터 출력 */}
      {userdata ? (
        <div>
          <p>Logged in as: {userdata.username}</p>
          <p>Phone: {userdata.phone}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      {postList.map((post: Post, index: number) => (
        <div
          key={index}
          className="min-h-screen flex flex-row overflow-x-auto relative text-white"
        >
          {/* Buttons */}
          <div className="text-xs absolute flex flex-col bottom-16 right-4 justify-center items-center">
            <button
              className="bg-transparent rounded m-2 w-[40px] h-[40px]"
              onClick={() => handleReaction(post.id, 'Like')}
            >
              <img src="/images/dotori-icon.png" alt="Likes" />
            </button>
            <p>좋아요 : {post.likes.length || 0}</p>

            <button
              className="bg-transparent rounded m-2 w-[40px] h-[40px]"
              onClick={() => handleReaction(post.id, 'Cute')}
            >
              <img src="/images/mushroom.png" alt="Cute" />
            </button>
            <p>귀여워요 : {post.cutes.length || 0}</p>

            <button
              className="bg-transparent rounded m-2 w-[40px] h-[40px]"
              onClick={() => handleReaction(post.id, 'Surprise')}
            >
              <img src="/images/leaf.png" alt="Surprise" />
            </button>
            <p>놀라워요 : {post.surprises.length || 0}</p>

            <button
              className="bg-transparent rounded m-2 w-[40px] h-[40px]"
              onClick={() => handleReaction(post.id, 'Awesome')}
            >
              <img src="/images/pretzel.png" alt="Awesome" />
            </button>
            <p>최고예요 : {post.awesomes.length || 0}</p>
          </div>

          {/* landscape_photo */}
          <div className="w-[430px] h-[932px] bg-gray-200 flex-shrink-0">
            <img
              src={post.landscape_photo}
              alt="Landscape"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* event_photo */}
          <div className="w-[430px] h-[932px] bg-gray-200 flex-shrink-0">
            <img
              src={post.event_photo}
              alt="Event"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
