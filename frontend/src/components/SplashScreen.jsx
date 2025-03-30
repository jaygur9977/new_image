
// import React, { useEffect, useState } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import './SplashScreen.css';

// const OKMAnimation = () => {
//   const [showButton, setShowButton] = useState(false);
//   const [user, setUser] = useState(null);

//   const controls = useAnimation();
//   const bookControls = useAnimation();
//   const particleControls = useAnimation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkUser = async () => {
//       const uid = localStorage.getItem('uid');
//       if (uid) {
//         try {
//           const response = await axios.get(`https://image-backed.onrender.com/api/get-user/${uid}`);
//           setUser(response.data.user);
//         } catch (error) {
//           console.error('Error fetching user:', error);
//           localStorage.removeItem('uid');
//         }
//       }
//       await controls.start({
//         scale: [0, 1.2, 1],
//         rotate: [0, 10, -5, 0],
//         opacity: [0, 1],
//         transition: { duration: 1 }
//       });


//       await bookControls.start({
//         scale: [0, 1],
//         opacity: [0, 1],
//         transition: { duration: 0.8 }
//       });


//       await particleControls.start({
//         opacity: [0, 1],
//         y: [20, 0],
//         transition: { duration: 0.5, stagger: 0.1 }
//       });


//       setShowButton(true);

//     sequence();
//     };
//     checkUser();
//   }, []);


//   const fetchUserData = async (uid) => {
//     try {
//       const response = await axios.get(`https://image-backed.onrender.com/api/get-user/${uid}`);
//       setUser(response.data.user);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       throw error;
//     }
//   };

//   const login = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         const userInfo = await axios.get(
//           'https://www.googleapis.com/oauth2/v3/userinfo',
//           {
//             headers: {
//               Authorization: `Bearer ${tokenResponse.access_token}`,
//             },
//           }
//         );

//         setUser(userInfo.data);
//         await saveUserToDatabase(userInfo.data);
//         localStorage.setItem('uid', userInfo.data.sub);
//         navigate('/home');
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       }
//     },
//     onError: (error) => {
//       console.error('Google Login Error:', error);
//     },
//   });

//   const saveUserToDatabase = async (userData) => {
//     try {
//       await axios.post('https://image-backed.onrender.com/api/save-user', {
//         uid: userData.sub,
//         email: userData.email,
//         name: userData.name,
//         picture: userData.picture,
//       });
//     } catch (error) {
//       console.error('Error saving user to database:', error);
//     }
//   };

//   const handleButtonClick = () => {
//     if (user) {
//       navigate('/home');
//     } else {
//       login();
//     }
//   };

//   useEffect(() => {
//     const sequence = async () => {
//       await controls.start({
//         scale: [0, 1.2, 1],
//         rotate: [0, 10, -5, 0],
//         opacity: [0, 1],
//         transition: { duration: 1 }
//       });

//       await bookControls.start({
//         scale: [0, 1],
//         opacity: [0, 1],
//         transition: { duration: 0.8 }
//       });

//       await particleControls.start({
//         opacity: [0, 1],
//         y: [20, 0],
//         transition: { duration: 0.5, stagger: 0.1 }
//       });

//       setShowButton(true);
//     };

//     sequence();
//   }, []);

 
//   return (
//     <div className="okm-animation-container">
//       {user && (
//         <motion.div
//           className="user-profile-top"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.5 }}
//         >
//           <img 
//             src={user.picture} 
//             alt={user.name} 
//             className="user-avatar-top"
//           />
//           <span className="user-name-top">{user.name}</span>
//         </motion.div>
//       )}

//       <div className="animation-stage">
//         <motion.div 
//           className="okm-logo"
//           initial={{ scale: 0, opacity: 0 }}
//           animate={controls}
//         >
//           OKM
//         </motion.div>

//         <motion.div 
//           className="book"
//           initial={{ scale: 0, opacity: 0 }}
//           animate={bookControls}
//         >
//           <div className="book-cover"></div>
//           <div className="book-pages"></div>
//         </motion.div>

