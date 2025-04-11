import { Link } from 'react-router-dom';

const HomePage = () => {
  // Simple list of politicians with Gavin Newsom as the main one with data
  const politicians = [
    {
      id: "GavinNewsom",
      name: "Gavin Newsom",
      party: "Democratic",
      role: "Governor of California",
      hasData: true // Only Gavin Newsom has data currently
    },
    {
      id: 2,
      name: "Alexandria Ocasio-Cortez",
      party: "Democratic",
      role: "Representative",
      hasData: false
    },
    {
      id: 3,
      name: "Ted Cruz",
      party: "Republican",
      role: "Senator",
      hasData: false
    },
    {
      id: 4,
      name: "National Rifle Association",
      party: "Non-partisan",
      role: "Organization",
      hasData: false
    }
  ];
  
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-50 to-white">
      {/* Enhanced Hero section with larger logo and intro text */}
      <div className="max-w-5xl w-full mb-16 text-center py-12">
        {/* Logo container with background effect */}
        <div className="relative mb-8">
          {/* Decorative background elements */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-purple-200 rounded-full opacity-30 blur-xl"></div>
          <div className="absolute -top-8 left-1/3 transform -translate-x-1/2 w-32 h-32 bg-indigo-200 rounded-full opacity-30 blur-xl"></div>
          
          {/* Logo text */}
          <h1 className="text-8xl font-extrabold tracking-tight mb-4 relative">
            <span className="text-purple-500 drop-shadow-md">Simple</span>
            <span className="text-purple-700 drop-shadow-md">GOV</span>
          </h1>
          
          <p className="text-2xl text-purple-400 italic font-light">Bringing transparency to politics</p>
          
          {/* Decorative underline */}
          <div className="w-32 h-1 bg-purple-300 mx-auto mt-6 rounded-full"></div>
        </div>
        
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
          Discover the connections between political donations and legislation with our 
          intuitive platform. SimpleGOV makes complex political data accessible to everyone.
        </p>
        
        <div className="inline-flex space-x-4">
          <Link to="/about" className="px-8 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 transition duration-200">
            Learn More
          </Link>
          <button className="px-8 py-3 bg-white text-purple-600 font-medium rounded-lg shadow-md border border-purple-200 hover:bg-purple-50 transition duration-200">
            Get Started
          </button>
        </div>
      </div>
      
      {/* Main content section */}
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-purple-600 relative">
            Politicians & Organizations
            <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-purple-300 rounded-full"></span>
          </h2>
          
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
              All
            </span>
            <span className="px-3 py-1 bg-white text-gray-500 rounded-full text-sm font-medium hover:bg-purple-50 cursor-pointer">
              Politicians
            </span>
            <span className="px-3 py-1 bg-white text-gray-500 rounded-full text-sm font-medium hover:bg-purple-50 cursor-pointer">
              Organizations
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <ul className="divide-y divide-gray-100">
            {politicians.map((politician) => (
              <li key={politician.id} className="py-4 first:pt-0 last:pb-0">
                <Link 
                  to={politician.hasData ? `/analysis/${politician.id}` : "#"} 
                  className={`flex items-center p-2 rounded-lg transition duration-200 ${
                    politician.hasData ? 'hover:bg-purple-50' : 'opacity-80 cursor-not-allowed'
                  }`}
                >
                  <div className="flex-shrink-0 mr-5">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                      politician.party === "Democratic" ? "from-blue-400 to-blue-600" : 
                      politician.party === "Republican" ? "from-red-400 to-red-600" : 
                      "from-gray-400 to-gray-600"
                    } flex items-center justify-center text-white text-xl font-bold`}>
                      {politician.name.charAt(0)}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="font-semibold text-xl text-gray-800">{politician.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{politician.role}</div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                      politician.party === "Democratic" ? "bg-blue-100 text-blue-700" : 
                      politician.party === "Republican" ? "bg-red-100 text-red-700" : 
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {politician.party}
                    </span>
                    
                    {politician.hasData ? (
                      <span className="flex items-center text-green-600 text-sm font-medium">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        Data Available
                      </span>
                    ) : (
                      <span className="flex items-center text-gray-400 text-sm font-medium">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                        </svg>
                        Coming Soon
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Premium CTA card */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Unlock Premium Analysis</h3>
          <p className="mb-6 opacity-90">
            Get access to detailed correlation analysis, data exports, API tokens, and certified commentary for just $25/month.
          </p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition duration-200 shadow-md">
            Join Waitlist
          </button>
        </div>
      </div>
      
      {/* Features section */}
      <div className="max-w-4xl w-full mt-16 mb-8">
        <h2 className="text-2xl font-bold text-purple-600 mb-8 text-center">Why SimpleGOV?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Simplistic Data</h3>
            <p className="text-gray-600">Easy-to-understand political donation and legislation information.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Social Forum</h3>
            <p className="text-gray-600">Engage with others and discuss correlations between political data.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Transparency</h3>
            <p className="text-gray-600">See the connections that matter in a clear, unbiased format.</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full py-8 mt-auto text-center">
        <p className="text-gray-500 text-sm">© 2025 SimpleGov Political Data Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;