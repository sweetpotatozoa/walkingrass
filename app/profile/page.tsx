export default function Profile() {
  return (
    <>
      <div
        className="text-white w-full min-h-screen px-4 py-10 flex-col"
        style={{
          backgroundImage: 'url(profile_bg.png)',
          backgroundSize: 'cover', // 배경 이미지가 요소 크기에 맞춰서 잘리지 않게 확대
        }}
      >
        <div className="w-full flex flex-col">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold mb-4">내가 모은 도토리</h1>
            <p className="text-base">지금까지 내가 모은 모든 도토리에요!</p>
          </div>
          <div></div>
          <div className="w-full flex flex-col justify-center items-center">
            <img src="my_today_dotori.svg"></img>
            <div className="text-4xl my-4">X 90개</div>
            <p>90개나 되는 오늘의 도토리를 모으셨군요! 엄청나요</p>
          </div>
          <div className="w-full flex flex-row justify-between items-center px-8 mt-10">
            <div className="flex flex-col justify-center items-center">
              <img src="dotori.png" className="mb-4"></img>
              <div className="text-xl">10 개</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src="dotori.png" className="mb-4"></img>
              <div className="text-xl">10 개</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src="dotori.png" className="mb-4"></img>
              <div className="text-xl">10 개</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img src="dotori.png" className="mb-4"></img>
              <div className="text-xl">10 개</div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col mt-8 mb-32">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold pb-4 border-b-2">
              나의 기록들
            </h1>
            <div className="flex flex-col">
              <div className="flex justify-between items-center px-4 pb-4 border-b-2 mt-4">
                <div className="text-xl font-semibold">2021-09-01</div>
                <div className="text-xl">보러가기</div>
              </div>
              <div className="flex justify-between items-center px-4 pb-4 border-b-2 mt-4">
                <div className="text-xl font-semibold">2021-09-01</div>
                <div className="text-xl">보러가기</div>
              </div>
              <div className="flex justify-between items-center px-4 pb-4 border-b-2 mt-4">
                <div className="text-xl font-semibold">2021-09-01</div>
                <div className="text-xl">보러가기</div>
              </div>
              <div className="flex justify-between items-center px-4 pb-4 border-b-2 mt-4">
                <div className="text-xl font-semibold">2021-09-01</div>
                <div className="text-xl">보러가기</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
