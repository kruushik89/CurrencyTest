import React, {useEffect} from 'react';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {
  useEffect(() => {
    console.log('useEffect');
  }, [])
  return (
    <div className="App" style={{"display": "flex", flexDirection: "column", height: "100vh", justifyContent: "space-between"}}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
