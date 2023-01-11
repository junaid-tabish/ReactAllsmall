import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Products() {
  const [expanded, setExpanded] = React.useState(false);
  const [data,setData]=React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(()=>{
    axios.get('https://api.instantwebtools.net/v1/passenger?page=0&size=30')
    .then(res=>{console.log(res.data.data);
        setData(res.data.data)})
    .catch(err=>console.log(err))
  },[])

  return (
    <React.Fragment>
    {data?.map((data)=> 
        <Card key={data._id} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {data.name}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.name}
        subheader={`Trips: ${data.trips}`}
      />
      <CardMedia
        component="img"
        height="194"
        width="200"
        image={data.airline[0].logo}
        alt="Airline"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{data.airline[0].name}</Typography>
          <Typography paragraph>
            Country: {data.airline[0].country} <br /> 
            HeadQuarter: {data.airline[0].head_quaters}  <br /> 
            Slogan: {data.airline[0].slogan}  <br /> 
            Website: {data.airline[0].website}  <br /> 
            Established In: {data.airline[0].established}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    )}
    

    </React.Fragment>
  );
}