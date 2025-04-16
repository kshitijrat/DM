import Navbar from "../components/Navbar";
import Card from "../components/Card";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="text-center py-16 px-6">
                <p className="text-gray-600 max-w-2xl mx-auto">Real-time disaster alerts and resource sharing to help communities during emergencies.</p>
            </div>
            <div className="flex justify-center gap-8 px-6 w-full max-w-7xl mx-auto pb-16">
                <Card 
                    // image="https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg" 
                    title="Live Disaster Alerts" 
                    description="Track real-time disasters near you and stay updated." 
                    restricted={false} 
                    link="/disaster-alerts"
                />
                <Card 
                   // image="https://i.natgeofe.com/n/8edcb63c-6867-45e7-8679-f93b4d396468/everest-anniversary-summit-1963-vertical.jpg" 
                    title="Seek Resources" 
                    description="Request shelter, food, or medical help from volunteers." 
                    restricted={true} 
                    link="/seek-resources"
                />
                <Card 
                   // image="https://cdn.pixabay.com/photo/2023/11/09/11/24/ai-generated-8377079_1280.png" 
                    title="Provide Resources" 
                    description="Offer your help by providing food, shelter, or medical aid." 
                    restricted={true} 
                    link="/provide-resources"
                />
            </div>
        </div>
    );
};

export default Home;
