// FiltersSidebar.jsx
import "./FiltersSidebar.css";

const Section = ({ title, children }) => (
  <div className="filter-section">
    <h4>{title}</h4>
    {children}
  </div>
);

const Item = ({ label, count }) => (
  <div className="filter-item">
    <div style={{display:"flex",fontSize:"15px" ,width:"240px",justifyContent: "center",alignItems:"center"}}>
       <input type="checkbox" />
       <div className="label">{label}</div>
    </div>
    {count !== undefined && <span className="count">({count})</span>}
  </div>
);


export default function FiltersSidebar() {
  return (
    <aside className="filters-sidebar">
      <div className="map-box">
        <div className="map-preview" />
        <button className="map-btn">EXPLORE ON MAP</button>
      </div>

      <div className="search-box">
        <input placeholder="Search for locality / hotel name" />
      </div>

      <Section title="Suggested For You">
        <Item label="Rush Deal" count={420} />
        <Item label="Last Minute Deals" />
        <Item label="5 Star" count={134} />
        <Item label="North Goa" />
        <Item label="Resorts" count={304} />
        <Item label="Unmarried Couples Allowed" count={2276} />
        <Item label="Free Cancellation" count={821} />
        <Item label="Calangute" />
        <Item label="Candolim" />
        <Item label="Baga" />
        <Item label="Anjuna" />
        <Item label="Panjim" />
        <Item label="South Goa" />
      </Section>

      <Section title="Price per night">
        <Item label="₹ 0 - ₹ 2500" count={696} />
        <Item label="₹ 2500 - ₹ 5500" count={741} />
        <Item label="₹ 5500 - ₹ 8000" count={186} />
        <Item label="₹ 8000 - ₹ 15000" count={298} />
        <Item label="₹ 15000 - ₹ 30000" count={211} />
        <Item label="₹ 30000+" count={133} />
        <div className="budget">
          <input placeholder="Min" />
          <span>to</span>
          <input placeholder="Max" />
          <button>→</button>
        </div>
      </Section>

      <Section title="Star Category">
        <Item label="3 Star" count={691} />
        <Item label="4 Star" count={298} />
        <Item label="5 Star" count={134} />
      </Section>

      <Section title="User Rating">
        <Item label="Excellent: 4.2+" count={573} />
        <Item label="Very Good: 3.5+" count={1370} />
        <Item label="Good: 3+" count={1624} />
      </Section>

      <Section title="Property Type">
        <Item label="Hotel" count={654} />
        <Item label="Apartment" count={611} />
        <Item label="Villa" count={502} />
        <Item label="Resort" count={304} />
        <Item label="Homestay" count={153} />
        <Item label="Cottage" count={91} />
        <Item label="Hostel" count={72} />
        <Item label="Camp" count={4} />
        <Item label="Houseboat" count={0} />
      </Section>

      <Section title="Top locations">
        <Item label="North Goa" />
        <Item label="South Goa" />
        <Item label="Baga Beach" />
        <Item label="Calangute Beach" />
        <Item label="Candolim Beach" />
        <Item label="Panjim" />
        <Item label="Vagator" />
        <Item label="Palolem Beach" />
        <Item label="Anjuna Beach" />
        <Item label="Candolim" />
      </Section>
    </aside>
  );
}
