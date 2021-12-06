import type { NextPage } from 'next';
import { useState } from 'react';
import Layout from 'src/components/Layout';
import { Container, CssBaseline, Box, Button, TextField } from '@mui/material';
import imageProfile from 'src/assets/images/profile.svg';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'src/service/mui/theme';
import Heading from 'src/components/Heading';
import { supabase } from 'src/service/supabase/connections';
import { useRecoilState } from 'recoil';
import { loginUserState } from 'src/service/recoil/loginuser';
import router from 'next/router';
import { useStyles } from 'src/assets/styles/stylesComponents'

/**
 * プロフィール登録画面
 * @returns コンポーネント
 */
const Profile: NextPage = () => {
  const classes = useStyles();
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const [name, setName] = useState('');

  // プロフィール登録ボタンクリック時の処理
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoginUser({
      id: loginUser.id,
      name: name,
    });

    const { error } = await supabase.from('profile').upsert([
      {
        id: loginUser.id,
        name: name,
      },
    ]);

    error && console.error(error);
    router.push('/home');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Container component='main' maxWidth='xs'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Heading imageSrc={imageProfile} imageAlt={'Key icon.'} subject={'プロフィール登録'} />
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{
                width: 400,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: theme.spacing(6),
              }}
            >
              <TextField
                required
                fullWidth
                id='outlined-required'
                label='ニックネーム'
                value={name}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setName(e.target.value)}
              />
              <Button
                disabled={!name || name.length >= 20}
                type='submit'
                className={classes.buttonRegister}
              >
                登録する
              </Button>
            </Box>
          </Box>
        </Container>
      </Layout>
    </ThemeProvider>
  );
};

export default Profile;
