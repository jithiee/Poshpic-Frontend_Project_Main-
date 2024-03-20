
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Redux/axios';
import { jwtDecode } from 'jwt-decode';
import CreatePoste from '../Photographer/CreatePoste';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Box from '@mui/material/Box';
import CommentIcon from '@mui/icons-material/Comment';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from 'mdb-react-ui-kit';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';


const PhotographerBody = () => {
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
  const [editedPostId, setEditedPostId] = useState(null);
  const [editedPostDetails, setEditedPostDetails] = useState({
    title: '',
    description: '',
  });
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();

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

  const listPosts = async () => {
    try {
      const response = await axiosInstance.get('viewposts/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      listPosts();
    }
  }, [authToken, liked, commented]);

  const isUserLiked = (post) => {
    return post.likes.some((like) => like.user === user.user_id);
  };

  const postLike = async (postId) => {
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
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
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
    return null;
  };

  const postDelete = async (postId) => {
    try {
      const shouldDelete = window.confirm('Are you sure you want to delete this post?');
      if (!shouldDelete) {
        return;
      }

      const response = await axios.delete(
        `http://127.0.0.1:8000/post/${postId}/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      window.location.reload();

      if (response.status === 204) {
        console.log('Post deleted successfully');

      } else {
        console.error('Error deleting post:', response.data);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };



  const AnimatedFavoriteIcon = styled(FavoriteIcon)({
    animation: 'pulse 1s infinite', 
    '@keyframes pulse': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.2)' },
      '100%': { transform: 'scale(1)' },
    },
  });

  const handleViewClick = (post) => {

    navigate(`/editpost/${post}`);
  };

  return (
    <div>
      <div>
        <Grid item xs={12} sm={12}>
          <div style={{ color: 'green', marginTop: '10px' }}>
            {successMessage}
          </div>
          <div>
            {loading && (
              <p>
                <div className="spinner-border" style={{ width: '5rem', height: '5rem' }} role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </p>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: '#f8f7f4' }}>
                <Typography variant="h3" fontFamily="cursive" style={{ textAlign: 'center' }}>

                </Typography>

                {posts.map((post) => (
                  <Card className="cards" key={post.id}>
                    <MDBDropdown className="">
                      <MDBDropdownToggle className="bg-dark" split style={{ border: '1px solid red' }}></MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem className="bg-info" link

                          onClick={() => handleViewClick(post.id)}

                        >
                          <EditIcon />
                          Edit Post
                        </MDBDropdownItem>
                        <MDBDropdownItem className="bg-danger" link onClick={() => postDelete(post.id)}>
                          <DeleteIcon />
                          Delete Post
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>

                    <div key={post.id}>
                      <CardHeader
                        style={{ backgroundColor: '' }}
                        title={post.title}
                        subheader={post.created_at}
                      />

<CardMedia
  component={post.video ? "video" : "img"}
  controls={post.video ? true : false}
  className='imgespost'
  image={`http://127.0.0.1:8000${post.video || post.image}`}
  alt={post.title || "No post"}
  style={{ width: "100%", objectFit: post.video ? 'contain' : 'cover' }}
/> 

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
                              style={{ width: '80%' }}
                              value={commentText}
                              onChange={handleCommentChange}
                            />

                            <IconButton onClick={() => postComment(post.id)}>
                              <SendIcon />
                            </IconButton>
                          </Typography>
                          <Typography paragraph>{post?.comments?.length} Comments</Typography>
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
                            ))}
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
      </div>
    </div>
  );
};

export default PhotographerBody;
