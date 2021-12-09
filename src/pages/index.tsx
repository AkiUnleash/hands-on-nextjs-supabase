import type { NextPage } from 'next';
import Layout from 'src/components/Layout';
import { Container, Box, CssBaseline, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import imageKey from 'src/assets/images/key.svg';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'src/service/mui/theme';
import Heading from 'src/components/Heading';
import { supabase } from 'src/service/supabase/connections';
import { useStyles } from 'src/assets/styles/stylesComponents';

/**
 * トップ画面
 * @returns コンポーネント
 */
const Index: NextPage = () => {
  const classes = useStyles();

  const handleClick = async () => {
    // // ５．Github ログインの作成 - Github ログイン処理
    // await supabase.auth.signIn({ provider: 'github' });
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
            <Heading imageSrc={imageKey} imageAlt={'Key icon.'} subject={'ログイン認証'} />
            <Button
              startIcon={<GitHubIcon />}
              className={classes.buttonGithub}
              onClick={handleClick}
            >
              Sign in with Github!
            </Button>
          </Box>
        </Container>
      </Layout>
    </ThemeProvider>
  );
};

export default Index;
