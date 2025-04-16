const Signup = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 shadow-md rounded-lg">
                <h2 className="text-xl font-bold">Sign Up</h2>
                <input type="text" placeholder="Name" className="block border p-2 my-2 w-full" />
                <input type="email" placeholder="Email" className="block border p-2 my-2 w-full" />
                <input type="password" placeholder="Password" className="block border p-2 my-2 w-full" />
                <button className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
            </div>
        </div>
    );
};

export default Signup;
