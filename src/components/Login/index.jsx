import shareVideo from "../../assets/bg-video.mp4";
import shareLogo from "../../assets/logo.png";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { client } from "../../client";

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";



const Login = () => {

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                apiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN,
                clientId: import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN,
                scope: '',
            });
        }
        gapi.load('client:auth2', initClient);
    }, []);

    const navigate = useNavigate();

    const responseGoogle = (response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.profileObj));

        const { name, googleId, imageUrl } = response.profileObj;
        const doc = {
            _id: googleId,
            _type: "user",
            userName: name,
            image: imageUrl,
        };

        client
            .createIfNotExists(doc)
            .then(res => {
                navigate('/', { replace: true })
            })
            .catch(err => console.log(err));


    };


    return (
        <>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}>
                <div className="flex justify-start items-center flex-col h-screen">
                    <div className="relative w-full h-full backdrop-filter">
                        <video
                            src={shareVideo}
                            type="video/mp4"
                            loop
                            controls={false}
                            muted
                            autoPlay
                            className="w-full h-full object-cover brightness-50"
                        />
                        <div className="absolute w-full h-full flex flex-col justify-center items-center top-0 rigth-0 left-0 bottom-0 bg-blacOverlay">
                            <div className="p-5">
                                <img src={shareLogo} alt="Logo" />
                            </div>

                            <div className="shadow-2x1">
                                <GoogleLogin
                                    clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}
                                    buttonText="Login"
                                    render={(renderProps) => (
                                        <button
                                            type="button"
                                            className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}

                                        >
                                            <FcGoogle className="mr-4" /> Sign in with google
                                        </button>
                                    )}

                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    isSignedIn={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </GoogleOAuthProvider>
        </>
    );
};

export default Login;
