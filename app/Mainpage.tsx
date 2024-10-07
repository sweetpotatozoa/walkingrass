'use client'

// Post와 하위 타입 정의
type Post = {
  id: number
  user_id: number
  event_photo: string
  landscape_photo: string
  created_at: Date
  Awesome: any[]
  Cute: any[]
  Like: any[]
  Surprise: any[]
  user: any
}

export default function SwipeableComponent({ postList }: { postList: Post[] }) {
  return (
    <div className="min-h-screen">
      {postList.map((post: Post, index: number) => (
        <div
          key={index}
          className="min-h-screen flex flex-row overflow-x-auto relative text-white"
        >
          {/* Buttons */}
          <div className="text-xs absolute flex flex-col bottom-16 right-4 justify-center items-center">
            <button className="bg-transparent rounded m-2 w-[40px] h-[40px]">
              <img src="/images/dotori-icon.png" alt="Likes" />
            </button>
            <p>좋아요 : {post.Like.length || 0}</p>
            <button className="bg-transparent rounded m-2 w-[40px] h-[40px]">
              <img src="/images/mushroom.png" alt="Likes" />
            </button>
            <p>귀여워요 : {post.Cute.length || 0}</p>
            <button className="bg-transparent rounded m-2 w-[40px] h-[40px]">
              <img src="/images/leaf.png" alt="Likes" />
            </button>
            <p>놀라워요 : {post.Surprise.length || 0}</p>
            <button className="bg-transparent rounded m-2 w-[40px] h-[40px]">
              <img src="/images/pretzel.png" alt="Likes" />
            </button>
            <p>최고예요 : {post.Awesome.length || 0}</p>
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
