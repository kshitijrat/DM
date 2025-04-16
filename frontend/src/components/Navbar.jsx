import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-white-600 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                <Link to="/" className="text-2xl text-gray-500 font-bold">Disaster Relief</Link>
                <div>
                    <Link to="/login" className="px-4 py-2 bg-white text-blue-600 rounded-lg mr-2">Login</Link>
                    <Link to="/signup" className="px-4 py-2 bg-white text-blue-600 rounded-lg">Signup</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
