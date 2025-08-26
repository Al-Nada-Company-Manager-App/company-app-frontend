import React from "react";
import "../../styles/landing.css";
import LandingImage from "../../assets/LandingImage.png";
// import "../../styles/sign.css";

interface FeatureProps {
  title: string;
  desc: string;
}

const Feature: React.FC<FeatureProps> = ({ title, desc }) => (
  <div className="flex flex-col items-start gap-2 w-[1000px]">
    <h3 className="text-white text-[24px] leading-[33px] w-full">
      {title}
    </h3>
    <p className="text-white text-[16px] leading-[21px]">
      {desc}
    </p>
  </div>
);

const LandingPage = () => {
  return (
    <div className="landing-bg h-screen w-screen overflow-hidden relative">
      <div className="absolute blue-grow"></div>
      <div className="absolute purple-grow"></div>
      <img
        src={LandingImage}
        alt=""
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -mt-14 w-[1400px] h-[1400px] pointer-events-none select-none drop-shadow-[0_0_80px_rgba(124,0,255,0.6)]"
      />

      <div className="absolute left-[80px] top-[50px] w-[550px] h-[420px] flex flex-col items-start gap-6 px-14 py-10 rounded-[24px] bg-[linear-gradient(124.42deg,rgba(0,0,0,0.36)_5.12%,rgba(0,0,0,0.0675)_102.99%)] backdrop-blur-sm">
        <h1 className="text-white text-[40px] leading-[48px] font-normal w-[400px]">
          Manage Your Sales,
          <br /> Purchases & Stock <br /> All in One Place
        </h1>
        <p className="text-white text-[16px] leading-[24px] w-[350px]">
          Al Nada Scientific Office’s internal platform helps you track
          products, monitor stock levels, record purchases and sales, and
          streamline every step of your operations — anytime, anywhere.
        </p>
        <button className="bg-[#570374] text-white text-[16px] px-12 py-3 rounded-[20px] shadow-[0_0_20px_rgba(0,0,0,0.25)]">
          Start Managing
        </button>
      </div>

      <div
        className="absolute left-[80px] top-[500px] w-[1328px] h-[205px] flex flex-row justify-center items-center gap-[90px] px-14 py-6 rounded-[32px] bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0)_100%)] backdrop-blur-sm"
        style={{
          boxShadow: `
            inset 0 0 0 1px transparent,
            0.5px 0.5px 0px 1px #541A67,
            0.2px 0.5px 0px 1.3px #3D78FF`,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)",
          backdropFilter: "blur(4px)",
        }}
      >
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
};

export default LandingPage;
