import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import Layout from 'src/components/Layout'
import { Container, CssBaseline, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "src/service/theme/theme";
import { supabase } from 'src/service/supabase/connections'
import { useRecoilValue } from 'recoil';
import { loginUserState } from 'src/service/recoil/loginuser'
import DiaryInput from "src/components/DiaryInput";
import TimeLineArea from "src/components/TimeLineArea";
import { diary } from "src/type/model";

const Index: NextPage = () => {

  const loginUser = useRecoilValue(loginUserState)
  const [sentence, setSentence] = useState("")
  const [timeline, setTimeline] = useState<diary[]>([])

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

            <DiaryInput
              handleSubmit={handleSubmit}
              sentence={sentence}
              setSentence={setSentence}
            />

            <TimeLineArea
              timeline={timeline}
            />

          </Box>
        </Container>
      </Layout >
    </ThemeProvider >
  );
};

export default Index;