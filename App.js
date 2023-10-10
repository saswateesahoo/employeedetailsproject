import React, { useState } from 'react';
import HomePage from './Components/HomePage';
import ResultPage from './Components/ResultPage';
import AnotherPage from './Components/AnotherPage'; 
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [formData, setFormData] = useState({});

  const goToResultPage = (data) => {
    setCurrentPage('result');
    setFormData(data);
  };

  const goToAnotherPage = (data) => {
    setCurrentPage("another"); 
    setFormData(data);
  };

  // const goBackToHomePage = () => {
  //   setCurrentPage("home");
  //   setFormData({});
  // };
  return (
    <div>
      {currentPage === "home" && (
        <HomePage
          goToResultPage={goToResultPage}
          goToAnotherPage={goToAnotherPage}
        />
      )}
      {currentPage === "result" && (
        <ResultPage {...formData} />
      )}
      {currentPage === "another" && (
        <AnotherPage {...formData}  />
      )}
    </div>
  );
}
export default App;
