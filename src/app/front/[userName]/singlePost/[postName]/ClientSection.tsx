'use client'
export interface ObjType{
  userName: string,
  post: string,
  id: string,
  time: string,
  imgUrl: string
}
export default  function ClientSection({obj}:{obj:ObjType}) {
  return <div>

<p>id:{obj.id}</p>
<p>img Url: {obj.imgUrl}</p>
<p>postName: {obj.post}</p>
<p>time: {obj.time}</p>
<p>username: {obj.userName}</p>
  </div>
}