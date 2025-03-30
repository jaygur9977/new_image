
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';


const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 



  useEffect(() => {
    const checkUser = async () => {
      const uid = localStorage.getItem('uid');
      if (uid) {
        try {
          await fetchUserData(uid);
        } catch (error) {
          console.error('Error fetching user:', error);
          localStorage.removeItem('uid');
        }
      }
      setLoading(false);
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

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('uid');
    try {
      const navigate = useNavigate?.();
      if (navigate) {
        navigate('/');
      } else {
        window.location.href = '/';
      }
    } catch (e) {
      window.location.href = '/';
    }
  };
  <a href="https://image-backed.onrender.com/" onClick={handleLogout}>Logout</a>

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className='p-1'>
      <div className='flex justify-between text-orange-500 ml-6 items-center'>
        <span className="text-4xl font-bold">oKm</span>
        <div>
          {!user ? (
            <div className="flex justify-center mr-6">
              <button
                onClick={login}
                className="px-6 py-2 mt-1 bg-black text-white rounded-lg hover:bg-gray-700 transition-all duration-100"
              >
                Login
                
              </button>
            </div>
          ) : (
            <div className="text-center flex gap-4">
              <button
                onClick={handleLogout}
                className="px-4 mt-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
              >
                Logout
              </button>
              <img
                src={user.picture}
                alt={user.name}
                className="w-10 h-10 rounded-full mx-auto"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;



