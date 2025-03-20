import { useState } from 'react';

// Define types for our political data
type DonorData = {
  id: number;
  name: string;
  amount: string;
  numericAmount: number; // Added for proper sorting
  party: string;
};

type LegislationData = {
  id: number;
  billName: string;
  status: string;
  sponsoredBy: string;
};

// Helper function to convert donation strings to numeric values
const convertAmountToNumber = (amountStr: string): number => {
  const valueStr = amountStr.replace(/[$,]/g, '');
  if (valueStr.endsWith('M')) {
    return parseFloat(valueStr.slice(0, -1)) * 1000000;
  } else if (valueStr.endsWith('K')) {
    return parseFloat(valueStr.slice(0, -1)) * 1000;
  }
  return parseFloat(valueStr);
};

// Updated mock data for political donors with numericAmount
const donorMockData: DonorData[] = [
  { id: 1, name: "Citizens for Progress", amount: "$1.2M", numericAmount: 1200000, party: "Democratic" },
  { id: 2, name: "Freedom Foundation", amount: "$950K", numericAmount: 950000, party: "Republican" },
  { id: 3, name: "United Workers PAC", amount: "$780K", numericAmount: 780000, party: "Democratic" },
  { id: 4, name: "National Business Alliance", amount: "$1.5M", numericAmount: 1500000, party: "Republican" },
  { id: 5, name: "Healthcare for All", amount: "$650K", numericAmount: 650000, party: "Democratic" },
  { id: 6, name: "Tech Coalition", amount: "$2.1M", numericAmount: 2100000, party: "Democratic" },
  { id: 7, name: "Energy Independence Fund", amount: "$1.3M", numericAmount: 1300000, party: "Republican" },
  { id: 8, name: "American Teachers Union", amount: "$540K", numericAmount: 540000, party: "Democratic" },
];

// Updated mock data for legislation (more current bills and statuses)
const legislationMockData: LegislationData[] = [
  { id: 1, billName: "Climate Action Plan", status: "Passed", sponsoredBy: "Sen. Johnson" },
  { id: 2, billName: "Infrastructure Investment Act", status: "In Committee", sponsoredBy: "Rep. Williams" },
  { id: 3, billName: "Electoral Reform Bill", status: "Failed", sponsoredBy: "Sen. Martinez" },
  { id: 4, billName: "Small Business Tax Relief", status: "Pending Vote", sponsoredBy: "Rep. Anderson" },
  { id: 5, billName: "Education Funding Act", status: "Passed", sponsoredBy: "Sen. Thompson" },
  { id: 6, billName: "Affordable Healthcare Act", status: "In Committee", sponsoredBy: "Sen. Garcia" },
  { id: 7, billName: "Veterans Support Act", status: "Passed", sponsoredBy: "Rep. Wilson" },
  { id: 8, billName: "Digital Privacy Act", status: "Pending Vote", sponsoredBy: "Sen. Lee" },
];

// Comment type
type Comment = {
  id: number;
  author: string;
  text: string;
  timestamp: string;
};

// Updated mock comments with more recent analysis
const initialComments: Comment[] = [
  { id: 1, author: "Policy Analyst", text: "The Climate Action Plan passage correlates with significant donations from both Tech Coalition and environmental interests.", timestamp: "2025-03-19 14:32" },
  { id: 2, author: "Political Researcher", text: "Small Business Tax Relief has bipartisan support despite polarized funding sources.", timestamp: "2025-03-20 09:15" },
  { id: 3, author: "Data Scientist", text: "Democratic donors contributed 54% of the total funding shown, with Tech Coalition being the largest single contributor.", timestamp: "2025-03-20 11:47" },
];

