import PropertyCard from "./PropertyCard";
import "./PropertyListings.css";

const mockData = [
  {
    name: "Summit Calangute Resort & Spa",
    location: "Calangute | 2.2 km to Calangute Beach",
    price: "3146",
    rating: "3.9",
    image: "https://via.placeholder.com/300",
    offers: ["15% off on session of Spa", "Calm location near beaches"],
  },
];

const PropertyListings = () => {
  return (
    <div className="property-listings">
      <div className="property-listings-inner">
        {mockData.map((item, i) => (
          <PropertyCard key={i} data={item} />
        ))}
      </div>
    </div>
  );
};

export default PropertyListings;
