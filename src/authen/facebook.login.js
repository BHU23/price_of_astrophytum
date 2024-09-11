import { useRouter } from 'next/navigation';
import FacebookLogin from 'react-facebook-login';
import Cookies from "js-cookie";
const FacebookLoginButton = () => {
  const router = useRouter();

  const handleFacebookLogin = async (response) => {
    const { accessToken } = response;
    
    const apiUrl = "http://127.0.0.1:8000/api/auth/facebook/";
    // Send the access token to your Django backend
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: accessToken }),
    });

    if (res.ok) {
      const data = await res.json();
      Cookies.set("token", data.token, {
        secure: true,
        expires: expirationTimeInDays,
      });
      Cookies.set("role", data.user_profile.role, {
        secure: true,
        expires: expirationTimeInDays,
      });

      setTimeout(() => {
        router.push(`/${data.user_profile.role.toLowerCase()}/dashboard`);
      }, 100);
    }
  };

  return (
    <FacebookLogin
      appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}  // Facebook App ID
      autoLoad={false}
      fields="name,email,picture"
      callback={handleFacebookLogin}
      icon="fa-facebook"
    />
  );
};

export default FacebookLoginButton;
