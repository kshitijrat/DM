import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        localStorage.setItem("token", "user-authenticated");
        navigate("/");
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 shadow-md rounded-lg">
                <h2 className="text-xl font-bold">Login</h2>
                <input type="email" placeholder="Email" className="block border p-2 my-2 w-full" />
                <input type="password" placeholder="Password" className="block border p-2 my-2 w-full" />
                <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
            </div>
        </div>
    );
};

export default Login;
