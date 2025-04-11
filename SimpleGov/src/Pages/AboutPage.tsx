const AboutPage = () => {
  return (
    <div className="flex-grow p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">About SimpleGOV</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
        <p className="mb-4">
          SimpleGOV addresses the problem of inaccessible, overly complex political data 
          by offering a user-friendly platform that clarifies the links between donations and 
          legislation.
        </p>
        
        <h2 className="text-xl font-semibold mb-2">What We Do</h2>
        <ul className="list-disc pl-5 mb-4">
          <li>Provide simplistic legislation and donation data</li>
          <li>Provide a simple social forum to comment on correlations between this data</li>
        </ul>
        
        <h2 className="text-xl font-semibold mb-2">Our Business Model</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Freemium Model</h3>
            <ul className="list-disc pl-5">
              <li>Donor sort by: organization, amount, and party</li>
              <li>Legislation sort by: bill name, status, and sponsor</li>
              <li>Can view comments and analysis made by certified users</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Premium Model</h3>
            <ul className="list-disc pl-5">
              <li>Begins at $25 per month</li>
              <li>Correlation and Analysis Function</li>
              <li>The chart and graph comparison can be exported</li>
              <li>Certified Researcher and Institute can make comments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;