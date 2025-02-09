import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [budget, setBudget] = useState<any[]>([]); // Initialize as an empty array
  const [finHealthScore, setFinHealthScore] = useState<any>(null);

  // Function to fetch data from the server
  const fetchData = async (dataType: string, setter: React.Dispatch<any>) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get-data/${dataType}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${dataType}`);
      }
      const data = await response.json();
      console.log(`Fetched ${dataType}:`, data); // Debugging: Log the fetched data
      setter(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to update data on the server
  const updateData = async (dataType: string, newData: any) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/update-data/${dataType}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      const result = await response.json();
      if (result.status === "success") {
        fetchData(dataType, dataType === "budget" ? setBudget : setFinHealthScore);
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Effect hook to load initial data
  useEffect(() => {
    fetchData("budget", setBudget);
    fetchData("finHealthScore", setFinHealthScore);
  }, []);

  // Button to update budget
  const handleBudgetUpdate = () => {
    const newBudget = [
      {
          "expense": "Marketing",
          "amount": "$400"
      },
      {
          "expense": "Website",
          "amount": "$250"
      },
      {
          "expense": "Equipment",
          "amount": "$150"
      },
      {
          "expense": "Travel",
          "amount": "$100"
      },
      {
          "expense": "Ads",
          "amount": "$100"
      },
      
  ];
    updateData("budget", newBudget);
  };

  // Button to update financial health score
  const handleFinHealthScoreUpdate = () => {
    const newFinHealth = {
      "score": 85,
      "class": "Great Job!",
      "advisement": "Keep saving and invest in assets.",
    };
    updateData("finHealthScore", newFinHealth);
  };

  // Ensure that `budget` is an array before calling `.map()`
  const isBudgetArray = Array.isArray(budget) && budget.length > 0;

  return (
    <div>
      <h1>Financial Dashboard</h1>

      {/* Budget Section */}
      <div>
        <h2>Budget</h2>
        {Array.isArray(budget) && 4 > 0 ? (
                budget.map((item, index) => (
                    <p key={index}>
              {item.expense} - {item.amount}
            </p>
          ))
        ) : (
          <p>No budget data available or invalid format.</p>
        )}
        <button onClick={handleBudgetUpdate}>Update Budget</button>
      </div>

      {/* Financial Health Score Section */}
      <div>
        <h2>Financial Health Score</h2>
        {Array.isArray(finHealthScore) && finHealthScore.length > 0 ? (
            finHealthScore.map((item, index) => (
              <p key={index}>{item.score} - {item.class} - {item.advisement}</p>
            ))
        ) : (
          <p>Score: 85
          <br />
          Great Job!
          <br />
          Keep saving and invest in assets.
          <br />

          </p>
        )}
        <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => updateData("finHealthScore", [{ score: "100", class: "Amazing!", advisement: "Keep saving!" }])}
          >
            Update Score</button>
      </div>
    </div>
  );
};

export default HomePage;
