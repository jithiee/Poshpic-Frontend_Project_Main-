
// import React, { Component } from 'react';
// import { w3cwebsocket as W3CWebSocket } from "websocket";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import Container from "@material-ui/core/Container";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import Paper from "@material-ui/core/Paper";
// import { withStyles } from "@material-ui/core/styles";

// const useStyles = (theme) => ({
//     submit: {
//       margin: theme.spacing(3, 0, 2),
//     },
//   });

// class Chat extends Component {
//     state = {
//       filledForm: false,
//       messages: [],
//       value: '',
//       name: '',
//       room: 'test',
//     }
//     client = new W3CWebSocket('ws://localhost:8000/ws/' + this.state.room + '/'); 

//     onButtonClicked = (e) => {
//         this.client.send(
//           JSON.stringify({
//             type: "message",
//             text: this.state.value,
//             sender: this.state.name,
//           })
//         );
//         this.state.value = "";
//         e.preventDefault();
//       };

//     componentDidMount() {
//         this.client.onopen = () => {
//           // console.log("WebSocket Client Connected");
//         };
//         this.client.onmessage = (message) => {
//           const dataFromServer = JSON.parse(message.data);
//           if (dataFromServer) {
//             this.setState((state) => ({
//               messages: [
//                 ...state.messages,
//                 {
//                   msg: dataFromServer.text,
//                   name: dataFromServer.sender,
//                 },
//               ],
//             }));
//           }
//         };

//       }


//     render(){
//         const { classes } = this.props;
//         return (
//           <Container component="main" maxWidth="xs">
//             {this.state.filledForm ? (
//               <div style={{ marginTop: 50 }}>
//                 Room Name: {this.state.room}
//                 <Paper
//                   style={{height: 500, maxHeight: 500, overflow: "auto", boxShadow: "none", }}
//                 >
//                   {this.state.messages.map((message) => (
//                     <>
//                       <Card className={classes.root}>
//                         <CardHeader title={message.name} subheader={message.msg} />
//                       </Card>
//                     </>
//                   ))}
//                 </Paper>
//                 <form
//                   className={classes.form}
//                   noValidate
//                   onSubmit={this.onButtonClicked}
//                 >
//                   <TextField id="outlined-helperText" label="Write text" defaultValue="Default Value"
//                     variant="outlined"
//                     value={this.state.value}
//                     fullWidth
//                     onChange={(e) => {
//                       this.setState({ value: e.target.value });
//                       this.value = this.state.value;
//                     }}
//                   />
//                   <Button type="submit" fullWidth variant="contained" color="primary"
//                     className={classes.submit}
//                   >
//                     Send Message
//                   </Button>
//                 </form>
//               </div>
//             ) : (
//               <div>
//                 <CssBaseline />
//                 <div className={classes.paper}>
//                   <form
//                     className={classes.form}
//                     noValidate
//                     onSubmit={(value) => this.setState({ filledForm: true })}
//                   >
//                     <TextField variant="outlined" margin="normal" required fullWidth label="Room name"
//                       name="Room name"
//                       autoFocus
//                       value={this.state.room}
//                       onChange={(e) => {
//                         this.setState({ room: e.target.value });
//                         this.value = this.state.room;
//                       }}
//                     />
//                     <TextField variant="outlined" margin="normal" required fullWidth name="sender" label="sender"
//                       type="sender"
//                       id="sender"
//                       value={this.state.name}
//                       onChange={(e) => {
//                         this.setState({ name: e.target.value });
//                         this.value = this.state.name;
//                       }}
//                     />
//                     <Button type="submit" fullWidth variant="contained" color="primary"
//                       className={classes.submit}
//                     >
//                       Submit
//                     </Button>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </Container>
//         );
//       }

//   }
//   export default withStyles(useStyles)(Chat);

import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/system';
import { Avatar, IconButton, useMediaQuery } from '@mui/material';
import { SearchOutlined, Send } from '@mui/icons-material';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { jwtDecode } from 'jwt-decode';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import {
  MDBCol,} from "mdb-react-ui-kit";
  import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
  import SendIcon from '@mui/icons-material/Send';
  
  import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axiosInstance from '../Redux/axios';