//         <div className="particles-container">
//           {[...Array(12)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="particle"
//               initial={{ opacity: 0, y: 20 }}
//               animate={particleControls}
//               style={{
//                 left: `${Math.random() * 80 + 10}%`,
//                 top: `${Math.random() * 60 + 20}%`,
//                 animationDelay: `${i * 0.1}s`,
//                 fontSize: `${Math.random() * 1 + 0.8}rem`
//               }}
//             >
//               {['📚', '🧠', '✏️', '🔬', '🌍', '💡', '📖', '🎓', '📊', '🧪', '📝', '🔍'][i]}
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       <motion.div 
//         className="content"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2, duration: 1 }}
//       >
//         <h1>Welcome to OKM Education</h1>
//         <p>Unlocking knowledge, empowering minds</p>

//         {showButton && (
//           <motion.button
//             className="go-button"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 2.5, duration: 0.5 }}
//             onClick={handleButtonClick}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {user ? "Let's Go!" : "Login to Continue"}
//           </motion.button>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default OKMAnimation;




import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './SplashScreen.css';

const OKMAnimation = () => {
  const [showButton, setShowButton] = useState(false);
  const [user, setUser] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const controls = useAnimation();
  const bookControls = useAnimation();
  const particleControls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const uid = localStorage.getItem('uid');
      if (uid) {
        try {
          const response = await axios.get(`https://image-backed.onrender.com/api/get-user/${uid}`);
          setUser(response.data.user);
        } catch (error) {
          console.error('Error fetching user:', error);
          localStorage.removeItem('uid');
        }
      }

      await controls.start({
        scale: [0, 1.2, 1],
        rotate: [0, 10, -5, 0],
        opacity: [0, 1],
        transition: { duration: 1 }
      });

      await bookControls.start({
        scale: [0, 1],
        opacity: [0, 1],
        transition: { duration: 0.8 }
      });

      await particleControls.start({
        opacity: [0, 1],
        y: [20, 0],
        transition: { duration: 0.5, stagger: 0.1 }
      });

      setShowButton(true);
    };
    
    checkUser();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const response = await axios.get(`https://image-backed.onrender.com/api/get-user/${uid}`);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        setUser(userInfo.data);
        await saveUserToDatabase(userInfo.data);
        localStorage.setItem('uid', userInfo.data.sub);
        navigate('/home');
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
    onError: (error) => {
      console.error('Google Login Error:', error);
    },
  });

  const saveUserToDatabase = async (userData) => {
    try {
      await axios.post('https://image-backed.onrender.com/api/save-user', {
        uid: userData.sub,
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
      });
    } catch (error) {
      console.error('Error saving user to database:', error);
    }
  };

  const handleButtonClick = () => {
    if (user) {
      navigate('/home');
    } else {
      login();
    }
  };

  // Adjust particle count based on screen size
  const particleCount = windowSize.width < 768 ? 8 : 12;
  const particleSize = windowSize.width < 768 ? '0.6rem' : '0.8rem';
  const logoFontSize = windowSize.width < 768 ? '3rem' : '4rem';

  return (
    <div className="okm-animation-container">
      {user && (
        <motion.div
          className="user-profile-top"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <img 
            src={user.picture} 
            alt={user.name} 
            className="user-avatar-top"
          />
          <span className="user-name-top">{user.name}</span>
        </motion.div>
      )}

      <div className="animation-stage">
        <motion.div 
          className="okm-logo"
          initial={{ scale: 0, opacity: 0 }}
          animate={controls}
          style={{ fontSize: logoFontSize }}
        >
          OKM
        </motion.div>

        <motion.div 
          className="book"
          initial={{ scale: 0, opacity: 0 }}
          animate={bookControls}
        >
          <div className="book-cover"></div>
          <div className="book-pages"></div>
        </motion.div>

        <div className="particles-container">
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{ opacity: 0, y: 20 }}
              animate={particleControls}
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 60 + 20}%`,
                animationDelay: `${i * 0.1}s`,
                fontSize: particleSize
              }}
            >
              {['📚', '🧠', '✏️', '🔬', '🌍', '💡', '📖', '🎓', '📊', '🧪', '📝', '🔍'][i]}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        className="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <h1>Welcome to OKM Education</h1>
        <p>Unlocking knowledge, empowering minds</p>

        {showButton && (
          <motion.button
            className="go-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            onClick={handleButtonClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {user ? "Let's Go!" : "Login to Continue"}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default OKMAnimation;