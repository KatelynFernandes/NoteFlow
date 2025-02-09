import React, { useState, useEffect } from "react";

const HomePage: React.FC = () => {
  // State for multiple JSON data
  const [budget, setBudget] = useState<any[]>([]);
  const [finHealth, setFinHealth] = useState<any[]>([]);

  // Function to fetch data for a specific type (budget, finHealthScore, etc.)
  const fetchData = async (dataType: string, setData: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get-data/${dataType}`);
      if (!response.ok) throw new Error(`Error fetching ${dataType}: ${response.statusText}`);
      
      const jsonData = await response.json();
      console.log(`Fetched ${dataType}:`, jsonData);

      if (Array.isArray(jsonData)) {
        setData(jsonData);
      } else {
        setData(jsonData[dataType] || []);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Function to update a specific data type
  const updateData = async (dataType: string, newData: any) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/update-data/${dataType}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (!response.ok) throw new Error(`Error updating ${dataType}: ${response.statusText}`);
      const result = await response.json();
      console.log(result); 

      console.log(`Updated ${dataType}`);

      if (result.status === "success") {
      setTimeout(() => fetchData(dataType, dataType === "budget" ? setBudget : setFinHealth), 500); // Refresh the updated data
      setTimeout(() => fetchData(dataType, dataType === "finHealthScore" ? setFinHealth : setBudget), 500); // Refresh the updated dat
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };
  useEffect(() => {
    fetchData("budget", setBudget);
    fetchData("finHealthScore", setFinHealth);
  }, []);

  return (
    <div className="h-screen bg-gray-100">
      <header className="flex justify-end p-4 bg-white shadow-md">
        <button className="mr-4 text-blue-500 hover:underline">Profile</button>
        <button className="text-red-500 hover:underline">Logout</button>
      </header>

      <main className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold">Welcome to the Home Page</h1> 
        <h2 className="text-2xl mt-6">Your Personalized Financial Planning</h2>

        {/* Budget Section */}
        <div className="mt-4 p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-semibold">Budget</h2>
          {Array.isArray(budget) && budget.length > 0 ? (
            budget.map((item, index) => (
              <p key={index}>{item.expense} - ${item.amount}</p>
            ))
          ) : (
            <p>Loading Budget...</p>
          )}
          <button onClick={() => updateData("budget", [{ expense: "Travel", amount: 200 }])}>
          Update Budget
          </button>
        </div>

        {/* Financial Health Score Section */}
        <div className="mt-4 p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-semibold">Financial Health Score</h2>
          {Array.isArray(finHealth) && finHealth.length > 0 ? (
            finHealth.map((item, index) => (
              <p key={index}>{item.score} - {item.class} - {item.advisement}</p>
            ))
          ) : (
            <p>Loading Score...</p>
          )}
          <button 
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => updateData("finHealthScore", [{ score: "100", class: "Amazing!", advisement: "Keep saving!" }])}
          >
            Update Score
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
