import React from 'react';
import Navbar from '../Navbar';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBBtn } from 'mdb-react-ui-kit'

const HistoryPost = () => {
    const [expanded, setExpanded] = React.useState(false);
    interface ExpandMoreProps extends IconButtonProps {
      expand: boolean;
    }
  
    const ExpandMore = styled((props: ExpandMoreProps) => {
      const { expand, ...other } = props;
      return <IconButton {...other} />;
    })(({ theme, expand }) => ({
      transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    }));
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
  
  
  
  


  return (
    <>
    <div>
        <Navbar/>

        <div className='m-5'> 
        <h2 className='m-3'>History</h2> <hr />
      

        
        <div className="container-fluid m-2 "   >
          <div className="row"  style={{display:'flex ', justifyContent:'center' }}>

{/* ==================================================== */}

            

            <div className="col-md-3  mb-4 m-2">   
            <Card sx={{ maxWidth: 345 }}>
      <CardHeader
     
        action={
          <IconButton aria-label="settings"  >
              
             <MDBDropdown className=''>

      <MDBDropdownToggle  className='bg-dark' split    style={{border:'1px solid red',}}></MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem link>Edit </MDBDropdownItem>
        <MDBDropdownItem link> Repost </MDBDropdownItem>
        <MDBDropdownItem link>Delete </MDBDropdownItem>
       
     
      </MDBDropdownMenu>
    </MDBDropdown>

          </IconButton>


        }




        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://www.joasisweddingphotography.co.uk/wp-content/uploads/sites/11485/2020/02/cagliari-sardegna-wedding-photographer-european-italian-outdoorwedding-rustic-boho-vintage-596.jpg"
        alt="Paella dish"
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
          
        </CardContent>
      </Collapse>
    </Card>
   </div>



   {/* ======================================== */}
             


             

            
            

          </div>
        </div>
      </div>

      
    </div>
    </>
  );
}

export default HistoryPost;
