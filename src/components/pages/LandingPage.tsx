import React from "react";

interface FeatureProps {
  title: string;
  desc: string;
}

const Feature: React.FC<FeatureProps> = ({ title, desc }) => (
  <div className="feature">
    <h3 className="feature-title">{title}</h3>
    <p className="feature-desc">{desc}</p>
  </div>
);

const LandingPage = () => {
  return (
    <div className="landing">
      <div className="blue-grow"></div>
      <div className="purple-grow"></div>
      <img src={"../../assets/LandingImage.png"} alt="" className="glow" />

      <div className="content">
        <h1 className="landing-title">
          Manage Your Sales, Purchases & Stock <br /> All in One Place
        </h1>
        <p className="landing-desc">
          Al Nada Scientific Office’s internal platform helps you track
          products, monitor stock levels, record purchases and sales, and
          streamline every step of your operations — anytime, anywhere.
        </p>
        <button className="landing-btn">Start Managing</button>
      </div>

      <div className="features">
        <Feature
          title="Product Inventory"
          desc="View, update, and control all items in stock with real-time data."
        />
        <Feature
          title="Sales Tracking"
          desc="Log and monitor all outgoing sales with accurate records."
        />
        <Feature
          title="Purchase Management"
          desc="Record supplier orders and keep track of incoming products."
        />
        <Feature
          title="Reports & Analytics"
          desc="Generate detailed summaries to make informed business decisions."
        />
      </div>
    </div>
  );
}

export default LandingPage;
