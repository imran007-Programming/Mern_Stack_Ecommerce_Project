import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import "./Checkout.scss";
import location from "./loaction";
// replace these with your real payment logo imports
import codImg from "../../../assest/cod_new.a52482b.png";
import bkashImg from "../../../assest/bkash_new.5654cab.png";
import payImg from "../../../assest/ssl_new.3731056.png";
import { useLocation } from "react-router";
export default function Checkout() {
  const { getCartProduct } = useSelector((state) => state.cart);
  const [cartProducts, setCartProducts] = useState([]);
  const [cities, setCities] = useState(location.Districts);
  const [zones, setZones] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const getlocation = useLocation();
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    zone: "",
    area: "",
    address: "",
    notes: "",
  });
 

  // Fetch areas based on the selected zone
  useEffect(() => {
    if (selectedZone) {
      const filteredPostcode = location?.postCodes?.postcodes.filter(
        (pc) => pc.district_id === selectedZone.district_id
      );
      setAreas(filteredPostcode);
    }
  }, [selectedZone]);

  console.log(getlocation);

  useEffect(() => {
    setCartProducts(getCartProduct || []);
  }, [getCartProduct]);

  // calculate today + 4 days once
  const deliveryDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d;
  }, []);

  const formatDate = (d) => {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  // compute totals
  const subtotal = cartProducts.reduce(
    (sum, p) => sum + p.details.price * (p.quantity || 1),
    0
  );
  const shippingCharge = 0;
  const total = subtotal + shippingCharge;

  // Handle input change for shipping details
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setShippingDetails({
      ...shippingDetails,
      [id]: value,
    });
  };

  // Handle city selection
  const handleCityChange = (e) => {
    const city = JSON.parse(e.target.value);
    setSelectedCity(city);
    setShippingDetails({
      ...shippingDetails,
      city: city.name,
    });

    if (city.name == "Dhaka") {
      const filteteredUpzila = location?.Dhaka?.dhaka.filter(
        (up) => up.district_id === city.id
      );
      setZones(filteteredUpzila);
    } else {
      const filteteredUpzila = location?.Upzila?.upazilas.filter(
        (up) => up.district_id === city.id
      );
      setZones(filteteredUpzila);
    }
  };

  // Handle zone selection
  const handleZoneChange = (e) => {
    const zone = JSON.parse(e.target.value);
    console.log(zone);
    setSelectedZone(zone);
    setShippingDetails({
      ...shippingDetails,
      zone: zone.name,
    });
  };

  // Handle area selection
  const handleAreaChange = (e) => {
    const area = JSON.parse(e.target.value);
    setShippingDetails({
      ...shippingDetails,
      area: area.postOffice,
    });
  };

  // Handle form submission (example for placing an order)
  const handleSubmit = (e) => {
    e.preventDefault();

    // You can send this data to a backend server or process it further here.
  };

  return (
    <div className="container">
      <div className="checkout-grid">
        {/* ── Shipping Details ──────────────────────────────────────── */}
        <div className="shipping-details">
          <h2>Shipping Details</h2>

          {/* Name (full width) */}
          <div className="form-row full">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                value={shippingDetails.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Phone + Email */}
          <div className="form-row two-col">
            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                id="phone"
                type="tel"
                placeholder="01XXXXXXXXX"
                value={shippingDetails.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={shippingDetails.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* City + Zone + Area */}
          <div className="form-row three-col">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <select id="city" onChange={handleCityChange}>
                <option>Select City</option>
                {cities?.districts?.map((city) => (
                  <option key={city.id} value={JSON.stringify(city)}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="zone">Zone *</label>
              <select
                id="zone"
                onChange={handleZoneChange}
                disabled={!selectedCity}
              >
                <option>Select Zone</option>
                {zones.map((zone) => (
                  <option key={zone.id} value={JSON.stringify(zone)}>
                    {zone.bn_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="area">Area</label>
              <select
                id="area"
                disabled={!selectedZone}
                onChange={handleAreaChange}
              >
                <option>Select Area</option>
                {areas.map((area) => (
                  <option key={area.id} value={JSON.stringify(area)}>
                    {area.postOffice}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Address */}
          <div className="form-row full">
            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                placeholder="Full Address…"
                value={shippingDetails.address}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Order Notes */}
          <div className="form-row full">
            <div className="form-group">
              <label htmlFor="notes">Order Notes</label>
              <textarea
                id="notes"
                placeholder="Notes about your order…"
                value={shippingDetails.notes}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* ── Order Summary ──────────────────────────────────────────── */}
        <div className="order-summary">
          <h2>Your Order</h2>

          <table className="order-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((pd, i) => {
                const qty = pd.quantity || 1;
                const lineTotal = pd.details.price * qty;
                return (
                  <tr key={i}>
                    <td>
                      {pd.details.productName} (
                      <span className="small">
                        {qty} × ${pd.details.price.toFixed(2)}
                      </span>
                      )
                    </td>
                    <td>${lineTotal.toFixed(2)}</td>
                  </tr>
                );
              })}

              <tr className="summary-row">
                <td>Subtotal</td>
                <td>${subtotal.toFixed(2)}</td>
              </tr>

              <tr className="summary-row">
                <td>Delivery Charges</td>
                <td>${shippingCharge.toFixed(2)}</td>
              </tr>

              <tr className="summary-row total-row">
                <td>Total</td>
                <td>${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="summary-phone">Phone *</label>
            <input id="summary-phone" type="tel" placeholder="01XXXXXXXXX" />
          </div>

          {/* Coupon */}
          <div className="coupon-group">
            <input id="coupon" type="text" placeholder="Enter coupon code" />
            <button>Apply Coupon</button>
          </div>

          {/* Payment methods */}
          <div className="payment-methods">
            <div className="method">
              <input type="radio" id="cod" name="payment" defaultChecked />
              <label htmlFor="cod">
                <img src={codImg} alt="Cash on Delivery" />
              </label>
            </div>
            <div className="method">
              <input type="radio" id="bkash" name="payment" />
              <label htmlFor="bkash">
                <img src={bkashImg} alt="bKash" />
              </label>
            </div>
            <div className="method">
              <input type="radio" id="online" name="payment" />
              <label htmlFor="online">
                <img src={payImg} alt="Pay Online" />
              </label>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="terms">
            <input type="checkbox" id="agree" />
            <label htmlFor="agree">
              I agree to the <a href="/terms">Terms</a>,{" "}
              <a href="/privacy">Privacy</a> & <a href="/refund">Refund</a>.
            </label>
          </div>

          {/* Place Order Button */}
          <button className="place-order-btn" onClick={handleSubmit}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
