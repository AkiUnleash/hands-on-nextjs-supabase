import type { NextPage } from "next";
import Image from 'next/image'
import Layout from 'src/components/Layout'
import imageKey from 'src/assets/images/key.png'
import { Button, CssBaseline, Grid, Typography } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "@mui/material/styles";
import theme from "src/service/theme/theme";

// スタイルシートの指定
const useStyles = makeStyles((theme) => ({
  iconImage: {
    marginTop: theme.spacing(10),
  },
  subject: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  github: {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Grid
          container
          direction="column"
          alignItems="center" >

          <Grid className={classes.iconImage}>
            <Image
              src={imageKey}
              alt="Key icon." />
          </Grid>

          <Grid>
            <Typography className={classes.subject}>
              ログイン認証
            </Typography>
          </Grid>

          <Grid>
            <Button
              startIcon={<GitHubIcon />}
              className={classes.github}
            >Sign in with Github</Button>
          </Grid>

        </Grid>
      </Layout >
    </ThemeProvider>
  );
};

export default Index;