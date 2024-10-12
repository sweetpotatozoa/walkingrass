// app/page.tsx (서버 컴포넌트)
import { getPost, getUserId } from './actions/mainActions'
import Mainpage from './Mainpage'

export default async function MainPage() {
  const postList = await getPost()
  const userdata = await getUserId(3)

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <Mainpage postList={postList} userdata={userdata!} />
    </div>
  )
}
