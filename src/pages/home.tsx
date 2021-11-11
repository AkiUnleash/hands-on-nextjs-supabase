import type { NextPage } from "next";
import Image from 'next/image'
import { useCallback, useEffect, useState, memo } from "react";
import Layout from 'src/components/Layout'
import { Container, CssBaseline, Box, Button, TextField } from "@mui/material";
import imageProfile from 'src/assets/images/profile.svg'
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "@mui/material/styles";
import theme from "src/service/theme/theme";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { supabase } from 'src/service/supabase/connections'
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'src/service/recoil/loginuser'
import { conversionDate } from "src/utils/dataFormat";

// スタイルシートの指定
const useStyles = makeStyles((theme) => ({
  textboxTweet: {
    marginLeft: theme.spacing(1),
    width: '100%'
  },
  buttonRegister: {
    fontSize: 18,
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
    paddingLeft: 16,
    paddingRight: 16,
    width: 96,
    marginLeft: theme.spacing(1),
    "&:hover": {
      backgroundColor: '#aaa'
    }
  },
}));

const Index: NextPage = () => {

  const classes = useStyles();
  const loginUser = useRecoilValue(loginUserState)
  const [sentence, setSentence] = useState("")
  const [timeline, setTimeline] = useState([])

  const registerDiary = async () => {
    const { error } = await supabase
      .from('diary')
      .insert([{
        profile_id: loginUser.id,
        sentence: sentence
      }])
    error && console.error(error)
    setSentence('')
  }

  const readDiary = useCallback(async () => {
    const { data } = await supabase
      .from('diary')
      .select(`sentence,
            created_at,
            profile (
              name
            )
            `)
      .order('created_at', { ascending: false })

    setTimeline(data)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    await registerDiary()
    await readDiary()
  }

  useEffect(() => {
    let isUnmount = false;
    (async () => {
      try {
        if (!isUnmount) {
          await readDiary()
        }
      } catch (e) {
        console.error(e);
      }
    })();
    return () => { isUnmount = true }
  }, [])

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
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{
              width: 512,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyItems: 'center',
              marginTop: theme.spacing(6),
            }}
            >
              <Image
                src={imageProfile}
                alt={"Profile icon"}
                width={64}
                height={64}
              />
              <TextField
                required
                autoFocus
                placeholder={"今のキモチを投稿しよう。"}
                className={classes.textboxTweet}
                value={sentence}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSentence(e.target.value)}
              />
              <Button
                type="submit"
                className={classes.buttonRegister}
              >
                投稿
              </Button>
            </Box>

            <Timeline position="alternate">
              {timeline && (
                timeline.map((t, index) => {
                  return (
                    <TimelineItem>
                      <TimelineOppositeContent
                        sx={{
                          m: 'auto 0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: index % 2 === 1 ? 'flex-start' : 'flex-end'
                        }}
                        variant="body2"
                        color="text.secondary"
                      >
                        {conversionDate(t.created_at)}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot>
                          <AccountCircleIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ width: 512 }}>
                        <Typography variant="h6" component="span">
                          {t.sentence}
                        </Typography>
                        <Typography>{t.profile.name}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                  )
                })
              )}
            </Timeline>
          </Box>
        </Container>
      </Layout >
    </ThemeProvider >
  );
};

export default Index;