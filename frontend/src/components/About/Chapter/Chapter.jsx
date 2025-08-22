import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import styles from '@/styles/AboutChapter.module.css';
import {useState} from 'react';


export default function Chapter() {

  const [isHoveredCS, setIsHoveredCS] = useState(false);
 const buttonStyleCS={
 backgroundColor: isHoveredCS? "#000000ff" : "white",
 color: isHoveredCS? "white" : "black",
 boxShadow : isHoveredCS
      ? "0px 8px 20px rgba(0,0,0,0.3)"
      : "0px 4px 10px rgba(0,0,0,0.1)",
 }
  const [isHoveredWIE, setIsHoveredWIE] = useState(false);
 const buttonStyleWIE={
 backgroundColor: isHoveredWIE? "#000000ff" : "white",
 color: isHoveredWIE? "white" : "black",
 boxShadow: isHoveredWIE
      ? "0px 8px 20px rgba(0,0,0,0.3)"
      : "0px 4px 10px rgba(0,0,0,0.1)",
 
 }

  const [isHovered1, setIsHovered1] = useState(false);
 const buttonStyle1={

 boxShadow: isHovered1
      ? "0px 8px 20px rgba(0,0,0,0.3)"
      : "0px 4px 10px rgba(0,0,0,0.1)",
 
 }

   const [isHovered2, setIsHovered2] = useState(false);
 const buttonStyle2={

 boxShadow: isHovered2
      ? "0px 8px 20px rgba(0,0,0,0.3)"
      : "0px 4px 10px rgba(0,0,0,0.1)",
 
 }

  return (
    <div>
      <div className={styles.chaptercontainer}>
       
        <div className={styles.chapterimage}>
          <img
            src="https://www.ieeedtu.in/images/IEEE_CS.png"
            alt="IEEE CS Logo"
          />
        </div>

      
        <div className={styles.chaptercontent}>
          <Card 
           style={buttonStyle1} 
          onMouseEnter={() => setIsHovered1(true)}
      onMouseLeave={() => setIsHovered1(false)}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                IEEE DTU CS CHAPTER
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                The IEEE Computer Society is the premier source for information,
                inspiration, and collaboration in Computer Science and Engineering.
                IEEE DTU has become affiliated to the IEEE Computer Society and has
                established its presence in the ever-expanding world of Computer Science.
                IEEE DTU Computer Society has organized many flagship events like Microhacks,
                IEEEXtreme, Vihaan and Bulls N' Bears.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" startIcon={<ReadMoreIcon />}
                onMouseEnter={() => setIsHoveredCS(true)}
      onMouseLeave={() => setIsHoveredCS(false)}
       style={buttonStyleCS}>
                Know more
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
      <div className={styles.chaptercontainer}>

        <div className={styles.chapterimageWie}>
          <img
            src="https://www.ieeedtu.in/images/IEEE_WIE.png"
            alt="IEEE WIE Logo"
          />
        </div>

      
        <div className={styles.chaptercontent}>
          <Card
           style={buttonStyle2} 
          onMouseEnter={() => setIsHovered2(true)}
      onMouseLeave={() => setIsHovered2(false)}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                IEEE DTU WIE CHAPTER
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Women in Engineering (WIE) is a global network of IEEE members
                devoted to promoting the advancement of women in science and retention of disciplines globally.
                The vision it holds is that of a vibrant community of women and men collectively using their
                diverse talents of humanity. In lieu of the certain horrific events in India, IEEE DTU WIE hosted
                a webinar on Workplace Environment and being none other than Dr. Sharad Kumari.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" startIcon={<ReadMoreIcon />} 
                onMouseEnter={() => setIsHoveredWIE(true)}
      onMouseLeave={() => setIsHoveredWIE(false)}
       style={buttonStyleWIE}>
                Know more
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
   </div>
  );
}
