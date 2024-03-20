import React from 'react';
import Userprofile from '../components/Userprofile';
import User_profileBody from '../components/User_profileBody';
import Navbar from '../components/Navbar';

const Userprofilemain = () => {
  return (
    <div>
      <div style={{position:'sticky' , top:'0px' , zIndex:1 , }} >

     <Navbar/>
      </div>
      <br /> <br />
      <User_profileBody/>
    </div>
  );
}

export default Userprofilemain;
