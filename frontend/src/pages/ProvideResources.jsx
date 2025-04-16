import Navbar from "../components/Navbar";

const ProvideResources = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="text-center py-16 px-6">
                <h1 className="text-4xl font-bold text-gray-800">Provide Resources</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">Help others by offering food, shelter, and medical aid.</p>
            </div>
            {/* Add resource contribution form here */}
        </div>
    );
};

export default ProvideResources;
