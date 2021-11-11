import { NextPage } from 'next'
import { ReactNode, useEffect } from 'react'
import { supabase } from 'src/service/supabase/connections'
import { useSetRecoilState } from 'recoil'
import { loginUserState } from 'src/service/recoil/loginuser'
import router from 'next/router'

type Props = {
  children: ReactNode
}

/**
 * 認証をチェックするためのコンポーネント
 * @param  children
 * @returns Components
 */
const Authentication: NextPage<Props> = ({ children }) => {

  const setLoginUser = useSetRecoilState(loginUserState)

  useEffect(() => {
    var unmounted = false
    const f = async () => {
      if (!unmounted) {
        supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN') {
            console.log(event, session);
            setLoginUser({
              id: session.user.id,
              name: ''
            })
            router.push("/profile")
          }
        })
      }
    }
    f()
    const cleanUp = () => { unmounted = true }
    return cleanUp
  }, [])

  return (<>{children}</>)
}

export default Authentication
