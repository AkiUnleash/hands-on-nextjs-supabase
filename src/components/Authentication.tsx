import { NextPage } from 'next'
import { ReactNode, useEffect } from 'react'
import { supabase } from 'src/service/supabase/connections'

type Props = {
  children: ReactNode
}

/**
 * 認証をチェックするためのコンポーネント
 * @param  children
 * @returns Components
 */
const Authentication: NextPage<Props> = ({ children }) => {

  useEffect(() => {
    var unmounted = false
    const f = async () => {
      if (!unmounted) {
        supabase.auth.onAuthStateChange(async (event, session) => {
          console.log(event, session);
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
