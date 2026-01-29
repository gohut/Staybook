const LuxeSelection = () => {
  const luxeCards = [
    {
      title: "Luxe properties in India",
      subtitle: "Explore luxury brands, themes & top picks",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },
    {
      title: "Luxe Villas",
      subtitle: "Premium Villas with Superlative Experience",
      img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    },
    {
      title: "Luxe International",
      subtitle: "Dubai, Maldives, Thailand & More",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
  ];

  const cities = [
    ["Goa", "Delhi", "Bangalore"],
    ["Ooty", "Mumbai", "Shimla"],
    ["Jaipur", "Manali", "Dubai"],
    ["Singapore", "Bangkok", "Pattaya"],
    ["Phuket", "Bali", "Maldives"],
    ["Others"],
  ];

  const container = {
    fontFamily: "Arial, sans-serif",
    padding: "100px 100px",

    
  };

  const luxeBox = {
    background: "#FFF7CC",
    borderRadius: "16px",
    padding: "25px",
    display: "flex",
    alignItems: "center",
    gap: "30px",
    flexWrap: "wrap",
  };

  const titleBox = {
    minWidth: "260px",
  };

  const cardsWrap = {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  };

  const card = {
    width: "200px",
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const cardImg = {
    width: "100%",
    height: "120px",
    objectFit: "cover",
  };

  const cardBody = {
    padding: "10px",
  };

  const cityBox = {
    marginTop: "30px",
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "12px",
  };

  const cityRow = {
    display: "flex",
    gap: "50px",
    flexWrap: "wrap",
  };

  const cityCol = {
    minWidth: "220px",
  };

  const cityItem = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
  };

  const cityImg = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
  };

  return (
    <div style={container}>
      {/* Luxe Section */}
      <div style={luxeBox}>
        <div style={titleBox}>
          <h4 style={{ margin: 0, fontWeight: "normal" }}>INTRODUCING</h4>
          <h2 style={{ margin: "6px 0", color: "#C59B08" }}>
            MMT Luxe <br /> Selections
          </h2>
        </div>

        <div style={cardsWrap}>
          {luxeCards.map((item, i) => (
            <div key={i} style={card}>
              <img src={item.img} alt="" style={cardImg} />
              <div style={cardBody}>
                <strong>{item.title}</strong>
                <p style={{ fontSize: "12px", margin: "4px 0", color: "#555" }}>
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cities Section */}
      <div style={cityBox}>
        <div style={cityRow}>
          {cities.map((group, idx) => (
            <div key={idx} style={cityCol}>
              {group.map((city, i) => (
                <div key={i} style={cityItem}>
                  <img
                    style={cityImg}
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
                    alt=""
                  />
                  <div>
                    <strong>{city}</strong>
                    <div style={{ fontSize: "11px", color: "#666" }}>
                      Hotels, Resorts, Budget Hotels
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LuxeSelection;
