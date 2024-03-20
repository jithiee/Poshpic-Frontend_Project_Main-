
import React, { useEffect, useRef, useState } from 'react';

import { jwtDecode } from 'jwt-decode';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CommentIcon from '@mui/icons-material/Comment';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import Navbar from './Navbar';
import axiosInstance from '../Redux/axios';
import axios from 'axios';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import '../style/Posts.css'
import { styled } from '@mui/system';
import ReactPlayer from 'react-player';


const PostList = () => {
  const [expandedState, setExpandedState] = useState({});
  const [showFullDescription, setShowFullDescription] = useState({});
  const authToken = localStorage.getItem('authtoken');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [lastLikeClickTime, setLastLikeClickTime] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHovered, setIsHovered] = useState(false);



  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    listPosts(newPage);

  };

  const navigate = useNavigate()


  const user = authToken ? jwtDecode(authToken) : null;

  const handleExpandClick = (postId) => {
    setExpandedState((prevExpandedState) => ({
      ...prevExpandedState,
      [postId]: !prevExpandedState[postId],
    }));
  };

  const handleReadMoreClick = (postId) => {
    setShowFullDescription((prevShowFullDescription) => ({
      ...prevShowFullDescription,
      [postId]: true,
    }));
  };

  const listPosts = async (page = 1) => {

    try {
      const response = await axiosInstance.get(`post/?limit=5&offset=${(page - 1) * 5}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);

      setPosts(response.data.results);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Error fetching posts. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      listPosts();
    }
  }, [authToken, liked, commented,]);


  const isUserLiked = (post) => {
    return post.likes.some((like) => like.user == user.user_id);
  };

  const postLike = async (postId) => {
    console.log(postId);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/post/${postId}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },

          params: {
            ordering: '-created_at',
          },
        }
      );



      if (response.status === 201 || response.status === 200) {
        setLiked(!liked);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };



  const handleCommentChange = (e) => {
    setCommentText(e.target.value);


  };




  const postComment = async (postId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/post/${postId}/comment/`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        setCommented((prevCommented) => [...prevCommented, response.data]);
        setCommentText('');

      }
      console.log(response);

    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };



  const handleDeleteComment = async (commentId) => {

    console.log(commentId);
    try {

      const response = await axios.delete(
        `http://127.0.0.1:8000/comment/${commentId}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        listPosts();
        setSuccessMessage('Comment deleted successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };


  const renderDeleteButton = (comment) => {
    const handleDeleteConfirmation = () => {
      const shouldDelete = window.confirm('Are you sure you want to delete this comment?');
      if (shouldDelete) {
        handleDeleteComment(comment.id);
      }
    };

    if (user && comment.user === user.user_id) {
      return (
        <IconButton
          aria-label="delete"
          onClick={() => handleDeleteConfirmation(comment.id)}
          style={{ color: 'red' }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      );
    }
    return
      ;
  };



  const AnimatedFavoriteIcon = styled(FavoriteIcon)({
    animation: 'pulse 1s infinite', // Add your preferred animation properties here
    '@keyframes pulse': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.2)' },
      '100%': { transform: 'scale(1)' },
    },
  });

  const handleViewClick = (user) => {
    // Use the navigate function to redirect to the dynamic route
    navigate(`/view/${user}`);
  };


  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };


  return (
    <div >
      <Navbar />

      <Grid item xs={12} sm={12}>
        <div style={{ color: 'green', marginTop: '10px' }}>
          {successMessage}
        </div>
        <div>
          {loading && <p>

            <div className="spinner-border" style={{ width: '5rem', height: '5rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

          </p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", backgroundColor: "#f8f7f4" }}>
              <Typography
                variant='h3'
                fontFamily='cursive'
                style={{
                  textAlign: 'center',



                }}

              >

                <img


                  src="https://images.vexels.com/media/users/3/275222/isolated/preview/8443a28c66e7e9eb66124a5347a0df88-explore-word-glossy.png"
                  alt=""
                  style={{ maxWidth: '50%', height: 'auto' }}
                /> <hr />
              </Typography>


              {posts.map((post) => (
                <Card className='cards'>
                  <div key={post.id}>

                    <CardHeader
                      style={{ backgroundColor: '' }}
                      avatar={
                        <Avatar
                          onClick={() => handleViewClick(post.user)}
                          alt={`${post.username}`}
                          src={
                            post.professionalprofile
                              ? `127.0.0.1:8000/${post.professionalprofile?.image}`
                              : `127.0.0.1:8000/${post.userprofile?.image}`
                          }


                        />

                      }

                      title={post.title}
                      subheader={post.created_at}
                    />

                    <div
                      style={{ cursor: 'pointer' }}
                      // onMouseEnter={handleHover}
                      // // onMouseLeave={handleLeave}
                    >
                      {post.video ? (
                        <ReactPlayer
                          url={`http://127.0.0.1:8000${post.video}`}
                          playing={isHovered}
                          controls
                          width="100%"
                          height="100%"
                          cursor="poniter"
                   

                        />
                      ) : (
                        <CardMedia
                          component="img"
                          className='imgespost'
                          image={`http://127.0.0.1:8000${post.image}`}
                          alt={post.title || "No post"}
                          style={{ width: "100%", objectFit: 'cover' }}
                        />
                      )}
                    </div>


                    {/* <CardMedia
  component={post.video ? "video" : "img"}
  controls={post.video ? true : false}
  className='imgespost'
  image={`http://127.0.0.1:8000${post.video || post.image}`}
  alt={post.title || "No post"}
  style={{ width: "100%", objectFit: post.video ? 'contain' : 'cover' }}
/> */}


                    <CardContent>
                      <Typography variant="body2" color="text.secondary">

                        {showFullDescription[post.id]
                          ? post.description
                          : `${post.description.slice(0, 50)}...`}
                        {!showFullDescription[post.id] && (
                          <Tooltip title="Read More">
                            <IconButton
                              aria-label="read more"
                              onClick={() => handleReadMoreClick(post.id)}
                            >
                              <ReadMoreIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>

                      {isUserLiked(post) ? (
                        <IconButton

                          onClick={() => postLike(post.id)}
                          sx={{ fontSize: { sm: 27 }, color: '#ff1493', cursor: 'pointer' }}>
                          <AnimatedFavoriteIcon />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => postLike(post.id)}
                          sx={{ fontSize: { sm: 27 }, cursor: 'pointer' }}>

                          <FavoriteIcon />

                        </IconButton>
                      )}


                      {post?.likes?.length}



                      <Tooltip title={expandedState[post.id] ? 'Collapse' : 'Expand'}>
                        <div>
                          <IconButton
                            aria-label="show more"
                            onClick={() => handleExpandClick(post.id)}
                            sx={{ color: '#0E86D4' }}
                          >
                            <CommentIcon />
                          </IconButton>
                          {post?.comments?.length}
                        </div>
                      </Tooltip>
                    </CardActions>



                    <Collapse in={expandedState[post.id]} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>
                          <TextField
                            label="Add comments"
                            variant="outlined"
                            size="small"
                            style={{ width: "80%" }}
                            value={commentText}
                            onChange={handleCommentChange}

                          />

                          <IconButton style={{ color: "green", fontSize: "100%" }} onClick={() => postComment(post.id)} ><SendIcon /></IconButton>
                        </Typography>
                        <Typography paragraph>   {post?.comments?.length}  Comments</Typography>
                        <Typography paragraph>

                          {post?.comments?.map((comment) => (

                            <div className='comment-list' key={comment.id}>
                              <Box sx={{ m: 'auto', display: 'flex', marginTop: 2, justifyContent: 'left', textAlign: "left", marginLeft: "25px", backgroundColor: "#f8f7f4", borderRadius: "25px", padding: "10px", width: "80%" }}  >


                                <div style={{ display: 'flex', flexDirection: 'column', padding: "10px" }}>
                                  <Typography variant="body1">
                                    <b style={{ color: "#0000FF" }} >{comment.username}</b> <hr /> {comment.text}
                                  </Typography>
                                  {renderDeleteButton(comment)}
                                  <Typography variant="caption" color="textSecondary">
                                    {new Date(comment.created_at).toLocaleString()}
                                  </Typography>
                                </div>
                              </Box>
                            </div>
                          )).reverse()}

                        </Typography>
                      </CardContent>

                    </Collapse>


                  </div>
                </Card>
              ))}
            </div>
          )}

        </div>
      </Grid>
      <div className='mt-5 mb-5' >
        {!loading && !error && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={posts.length < 5}
            >
              Next Page
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default PostList;