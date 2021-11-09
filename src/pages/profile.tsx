import type { NextPage } from "next";
import Layout from 'src/components/Layout'
import { Container, CssBaseline, Box, Button, TextField } from "@mui/material";
import imageProfile from 'src/assets/images/profile.svg'
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "@mui/material/styles";
import theme from "src/service/theme/theme";
import Heading from 'src/components/Heading'

// スタイルシートの指定
const useStyles = makeStyles((theme) => ({
  textboxName: {
    marginTop: theme.spacing(6),
  },
  buttonRegister: {
    fontSize: 18,
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: theme.spacing(4),
    "&:hover": {
      backgroundColor: '#aaa'
    }
  },
}));

const Index: NextPage = () => {

  const classes = useStyles();

  const handleSubmit = () => {
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
              imageSrc={imageProfile}
              imageAlt={"Key icon."}
              subject={"プロフィール登録"}
            />
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{
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
                id="outlined-required"
                label="ニックネーム"
              />
              <Button
                type="submit"
                className={classes.buttonRegister}
              >
                登録する
              </Button>
            </Box>
          </Box>
        </Container>
      </Layout >
    </ThemeProvider>
  );
};

export default Index;