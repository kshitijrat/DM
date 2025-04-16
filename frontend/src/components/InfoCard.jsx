const InfoCard = ({ title, value }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <p className="text-sm text-gray-500">{title}</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">{value}</h2>
        </div>
    );
};

export default InfoCard;
