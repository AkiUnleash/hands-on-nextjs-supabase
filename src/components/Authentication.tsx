import { NextPage } from 'next';
import { ReactNode, useEffect } from 'react';
import { supabase } from 'src/service/supabase/connections';
import { useSetRecoilState } from 'recoil';
import { loginUserState } from 'src/service/recoil/loginuser';
import router from 'next/router';

/**
 * 型宣言
 */
type Props = {
  children: ReactNode;
};

/**
 * 認証をチェックするためのコンポーネント
 * @param  children
 * @returns コンポーネント
 */
const Authentication: NextPage<Props> = ({ children }) => {
  const setLoginUser = useSetRecoilState(loginUserState);

  useEffect(() => {
    var unmounted = false;
    const f = async () => {
      if (!unmounted) {
        supabase.auth.onAuthStateChange(async (event, session) => {
          switch (event) {
            case 'SIGNED_IN':
              const { data } = await supabase
                .from('profile')
                .select('name')
                .match({ id: session.user.id });

              if (!data || data.length === 0) {
                setLoginUser({
                  id: session.user.id,
                  name: '',
                });
                router.push('/profile');
              } else {
                setLoginUser({
                  id: session.user.id,
                  name: data[0].name,
                });
                router.push('/home');
              }
              break;
            case 'SIGNED_OUT':
              setLoginUser(null);
              router.push('/');
              break;
          }
        });
      }
    };
    f();
    const cleanUp = () => {
      unmounted = true;
    };
    return cleanUp;
  }, []);

  return <>{children}</>;
};

export default Authentication;
