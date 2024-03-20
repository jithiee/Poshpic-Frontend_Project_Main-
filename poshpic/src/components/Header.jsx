import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import Navbar from './Navbar';
import Bodyhome from './Bodyhome';
import '../style/Header.css';





const Header = () => {

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const slideInLeft = useSpring({
    marginLeft: '0%',
    from: { marginLeft: '-20%' },
    config: { duration: 800 },
  });

  const slideInRight = useSpring({
    marginRight: '0%',
    from: { marginRight: '-20%' },
    config: { duration: 800 },
  });

  const rotate = useSpring({
    transform: 'rotate(360deg)',
    from: { transform: 'rotate(0deg)' },
    config: { tension: 200, friction: 10 },
  });

  const slideInDown = useSpring({
    marginTop: '0%',
    from: { marginTop: '-10%' },
    config: { duration: 800 },
  });
  const handlesumit = (e) => {
    e.preventDefault()
  }

  return (
    <>

      <animated.div style={fadeIn}>



        <animated.div style={slideInDown} className='mainhomediv'>

          <animated.div style={slideInRight} className='sub2homecontain mt-3 '  >
            <img
              className='imagehomemainbak'
              style={{

                height: 'auto',
                maxWidth: '100%',
                maxHeight: '70vh',
                objectFit: 'cover',
              }}
              src='https://www.hostinger.in/_ipx/f_webp/h-assets/images/pages/homepage-uplift/all-in-one-website-2x.png'
              alt='phorott'
            />
          </animated.div>
        </animated.div>

      </animated.div>


      <div className='cardshome'>

        <div className='cardsplace ms-3'>


        </div>




      </div>


    </>
  );
};

export default Header;









