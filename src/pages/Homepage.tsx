import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="h-screen bg-gray-100">
      <header className="flex justify-end p-4 bg-white shadow-md">
        <button className="mr-4 text-blue-500 hover:underline">Profile</button>
        <button className="text-red-500 hover:underline">Logout</button>
      </header>
      <main className="flex items-center justify-center h-full">
        <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
      </main>
    </div>
  );
};

export default HomePage;
