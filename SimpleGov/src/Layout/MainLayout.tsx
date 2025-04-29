import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className=" bg-purple-400 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3">
          
          <Navbar />
        </div>
      </header>

      {/* Main Content - This will render the appropriate page */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">SimpleGOV</h3>
              <p className="text-purple-200 text-sm">
                Providing simplistic political data and analysis to promote transparency in governance.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="text-purple-200 text-sm space-y-2">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/analysis" className="hover:text-white">Analysis</Link></li>
                <li><a href="#" className="hover:text-white">Premium</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact</h3>
              <p className="text-purple-200 text-sm">
                info@simplegov.org<br />
                1-800-SIMPLEGOV<br />
                123 Transparency St<br />
                San Francisco, CA 94103
              </p>
            </div>
          </div>
          
          <div className="border-t border-purple-500 mt-6 pt-6 text-center text-purple-200 text-sm">
            <p>© 2025 SimpleGov Political Data Dashboard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;