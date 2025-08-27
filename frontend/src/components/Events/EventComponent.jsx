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
  
    transition:"0.45s ease-in-out"
  };

 

  return (

    
    <Card 

      className="Card text-center font-bold w-[300px] h-[400px] m-6 " 
      sx={{ width:'20rem', height:'auto' }}
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
     

      <CardMedia className='h-[300px] w-[300px] object-contain'
        component="img"
        height="194"
        image={image}
      />

  <CardContent className='w-[300px] h-[90px]  flex flex-col items-center justify-center text-center font-heading '>
        <CardHeader
        className="text-[#70A6E3] whitespace-nowrap "
        title={title}
       
      />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {typography}
        </Typography>
      </CardContent>
     
 
    </Card>
  
  );
}

