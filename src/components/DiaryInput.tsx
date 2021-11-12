import type { NextPage } from 'next';
import { Box, Button, TextField } from '@mui/material';
import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';
import imageProfile from 'src/assets/images/profile.svg';
import theme from 'src/service/mui/theme';
import { Dispatch, SetStateAction } from 'react';

/**
 * 型宣言
 */
type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  sentence: string;
  setSentence: Dispatch<SetStateAction<string>>;
};

/**
 * スタイルシート
 */
const useStyles = makeStyles((theme) => ({
  textboxTweet: {
    marginLeft: theme.spacing(1),
    width: '100%',
  },
  buttonRegister: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    paddingLeft: 16,
    paddingRight: 16,
    width: 96,
    marginLeft: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#aaa',
    },
  },
}));

/**
 * 認証をチェックするためのコンポーネント
 * @param  handleSubmit 投稿の処理
 * @param  sentence 投稿文章の文字列
 * @param  setSentence 投稿文書を一時保存するためのuseState
 * @returns コンポーネント
 */
const DiaryInput: NextPage<Props> = ({ handleSubmit, sentence, setSentence }) => {
  const classes = useStyles();

  return (
    <>
      <Box
        component='form'
        onSubmit={handleSubmit}
        noValidate
        sx={{
          width: 512,
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'center',
          marginTop: theme.spacing(6),
        }}
      >
        <Image src={imageProfile} alt={'Profile icon'} width={64} height={64} />
        <TextField
          required
          autoFocus
          placeholder={'今のキモチを投稿しよう。'}
          className={classes.textboxTweet}
          value={sentence}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSentence(e.target.value)}
        />
        <Button type='submit' className={classes.buttonRegister}>
          投稿
        </Button>
      </Box>
    </>
  );
};

export default DiaryInput;
