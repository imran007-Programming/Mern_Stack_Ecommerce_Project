import React from "react";
import Marquee from "react-fast-marquee";

const CouponBanner = () => {
  return (
    <div className="fixed top-0 z-50! left-0 w-full">
        <Marquee  gradient={false} speed={100}>
      🎉 Use Coupon Code <span style={{ color: "red", margin: "0 10px" }}>DISCOUNT10</span> 
      & Save 10% Today! 🎉
    </Marquee>
    </div>
  );
};

export default CouponBanner;
