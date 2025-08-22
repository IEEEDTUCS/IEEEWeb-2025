import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import { useState } from 'react';

export default function EventComponent({title,subheader,image,typography}) {
  const [liked, setLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    boxShadow: isHovered
      ? "0px 8px 20px rgba(0,0,0,0.3)"
      : "0px 4px 10px rgba(0,0,0,0.1)",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    margin: 'auto',
    marginBottom: '2rem',
    alignItems: "center",

  };

  const toggleLike = () => {
    setLiked(!liked);

  };

  return (
    <Card
      className="Card"
      sx={{ width: '20rem', height: 'auto' }}
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader
        title={title}
        subheader={subheader}
      />

      <CardMedia
        component="img"
        height="194"
        image={image}
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {typography}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <span onClick={toggleLike} style={{ cursor: 'pointer' }}>
          {liked ? (
            <FavoriteIcon sx={{ color: pink[500] }} fontSize="large" />
          ) : (
            <FavoriteBorderIcon fontSize="large" />
          )}
        </span>
      </CardActions>
    </Card>
  );
}

