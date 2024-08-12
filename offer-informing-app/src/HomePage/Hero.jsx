import { Link } from 'react-router-dom';

function HeroSection() {
    return (
        <section className="w-full bg-blue-600 text-white py-16">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl font-extrabold mb-4">Welcome to Offer Informing App</h1>
                <p className="text-xl mb-8">Discover the best deals and events near you. Stay updated with local offers and special functions from businesses around you.</p>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                    <Link to="/offers" className="btn btn-primary text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-500">
                        View Offers
                    </Link>
                    <Link to="/register/business" className="btn btn-secondary text-white bg-green-700 hover:bg-green-800 focus:ring-green-500">
                        Register as a Business
                    </Link>
                    <Link to="/register/customer" className="btn btn-secondary text-white bg-green-700 hover:bg-green-800 focus:ring-green-500">
                        Register as a Customer
                    </Link>
                    <Link to="/polls" className="btn btn-accent text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-500">
                        Participate in Polls
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
