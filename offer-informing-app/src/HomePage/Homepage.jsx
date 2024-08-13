import HeroSection from "./Hero";
import MainContent from "./MainContent";
function Homepage ({ token, userType}) {
  return (
    <>
      
      <HeroSection token={token} userType={userType}/>
      <MainContent />
    </>
  );
}

export default Homepage;
