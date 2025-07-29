import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Millennium City Centre, Gurugram",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Millennium City Centre, Gurugram",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Millennium City Centre, Gurugram",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];
  // Color palette for cards
  const cardColors = ['#6366f1', '#fbbf24', '#34d399'];

  return (
    <section style={{ width: '100%', background: '#ffffffff', margin: '48px 0 0 0', padding: 0 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <h3 style={{
          textAlign: 'center',
          fontWeight: 800,
          fontSize: 32,
          letterSpacing: 1,
          color: '#22223b',
          marginBottom: 32,
        }}>TOP COMPANIES</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 32,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          {companies.map((element, idx) => (
            <div
              key={element.id}
              style={{
                background: `linear-gradient(135deg, #fff 60%, ${cardColors[idx % cardColors.length]}11 100%)`,
                borderRadius: 18,
                boxShadow: '0 2px 12px rgba(99,102,241,0.08)',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: `2px solid ${cardColors[idx % cardColors.length]}22`,
                minHeight: 180,
                transition: 'box-shadow 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div className="content" style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 12 }}>
                <div className="icon" style={{ fontSize: 38, color: cardColors[idx % cardColors.length] }}>{element.icon}</div>
                <div className="text" style={{ textAlign: 'left' }}>
                  <p style={{ fontWeight: 700, fontSize: 20, color: '#22223b', margin: 0 }}>{element.title}</p>
                  <p style={{ color: '#555', fontWeight: 500, fontSize: 15, margin: 0, marginTop: 4 }}>{element.location}</p>
                </div>
              </div>
              <button
                style={{
                  background: cardColors[idx % cardColors.length],
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 16,
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 24px',
                  marginTop: 12,
                  boxShadow: `0 2px 8px ${cardColors[idx % cardColors.length]}33`,
                  cursor: 'pointer',
                  transition: 'background 0.18s, transform 0.18s',
                }}
                onMouseOver={e => e.currentTarget.style.background = '#22223b'}
                onMouseOut={e => e.currentTarget.style.background = cardColors[idx % cardColors.length]}
              >
                Open Positions {element.openPositions}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCompanies;
