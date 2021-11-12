import type { NextPage } from 'next';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { conversionDate } from 'src/utils/dataFormat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { diary } from 'src/type/model';

/**
 * 型宣言
 */
type Props = {
  timeline: diary[];
};

/**
 * ホーム画面で使用しているタイムラインのコンポーネント
 * @param  timeline diaryテーブルから取得した配列
 * @returns コンポーネント
 */
const TimeLineArea: NextPage<Props> = ({ timeline }) => {
  return (
    <Timeline position='alternate'>
      {timeline &&
        timeline.map((t, index) => {
          return (
            <TimelineItem key={index}>
              <TimelineOppositeContent
                sx={{
                  m: 'auto 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: index % 2 === 1 ? 'flex-start' : 'flex-end',
                }}
                variant='body2'
                color='text.secondary'
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
                <Typography variant='h5' component='span'>
                  {t.sentence}
                </Typography>
                <Typography variant='body2'>{t.profile.name}</Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
    </Timeline>
  );
};

export default TimeLineArea;
