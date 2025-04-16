import { Link } from "react-router-dom";

const Card = ({ image, title, description, restricted, link }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl w-80">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-5 text-center">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="mt-2 text-gray-600">{description}</p>
                <Link 
                    to={link} 
                    className={`mt-4 inline-block px-4 py-2 rounded-lg text-white ${restricted ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
                    {restricted ? "Login Required" : "Explore"}
                </Link>
            </div>
        </div>
    );
};

export default Card;
