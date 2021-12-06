import { makeStyles } from '@material-ui/core/styles';

/**
 * スタイルシート
 */
export const useStyles = makeStyles((theme) => ({
  buttonGithub: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#212121',
    paddingLeft: 16,
    paddingRight: 16,
    textTransform: 'none',
    marginTop: theme.spacing(8),
    '&:hover': {
      backgroundColor: '#aaa',
    },
  },
  textboxName: {
    marginTop: theme.spacing(6),
  },
  buttonRegister: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: theme.spacing(4),
    '&:hover': {
      backgroundColor: '#90caf9',
    },
    '&.Mui-disabled': {
      backgroundColor: '#bdbdbd',
    },
  },
}));
