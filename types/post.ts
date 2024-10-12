export interface Post {
    id: number
    user_id: number
    event_photo: string
    landscape_photo: string
    created_at: Date
    user: User // 게시글의 작성자
    likes: number // post_id가 일치하는 좋아요 수
    cutes: number // post_id가 일치하는 귀여워요 수
    surprises: number // post_id가 일치하는 놀라워요 수
    awesomes: number // post_id가 일치하는 최고예요 수
  }
  
  export interface User {
    id: number
    username: string
    phone: string
    created_at: Date
    updated_at: Date
  }
  
  export interface Like {
    id: number
    user_id: number
    post_id: number
  }
  
  export interface Cute {
    id: number
    user_id: number
    post_id: number
  }
  
  export interface Surprise {
    id: number
    user_id: number
    post_id: number
  }
  
  export interface Awesome {
    id: number
    user_id: number
    post_id: number
  }
  