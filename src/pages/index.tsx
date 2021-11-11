import type { NextPage } from "next";
import Layout from 'src/components/Layout'
import { Container, Box, CssBaseline, Button } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import imageKey from 'src/assets/images/key.png'
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "@mui/material/styles";
import theme from "src/service/theme/theme";
import Heading from 'src/components/Heading'
import { supabase } from 'src/service/supabase/connections'

// スタイルシートの指定
const useStyles = makeStyles((theme) => ({
  buttonGithub: {
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#212121",
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: theme.spacing(8),
    "&:hover": {
      backgroundColor: '#aaa'
    }
  },
}));

const Index: NextPage = () => {

  const classes = useStyles();

  const handleClick = async () => {
    await supabase.auth.signIn({ provider: 'github' })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Heading
              imageSrc={imageKey}
              imageAlt={"Key icon."}
              subject={"ログイン認証"}
            />
            <Button
              startIcon={<GitHubIcon />}
              className={classes.buttonGithub}
              onClick={handleClick}
            >
              Sign in with Github
            </Button>
          </Box>
        </Container>
      </Layout >
    </ThemeProvider>
  );
};

export default Index;