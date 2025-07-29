import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
    { 
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Postions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
    },
  ];
  // Color palette for cards
  const cardColors = [
    '#6366f1', '#fbbf24', '#f472b6', '#34d399', '#60a5fa', '#a78bfa', '#fb7185', '#facc15'
  ];

  return (
    <section style={{ width: '100%', padding: 0 ,background: '#ffffffff',}}>
      <h3 style={{
        textAlign: 'center',
        fontWeight: 800,
        fontSize: 32,
        letterSpacing: 1,
        color: '#22223b',
        marginBottom: 32,
      }}>POPULAR CATEGORIES</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 28,
          width: '100%',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        {categories.map((element, idx) => (
          <div
            key={element.id}
            style={{
              background: `linear-gradient(135deg, ${cardColors[idx % cardColors.length]}22 0%, #fff 100%)`,
              borderRadius: 18,
              boxShadow: '0 2px 12px rgba(99,102,241,0.08)',
              padding: '28px 18px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'transform 0.18s',
              border: `2px solid ${cardColors[idx % cardColors.length]}33`,
              cursor: 'pointer',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div className="icon" style={{ fontSize: 38, color: cardColors[idx % cardColors.length], marginBottom: 10 }}>
              {element.icon}
            </div>
            <div className="text" style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 700, fontSize: 20, color: '#18181aff', margin: 0 }}>{element.title}</p>
              <p style={{ color: cardColors[idx % cardColors.length], fontWeight: 600, fontSize: 15, margin: 0, marginTop: 4 }}>{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
