// app/page.tsx (서버 컴포넌트)
import { getPost, getUserId } from 'app/actions/mainActions.ts' // 서버 액션 불러오기
import Mainpage from './Mainpage' // 클라이언트 컴포넌트 불러오기

export default async function MainPage() {
  const postList = await getPost() // 서버 액션을 호출하여 데이터를 가져옴
  const userdata = await getUserId(1)

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <Mainpage postList={postList} userdata={userdata} />
      {/* 클라이언트 컴포넌트에 데이터 전달 */}
    </div>
  )
}
