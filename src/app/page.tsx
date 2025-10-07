'use client'
import Link from "next/link"

export default  function Home() { 

return (<div>

<p className="bg-amber-500 pt20 pb-20 pl-20 pr20 ">welcome to landing page </p>

<Link href={'/login'}>
<button className="bg-red-700 hover:bg-red-400">get started </button>
</Link>


</div>)
}



/*
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react"

export default function HOME() {
  const { data: session, status } = useSession()
  
  // ✅ Set custom token as cookie when session exists
  useEffect(() => {
    if (session?.user?.customToken) {
      console.log('🍪 Setting custom token cookie');
      document.cookie = `custom-token=${session.user.customToken}; path=/; max-age=3600; samesite=lax`;
    }
  }, [session])

  if (status === 'loading') {
    return <p>checking info... </p>
  }

  if (status === 'unauthenticated') {
    return <button className="bg-green-400 hover:bg-amber-50"  
      onClick={() => signIn('google')}
    >sign in </button>
  }

  return (
    <div>

<p className="bg-sky-300 pb-2.5 pt-5" >this is MAIN NEXT.JS page </p>

      <Link href={'/vdo'}>
        <button className="bg-pink-900 hover:bg-amber-50">go to vdo</button>
      </Link>


  <Link href={'/protect2/userOne'}>
        <button className="bg-teal-400 hover:bg-amber-50">upload the img </button>
      </Link>cd


      <p className="bg-yellow-500">{session?.user?.name}</p>
      <p>id: {session?.user?.id}</p>
      <p>img:{session?.user?.image}</p>
      <p>exp : {session?.expires}</p>
      <p>token : {session?.user?.customToken}</p>
      <button onClick={() => signOut()}>log out</button>
    </div>
  )
}
*/