const App = () => {
  // State for sortable donor data
  const [donorData, setDonorData] = useState<DonorData[]>(donorMockData);
  const [donorSortField, setDonorSortField] = useState<keyof DonorData>("name");
  const [donorSortDirection, setDonorSortDirection] = useState<"asc" | "desc">("asc");
  
  // State for sortable legislation data
  const [legislationData, setLegislationData] = useState<LegislationData[]>(legislationMockData);
  const [legislationSortField, setLegislationSortField] = useState<keyof LegislationData>("billName");
  const [legislationSortDirection, setLegislationSortDirection] = useState<"asc" | "desc">("asc");
  
  // State for comments
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  // State for dropdown visibility
  const [donorDropdownOpen, setDonorDropdownOpen] = useState(false);
  const [legislationDropdownOpen, setLegislationDropdownOpen] = useState(false);

  // Handle sorting for donor data with special handling for amount
  const handleDonorSort = (field: keyof DonorData, direction: "asc" | "desc") => {
    setDonorSortField(field);
    setDonorSortDirection(direction);
    setDonorDropdownOpen(false);
    
    const sortedData = [...donorData].sort((a, b) => {
      // Special handling for amount field to use numericAmount
      if (field === "amount") {
        return direction === "asc" 
          ? a.numericAmount - b.numericAmount
          : b.numericAmount - a.numericAmount;
      }
      
      // Standard string comparison for other fields
      if (a[field] < b[field]) return direction === "asc" ? -1 : 1;
      if (a[field] > b[field]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    
    setDonorData(sortedData);
  };

  // Handle sorting for legislation data
  const handleLegislationSort = (field: keyof LegislationData, direction: "asc" | "desc") => {
    setLegislationSortField(field);
    setLegislationSortDirection(direction);
    setLegislationDropdownOpen(false);
    
    const sortedData = [...legislationData].sort((a, b) => {
      if (a[field] < b[field]) return direction === "asc" ? -1 : 1;
      if (a[field] > b[field]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    
    setLegislationData(sortedData);
  };

  // Handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    
    const currentDate = new Date();
    const timestamp = `${currentDate.toISOString().split('T')[0]} ${currentDate.toTimeString().split(' ')[0].substring(0, 5)}`;
    
    const newCommentObj: Comment = {
      id: comments.length + 1,
      author: "Current User",
      text: newComment.trim(),
      timestamp: timestamp,
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-purple-700 text-white p-4 shadow-md">
        <h1 className="text-4xl font-bold text-center">SimpleGov</h1>
        <p className="text-center text-white-800 text-sm mt-1">March 2025</p>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          {/* Rectangle-Circle-Rectangle Row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            {/* Left Rectangle - Donors */}
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-4 h-96 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-purple-700">Political Donors</h2>
                <div className="relative">
                  <button 
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md flex items-center"
                    onClick={() => setDonorDropdownOpen(!donorDropdownOpen)}
                  >
                    Sort By: {donorSortField === "amount" ? "Amount" : 
                              donorSortField.charAt(0).toUpperCase() + donorSortField.slice(1)}
                    <span className="ml-1">{donorSortDirection === "asc" ? "↑" : "↓"}</span>
                  </button>
                  
                  {donorDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="p-2 border-b border-gray-200 font-medium text-sm text-gray-600">Organization</div>
                      <div className="p-1">
                        <button 
                          className="w-full text-left px-3 py-2 text-sm hover:bg-purple-50"
                          onClick={() => handleDonorSort("name", "asc")}
                        >
                          A to Z
                        </button>
                        <button 
                          className="w-full text-left px-3 py-2 text-sm hover:bg-purple-50"
                          onClick={() => handleDonorSort("name", "desc")}
                        >
                          Z to A
                        </button>
                      </div>
                      
                      <div className="p-2 border-b border-t border-gray-200 font-medium text-sm text-gray-600">Amount</div>
                      <div className="p-1">
                        <button 
                          className="w-full text-left px-3 py-2 text-sm hover:bg-purple-50"
                          onClick={() => handleDonorSort("amount", "asc")}
                        >
                          Low to High
                        </button>
                        <button 
                          className="w-full text-left px-3 py-2 text-sm hover:bg-purple-50"
                          onClick={() => handleDonorSort("amount", "desc")}
                        >
                          High to Low
                        </button>
                      </div>
                      
                      <div className="p-2 border-b border-t border-gray-200 font-medium text-sm text-gray-600">Party</div>
                      <div className="p-1">
                        <button 
                          className="w-full text-left px-3 py-2 text-sm hover:bg-purple-50"
                          onClick={() => handleDonorSort("party", "asc")}
                        >
                          A to Z
                        </button>
                        <button 
                          className="w-full text-left px-3 py-2 text-sm hover:bg-purple-50"
                          onClick={() => handleDonorSort("party", "desc")}
                        >
                          Z to A
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="overflow-y-auto flex-1">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-gray-200">
                      <th className="px-2 py-2 text-left">Organization</th>
                      <th className="px-2 py-2 text-left">Amount</th>
                      <th className="px-2 py-2 text-left">Party</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donorData.map((donor) => (
                      <tr key={donor.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-2 py-2">{donor.name}</td>
                        <td className="px-2 py-2">{donor.amount}</td>
                        <td className="px-2 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${donor.party === "Democratic" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"}`}>
                            {donor.party}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Center Circle - Placeholder image for political data visualization */}
            <div className="w-64 h-64 flex-shrink-0 rounded-full bg-purple-600 flex items-center justify-center shadow-lg border-4 border-white">
              <img src="https://democraticgovernors.org/wp-content/uploads/2019/01/v3_NEWSOM_BLUE.png" alt="Political Data" className="w-64 h-64 rounded-full" />
            </div>

            {/* Right Rectangle - Legislation */}
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-4 h-96 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-purple-700">Legislation</h2>
                <div className="relative">
                  <button 
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md flex items-center"
                    onClick={() => setLegislationDropdownOpen(!legislationDropdownOpen)}
                  >
                    Sort By: {legislationSortField === "billName" ? "Bill" : 
                             legislationSortField === "status" ? "Status" : "Sponsor"} 
                    <span className="ml-1">{legislationSortDirection === "asc" ? "↑" : "↓"}</span>
                  </button>
                  
                  {legislationDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="p-2 border-b border-gray-200 font-medium text-sm text-gray-600">Bill Name</div>
                      <div className="p-1">
                        <button 
                          className="w-full text-left px-3 py-2 text-sm hover:bg-purple-50"
                          onClick={() => handleLegislationSort("billName", "asc")}
                        >
                          A to Z
                        </button>
                        <button 
                          className="w-full text-left px-3 py-2 text-sm hover:bg-purple-50"
                          onClick={() => handleLegislationSort("billName", "desc")}
                        >
                          Z to A
                        </button>
                      </div>
                      
                      <div className="p-2 border-b border-t border-gray-200 font-medium text-sm text-gray-600">Status</div>
                      <div className="p-1">
                        <button 
                          className="w-full text-left px-3 py-2 text-sm hover:bg-purple-50"
                          onClick={() => handleLegislationSort("status", "asc")}
                        >
                          A to Z
                        </button>
                        <button 
                          className="w-full text-left px-3 py-2 text-sm hover:bg-purple-50"
                          onClick={() => handleLegislationSort("status", "desc")}
                        >
                          Z to A
                        </button>
                      </div>
                      
                      <div className="p-2 border-b border-t border-gray-200 font-medium text-sm text-gray-600">Sponsor</div>
                      <div className="p-1">
                        <button 
                          className="w-full text-left px-3 py-2 text-sm hover:bg-purple-50"
                          onClick={() => handleLegislationSort("sponsoredBy", "asc")}
                        >
                          A to Z
                        </button>
                        <button 
                          className="w-full text-left px-3 py-2 text-sm hover:bg-purple-50"
                          onClick={() => handleLegislationSort("sponsoredBy", "desc")}
                        >
                          Z to A
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="overflow-y-auto flex-1">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-gray-200">
                      <th className="px-2 py-2 text-left">Bill</th>
                      <th className="px-2 py-2 text-left">Status</th>
                      <th className="px-2 py-2 text-left">Sponsor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {legislationData.map((bill) => (
                      <tr key={bill.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-2 py-2">{bill.billName}</td>
                        <td className="px-2 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs 
                            ${bill.status === "Passed" ? "bg-green-100 text-green-800" : 
                              bill.status === "Failed" ? "bg-red-100 text-red-800" : 
                              "bg-yellow-100 text-yellow-800"}`}>
                            {bill.status}
                          </span>
                        </td>
                        <td className="px-2 py-2">{bill.sponsoredBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="w-full bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-purple-700 mb-4">Analysis & Comments</h2>
            
            {/* Existing Comments */}
            <div className="mb-6">
              {comments.map((comment) => (
                <div key={comment.id} className="mb-3 pb-3 border-b border-gray-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-purple-600">{comment.author}</span>
                    <span className="text-sm text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>
            
            {/* Add Comment Form */}
            <div className="flex flex-col">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
                placeholder="Add your analysis or comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className="self-end px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                onClick={handleAddComment}
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-purple-700 text-white p-4 text-center">
        <p>© 2025 SimpleGov Political Data Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;