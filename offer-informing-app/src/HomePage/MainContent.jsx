import React from 'react';

function MainContent() {
    return (
        <main className="min-h-[45vh] bg-gray-100 flex flex-col items-center py-12">
            <div className="container mx-auto px-4">
                <section className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold mb-8">Why Choose Offer Informing App?</h2>
                    <p className="text-lg mb-8">
                        Discover the unique advantages of using our app for finding and claiming offers, engaging in local events, and gaining valuable insights.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                            <h3 className="text-2xl font-semibold mb-4">Exclusive Offers</h3>
                            <p>Find top-notch deals and discounts from businesses in your area, customized to fit your interests and preferences.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                            <h3 className="text-2xl font-semibold mb-4">Local Events</h3>
                            <p>Stay up-to-date with exciting local events, functions, and special occasions happening near you.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                            <h3 className="text-2xl font-semibold mb-4">Valuable Insights</h3>
                            <p>Access detailed reports and analytics that help businesses understand customer behavior and refine their strategies.</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default MainContent;
