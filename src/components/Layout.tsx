import Head from "next/head";
import { NextPage } from 'next'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { supabase } from "src/service/supabase/connections";
import { useRecoilValue } from 'recoil'
import { loginUserState } from 'src/service/recoil/loginuser'

type Props = {
  children?: React.ReactNode;
  home?: boolean;
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Layout: NextPage<Props> = ({ children, home }: Props) => {

  const siteTitle: string = "Supabase Hans-on App";
  const classes = useStyles();
  const loginUser = useRecoilValue(loginUserState)

  const logoutHandler = () => {
    supabase.auth.signOut()
  }

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {siteTitle}
          </Typography>
          {loginUser && (
            <Button
              color="inherit"
              onClick={logoutHandler}
            >Logout</Button>
          )}
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
}

export default Layout;