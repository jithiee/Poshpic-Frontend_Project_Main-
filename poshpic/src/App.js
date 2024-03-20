import './App.css';
import {BrowserRouter as Router ,Routes , Route, BrowserRouter, Navigate} from  'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Userprofile from './components/Userprofile';
import Erorr from './components/Erorr';
import Landingpage from './components/Landingpage';
import Imageview from './components/Imageview';
import Resetpassword from './components/Resetpassword';
import Otp_register from './components/Otp_register';
import Mainhomepage from './Page/Mainhomepage';
import Fasion from './Page/Fasion';
import Userprofilemain from './Page/Userprofilemain';
import EditUserprofile from './components/EditUserprofile';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Chat from './components/Chat';
import Post from './components/Post';
import Follow from './components/Follow';
import Message from './components/Message';
import Booking from './components/Booking';
import Normal_userprofile from './components/Normal_userprofile';
import Contact from './components/Contact';
import CreatePoste from './components/Photographer/CreatePoste';
import HistoryPost from './components/Photographer/HistoryPost';
import PhotoNavbar from './components/Photographer/PhotoNavbar';
import ViewPhotographer from './components/Photographer/ViewPhotographer';
import Subscrip from './components/Subscrip';
import Paymentsuccess from './components/Paymentsuccuss';
import AdminDashboarrd from './Page/AdminDashboarrd';
import Adminphotographer from './Page/Adminphotographer';
import AdminUserview from './Page/AdminUserview';
import Editpost from './components/Post/Editpost';


const PrivateRouter = ({ children }) => {
  const authtoken = localStorage.getItem('authtoken');
  if (!authtoken) {
    return <Navigate to="/login" replace />;
  }else{

    return <>{children}</>;
  }
};

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='*' element={<Erorr/>} />
          <Route path='/landingpage' element={<Landingpage/>} />
          <Route path='/imageview' element={<Imageview/>} />
          <Route path='/resetpassword' element={<Resetpassword/>} />
          <Route path='/otpregister/:email' element={<Otp_register />} />
          <Route path='/otpregister' element={<Otp_register />} />
          <Route path="/home" element={<PrivateRouter><Mainhomepage /></PrivateRouter>} />
          <Route path='/fasion' element={ <PrivateRouter>  <Fasion/></PrivateRouter> } />
          <Route path='/photopgrapheruserprofile' element={ <PrivateRouter> <Userprofilemain/> </PrivateRouter> } />
          <Route path='/edituserprofile' element={<EditUserprofile/>} />
          <Route path='/posts' element={ <PrivateRouter>   <Post/></PrivateRouter> } />
          <Route path='/chat' element={<Chat/>} />
          <Route path='/follow' element={<Follow/>} />
          <Route path='/msg' element={<Message/>} />
          <Route path='/booking' element=  {  <PrivateRouter> <Booking/> </PrivateRouter> } />
          <Route path='/booking/:user_id' element={<Booking/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/userprofile' element={  <PrivateRouter>  <Normal_userprofile/> </PrivateRouter> } />
          <Route path='/createpost' element={<CreatePoste/>} />
          <Route path='/createpost/:postId' element={<CreatePoste />} />
          <Route path='/history' element={<HistoryPost/>} />
          <Route path='/photographers' element={  <PrivateRouter>  <PhotoNavbar/>  </PrivateRouter>} />
          <Route path='/history' element={<HistoryPost/>} />
          <Route path='/view' element={ <PrivateRouter>   <ViewPhotographer/> </PrivateRouter>} />  
          <Route path='/view/:user' element={ <PrivateRouter> <ViewPhotographer /> </PrivateRouter> } />
          <Route path='/sub' element={<Subscrip/>} />
          <Route path='/success' element={<Paymentsuccess/>} />
          <Route path='/admin' element={ <AdminDashboarrd/>} />
          <Route path='/viewphotographer' element={ <PrivateRouter> <Adminphotographer/> </PrivateRouter> } />
          <Route path='/viewuser' element={ <PrivateRouter> <AdminUserview/> </PrivateRouter> } />
          <Route path='/editpost' element={<Editpost/>} />
          <Route path='/editpost/:postId' element={<Editpost/>} />
     </Routes>

    </Router>
  );
}

export default App;
  
          
        


  
  
