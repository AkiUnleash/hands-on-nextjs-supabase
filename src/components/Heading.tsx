import type { NextPage } from "next";
import Image from 'next/image'
import { Grid, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';

// 型宣言
type Props = {
  imageSrc: StaticImageData;
  imageAlt: string;
  subject: string;
}

// スタイルシートの指定
const useStyles = makeStyles((theme) => ({
  iconImage: {
    marginTop: theme.spacing(10),
  },
  subject: {
    fontSize: 32,
    fontWeight: 'bold'
  },
}));


const Heading: NextPage<Props> = ({
  imageSrc,
  imageAlt,
  subject
}) => {

  const classes = useStyles();

  return (
    <>
      <Grid className={classes.iconImage}>
        <Image
          src={imageSrc}
          alt={imageAlt} />
      </Grid>
      <Grid>
        <Typography className={classes.subject}>
          {subject}
        </Typography>
      </Grid>
    </>
  );
};

export default Heading;