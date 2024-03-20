import React from 'react';

import '../style/Bodyhome.css';


import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';


const Bodyhome = () => {


  return (
    <>

      <div >


        <div className='homebodycarosal  mt-5 '   >


          <MDBCarousel showControls interval={3000}>
            <MDBCarouselItem itemId={1} interval={1000}>
              <img src='https://img.freepik.com/free-photo/professional-indian-young-photographer-taking-photos-studio-with-leight_231208-3780.jpg?w=996&t=st=1705992414~exp=1705993014~hmac=ae0ab7d85e31cb28e5e59be11c339dcb5c71f1616c66271654d344131015968b' className='homebodycarosal d-block w-100' alt='...' />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={2}>
              <img src='https://img.freepik.com/free-photo/photographer-hand-holding-camera-standing-viewpoint-clouds-panorama-viewpoint-sunrise_335224-1320.jpg?w=996&t=st=1705994635~exp=1705995235~hmac=93282423cbb6cb0ad963c50c120be074cd8a11280a68302f78ac7bf8edf4300c' className='homebodycarosal d-block w-100' alt='...' />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={3}>
              <img src='https://img.freepik.com/free-photo/confident-young-model-holds-camera-spotlight-generated-by-ai_188544-27654.jpg?t=st=1705994864~exp=1705998464~hmac=9a76a6d701c60779edcab88c255f176d7c0815c446d256d076c85571b0e46aa9&w=1060' className='homebodycarosal d-block w-100' alt='...' />
            </MDBCarouselItem>
          </MDBCarousel>



        </div>
        <div className='homeimagebodymain'>
          <div className='homeimagebodymain1' >  </div>
          <div className='homeimagebodymain2' > <p className='homeimagebodymain2text'  >  “  Discover a world of talented photographers ready to turn your special occasions into timeless memories. Whether it's a wedding, engagement, family reunion, or a personal photoshoot, PoshPic connects you with skilled photographers who specialize in various styles and genres  ”</p> </div>

        </div>



      </div>
      <div className='homeimagebgtxtmain1' >
        <div className='homeimagebgtxtmain2'> <h2 style={{ color: 'white', cursor: 'pointer', padding: '8%', fontFamily: 'cursive', textDecoration: 'underline blue ' }}>Wedding Photographer</h2> </div>
        <div className='homeimagebgtxtmain3'>
          <h2 style={{ color: 'white', cursor: 'pointer', padding: '8%', fontFamily: 'cursive', textAlign: 'end', textDecoration: 'underline blue ' }}>Food Photographer</h2>
        </div>
        <div className='homeimagebgtxtmain2' style={{ backgroundImage: 'url("https://as1.ftcdn.net/v2/jpg/06/85/73/70/1000_F_685737000_3DUDpe0J6ppB762bYZnBlTBmZlxFgbZK.jpg")' }} > <h2 style={{ color: 'white', cursor: 'pointer', padding: '8%', fontFamily: 'cursive', textDecoration: 'underline blue', }}>Street Photographer</h2> </div>
        <div className='homeimagebgtxtmain3' style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/full-shot-woman-working-as-photographer_52683-110067.jpg?w=996&t=st=1706069893~exp=1706070493~hmac=b9611c14fd2658ab85d0ec4913bca723fc6df7a462aa8084e336122342eff931")', backgroundSize: 'cover', objectFit: 'cover' }} >
          <h2 style={{ color: 'white', cursor: 'pointer', padding: '8%', fontFamily: 'cursive', textAlign: 'end', textDecoration: 'underline blue ', }}>Product Photographer</h2>
        </div>



      </div>
    </>
  );
}

export default Bodyhome;
