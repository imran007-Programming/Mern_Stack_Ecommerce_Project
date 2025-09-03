import React from "react";
import Catslider from "../../Components/catSlider/Catslider";
import Allproduct from "../../Components/Allproduct/Allproduct";
import NewarivalProducts from "../../Components/NewArivalProducts/NewarivalProducts";
import Modal, { MyDialog } from "../../Components/Allproduct/Modal";
import Homecontact from "../../Components/Homecontact/Homecontact";
import Banner from "../../Components/Banner/Banner";

const Home = () => {
  return (
    <>
      <Banner />
      
      <Catslider />
      <Allproduct />

      <Modal />
      <NewarivalProducts />
      <Homecontact />
    </>
  );
};

export default Home;