import { a } from 'react-spring';



const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#128C7E',
  color: 'white',
  position: 'sticky',
  top: '0',
  zIndex: '100',
});

const AvatarStyled = styled(Avatar)({
  marginRight: '10px',
});

const SearchContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
  height: '35px',
  borderRadius: '20px',
  flex: '1',
  marginLeft: '20px',
  padding: '5px',
});

const SearchIcon = styled(SearchOutlined)({
  padding: '10px',
  height: '100%',
  color: 'gray',
});

const InputStyled = styled('input')({
  border: 'none',
  width: '100%',
  marginLeft: '10px',
  outlineWidth: '0',
  fontSize: 'medium',
});

const ChatContainer = styled('div')({
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  overflowY: 'auto',
});

const Sidebar = styled('div')({
  width: '30%',
  height: '100%',
  backgroundColor: '#ededed',
  padding: '10px',
});

const MessageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '2%',
  width: '70%',
  margin: '1%',
  overflowY: 'auto',
  // maxHeight: 'calc(100% - 70px)',
  // padding: '10px',
});

const MessageBase = styled('div')({
  marginBottom: '10px',
  padding: '10px',
  wordBreak: 'break-word',
  maxWidth: '80%',
});

const SenderMessage = styled(MessageBase)({
  backgroundColor: '#DCF8C6',
  alignSelf: 'flex-end',
});

const ReceiverMessage = styled(MessageBase)({
  backgroundColor: '#E8E8E8',
  alignSelf: 'flex-start',
});

const SendMessageContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginTop: 'auto',
  padding: '10px',
  borderTop: '1px solid #ccc',
  backgroundColor: 'white',
  position: 'sticky',
  bottom: '0',
  zIndex: '1',
});

const MessageInput = styled('input')({
  border: 'none',
  borderRadius: '20px',
  padding: '10px',
  flex: '1',
  marginLeft: '10px',
  outlineWidth: '0',
  fontSize: 'medium',
});

const SendButton = styled(IconButton)({
  backgroundColor: '#128C7E',
  color: 'white',
  borderRadius: '50%',
  marginLeft: '10px',
});

const Contact = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  cursor: 'pointer',
  borderBottom: '1px solid #ccc', // Add a border between contacts
  '&:hover': {
    backgroundColor: '#f5f5f5', // Change background color on hover
  },
});




const ContactAvatar = styled(Avatar)({
  marginRight: '10px',
});

const ContactName = styled('div')({
  fontWeight: 'bold',
});

