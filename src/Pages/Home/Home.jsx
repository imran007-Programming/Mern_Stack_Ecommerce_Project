import React from "react";
import Catslider from "../../Components/catSlider/Catslider";
import Allproduct from "../../Components/Allproduct/Allproduct";
import NewarivalProducts from "../../Components/NewArivalProducts/NewarivalProducts";
import Modal from "../../Components/Allproduct/Modal";
import Homecontact from "../../Components/Homecontact/Homecontact";
import Banner from "../../Components/Banner/Banner";
import Review from "../../Components/Review/Review";
import FlotingComponentsMobile from "../../Components/Share/FlotingComponentsMobile";


const Home = () => {
  return (
    <div className="container mx-auto sm:px-15 px-2">
      <Banner />

      <Catslider />
      <Allproduct />
     <FlotingComponentsMobile />
      <Modal />
      <NewarivalProducts />
      <Review />
      <Homecontact />
    </div>
  );
};

export default Home;
