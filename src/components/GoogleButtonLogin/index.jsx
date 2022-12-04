import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { client } from "../../client";
import { useNavigate } from "react-router-dom";

const GoogleButtonLogin = () => {

    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: codeResponse => {
            console.log(codeResponse.profileObj);
            localStorage.setItem("user", JSON.stringify(codeResponse.profileObj));

            const { name, googleID, imageUrl } = codeResponse.profileObj;

            const doc = {
                _id: googleID,
                _type: "user",
                userName: name,
                image: imageUrl,
            };

            client
                .createIfNotExists(doc)
                .then(res => {
                    navigate('/', { replace: true })
                })
                .catch(err => {
                    console.log(err);
                });
        },
        flow: "auth-code",
        onError: error => {
            console.log(error);
        },
        clientId: import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN,

    });

    return (
        <div className="shadow-2x1">
            <button
                className="bg-white gap-2 text-black text-bold round-5 flex justify-center items-center p-3 antialiased font-bold rounded-md "
                onClick={login}
            >
                <FcGoogle fontSize="2.5rem" className="" />
                Sign in with Google
            </button>
        </div>
    );
};

export default GoogleButtonLogin;