const Chat = () => {
  // const { roomName } = useParams();
  // const authToken = localStorage.getItem('authtoken');
  // const WS_URL = `ws://localhost:8000/ws/chat/${roomName}/`;
  // const CHAT_HISTORY_ENDPOINT = `/chat/chat_history/${roomName}/`;

//   const user = authToken ? jwtDecode(authToken).username : null;
//   console.log(user,'shcvsdjvcjhsvcvsc');
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const messagesEndRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const newSocket = new WebSocket(WS_URL);

//     newSocket.onopen = () => {
//       console.log("WebSocket connected");
//     };

//     newSocket.onclose = () => console.log("WebSocket disconnected");

//     newSocket.onerror = (error) => {
//       console.error("WebSocket Error:", error);
//     };

//     setSocket(newSocket);

//     return () => {
//       newSocket.close();
//     };
//   }, [WS_URL]);

//   useEffect(() => {
//     if (socket) {
//       const handleWebSocketMessage = (event) => {
//         const data = JSON.parse(event.data);
//         setMessages((prevMessages) => [...prevMessages, data]);
//       };

//       socket.onmessage = handleWebSocketMessage;

//       return () => {
//         socket.onmessage = null;
//       };
//     }
//   }, [socket]);

// const handleSubmit = (event) => {
//   event.preventDefault();
//   if (messages && socket) {
//     const data = {
//       message: messages,
//       username: "sa",
//       user:user,
//     };
//     console.log(data);
//     socket.send(JSON.stringify(data));
//     setMessages("");
//   }
// };

const roomName=1
const authToken = localStorage.getItem('authtoken');
const WS_URL = `ws://localhost:8000/ws/chat/${roomName}/?token=${authToken  }`;
const CHAT_HISTORY_ENDPOINT = `/chat/chat_history/${roomName}/`;

const theme = useTheme();

// const {username} = useParams()
const user = authToken ? jwtDecode(authToken).user_id : null;


const [socket, setSocket] = useState(null);
const [username, setUsername] = useState("jithin");
const [message, setMessage] = useState("");
const [messages, setMessages] = useState([]);
const messagesEndRef = useRef(null);
const navigate = useNavigate()




const fetchChatHistory = async () => {
  try {
    const response = await axiosInstance.get(CHAT_HISTORY_ENDPOINT);
    setMessages(response.data);
  } catch (error) {
    console.error("Error fetching chat history:", error);
  }
};



useEffect(() => {
  const authToken = localStorage.getItem('authtoken');
  const user = authToken ? jwtDecode(authToken) : null;

  // const initializeUsername = () => {
  //   if (storedUsername) {
  //     setUsername(storedUsername);
  //   } else {
  //     const input = prompt("Enter your username:");
  //     if (input) {
  //       setUsername(input);
  //       localStorage.setItem("username", input);
  //     }
  //   }
  // };

  // initializeUsername();

  const newSocket = new WebSocket(WS_URL);
  setSocket(newSocket);

  newSocket.onopen = () => {
    console.log("WebSocket connected");
    fetchChatHistory();
  }
  newSocket.onclose = () => console.log("WebSocket disconnected");
  newSocket.onerror = (error) => {
    console.error("WebSocket Error:", error);
  };



  return () => {
    newSocket.close();
  };
}, [username, roomName]);

useEffect(() => {
  if (socket) {
    const handleWebSocketMessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.onmessage = handleWebSocketMessage;

    return () => {
      socket.onmessage = null;
    };
  }
}, [socket]);

const handleSubmit = (event) => {
  event.preventDefault();
  if (message && socket) {
    const data = {
      message: message,
      username: username,
      user:user,
    };
    console.log(data);
    socket.send(JSON.stringify(data));
    setMessage("");
  }
};

const handleDelete = async (messageId) => {
  const shouldDelete = window.confirm("Are you sure you want to delete this message?");
  
  if (shouldDelete) {
    try {
      await axiosInstance.delete(`/chat/delete_message/${messageId}/`);
      fetchChatHistory()
    } catch (error) {
      fetchChatHistory()
      console.error('Error deleting message:', error);
    } 
  }
};


useEffect(() => {
  messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

}, [messages]);

// const getOtherUsername = (roomName) => {
//   const [user1, user2] = roomName.split('__');
//   const authToken = localStorage.getItem('authtoken')
//   const requestedUser = authToken ? jwtDecode(authToken).username : null;
//   return requestedUser === user1 ? user2 : user1;
// };






  return (
      
    <div>
      <MDBCol>
        <CardContent sx={{ textAlign: 'left' }}>
        <span
                        className="input-group-text border-0">
                        <IconButton onClick={()=>navigate('/chatlist')}>
                            
                        <ArrowBackIosIcon/>
                        </IconButton>
                        {/* {getOtherUsername(roomName)} */}
                      </span>
        </CardContent>
        <div className="messages-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`d-flex flex-row justify-content-${message.username === username ? 'end' : 'start'}`}>
              {message.username !== username && (
               
                <Avatar sx={{backgroundColor:"red"}}>{message.username[0].toUpperCase()}</Avatar>

              )}
              <div>
                <p
                  className={`small p-2 ${message.username === username ? 'me-3 text-white rounded-3 bg-primary' : 'ms-3 mb-1 rounded-3'}`}
                >
                  {message.message}
                </p>
                <p className={`small ${message.username === username ? 'me-3' : 'ms-3'} mb-3 rounded-3 text-muted float-${message.username === username ? 'end' : 'start'}`}>
                  {new Date(message.timestamp).toLocaleString()}
                  {message.username === username && (
                    <IconButton aria-label="delete" onClick={() => handleDelete(message.id)}>
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  )}
                </p>
              </div>
              {message.username === username && (
                               <Avatar>{message.username[0].toUpperCase()}</Avatar>

              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">


            <input
              type="text"
              className="form-control form-control-lg"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type message"
            />
            <IconButton aria-label="send" type="submit">
              <SendIcon />
            </IconButton>

          </div>
        </form>

      </MDBCol>
    </div>






    // <Root>
    //   <Header>
    //     <AvatarStyled
    //       alt="User Avatar"
    //       src="https://material-ui.com/static/images/avatar/1.jpg"
    //     />
    //     <SearchContainer>
    //       <IconButton>
    //         <SearchIcon />
    //       </IconButton>
    //       <InputStyled placeholder="Search Contact" />
    //     </SearchContainer>
    //   </Header>

    //   <ChatContainer>
    //     <Sidebar>

    //       <Contact>
    //         <ContactAvatar
    //           alt="Contact Avatar"
    //           src="https://material-ui.com/static/images/avatar/2.jpg"
    //         />
    //         <ContactName>Jithin</ContactName>
    //       </Contact>
    //       <Contact>
    //         <ContactAvatar
    //           alt="Contact Avatar"
    //           src="https://material-ui.com/static/images/avatar/3.jpg"
    //         />
    //         <ContactName>Contact 2</ContactName>
    //       </Contact>




    //     </Sidebar>

    //     <MessageContainer>
    //       <div style={{ width: '100%', backgroundColor: '#005d4b', paddingTop: '1%', position: 'sticky', top: '0  ' }} >
    //         <ul style={{ display: 'flex', listStyle: 'none', gap: '5%' }}>
    //           <li>
    //             <ContactAvatar
    //               alt="Contact Avatar"
    //               src="https://material-ui.com/static/images/avatar/2.jpg"
    //             />
    //           </li>
    //           <ul style={{ listStyle: 'none', marginLeft: '-7%' }}>
    //             <li style={{ color: 'white' }}>Jithin</li>
    //             <li style={{ color: '#34b7f1' }}>online</li>
    //           </ul  >
    //           <li> 

    //           <div className='input-group'>
    //                 <input
    //                   type='search'
    //                   placeholder='Search'
    //                   className='form-control'
    //                   style={{ backgroundColor: 'white', color: 'black', border: '1px solid white', width: '500px' }}
    //                 />
    //                 <button id='search-button' type='button' className='btn btn-white ms-2'>
    //                   <i className='fas fa-search'></i>
    //                 </button>
    //               </div>

    //           </li>





             

    //           <li style={{ color: 'white' }}>  <VideocamIcon /> </li>
    //           <li style={{ color: 'white' }} >   <CallIcon /></li>


    //         </ul>

    //       </div>
    //       <SenderMessage>
    //         <p>Sender message 1</p>
    //       </SenderMessage>

    //       <ReceiverMessage>
    //         <p>Receiver message dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffffffffffffffffffff1</p>
    //       </ReceiverMessage>

    //       <SenderMessage>
    //         <p>Sender message 2ddddddddddddddddddddddddd  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
    //       </SenderMessage>

    //       <ReceiverMessage>
    //         <p>Receiver message 2</p>
    //       </ReceiverMessage>
    //       <ReceiverMessage>
    //         <p>Receiver message 2</p>
    //       </ReceiverMessage>
    //       <ReceiverMessage>
    //         <p>Receiver message 2</p>
    //       </ReceiverMessage>
    //       <ReceiverMessage>
    //         <p>Receiver message 2</p>
    //       </ReceiverMessage>
    //       <ReceiverMessage>
    //         <p>Receiver message 2</p>
    //       </ReceiverMessage>
    //       <ReceiverMessage>
    //         <p>Receiver message 2</p>
    //       </ReceiverMessage>


    //         <form onSubmit={handleSubmit} >
    //       <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">


    //         <input
    //           type="text"
    //           className="form-control form-control-lg"
    //           value={messages}
    //           onChange={(event) => setMessages(event.target.value)}
    //           placeholder="Type message"
    //         />
    //         <IconButton aria-label="send" type="submit">
    //           <SendButton />
    //         </IconButton>

    //       </div>
    //     </form>

    //     </MessageContainer>
    //   </ChatContainer>
    // </Root>






  );
};

export default Chat;

