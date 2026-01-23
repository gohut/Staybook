
import TopNavbar from "./Top_Navbar/TopNavbar"
import SearchBar from "./Search_Bar/SearchBar"

import ListingsHeader from "./Listing_header/ListingsHeader"
import PropertyCard from "./Property_Cards/PropertyCard"

import "./StaybookSrh.css"
import FiltersSidebar from "./Side_Barfilter/FiltersSidebar";

const StaybookSearchPage = () => {

 const propertyList = [
  {
    id: 1,
    name: "Summit Calangute Resort & Spa",
    starRating: 4.0,
    location: "Calangute | 2.2 km drive to Calangute Beach",
    badge: "Couple Friendly",
    offer: "15% off on session of Spa",
    highlights: [
      "Calm location near beaches",
      "Exceptional food quality",
      "Spacious rooms with ambiance",
    ],
    reviewLabel: "Very Good",
    reviewScore: 3.9,
    totalRatings: 520,
    originalPrice: 3933,
    discountedPrice: 3146,
    taxes: 157,
    ctaText: "Login to Book Now & Pay Later!",
    images: {
      main: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      thumbs: [
        "https://images.unsplash.com/photo-1501117716987-c8e1ecb210c7",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      ],
    },
  },
    {
    id: 1,
    name: "Summit Calangute Resort & Spa",
    starRating: 4.0,
    location: "Calangute | 2.2 km drive to Calangute Beach",
    badge: "Couple Friendly",
    offer: "15% off on session of Spa",
    highlights: [
      "Calm location near beaches",
      "Exceptional food quality",
      "Spacious rooms with ambiance",
    ],
    reviewLabel: "Very Good",
    reviewScore: 3.9,
    totalRatings: 520,
    originalPrice: 3933,
    discountedPrice: 3146,
    taxes: 157,
    ctaText: "Login to Book Now & Pay Later!",
    images: {
      main: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      thumbs: [
        "https://images.unsplash.com/photo-1501117716987-c8e1ecb210c7",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      ],
    },
  },
];

  return (
    <div className="staybook-layout">
      <TopNavbar />
      <SearchBar />

      <div style={{ display: "flex",marginLeft:"120px", width:"fit-content", gap: "20px", padding: "20px 40px" }}>
        <FiltersSidebar />
        <div>
              <ListingsHeader />
              <div className="property-listings">
                <div className="property-listings-inner">
                  {propertyList.map((item, i) => (
                    <PropertyCard key={i} data={item} />
                  ))}
                </div>
              </div>
        </div>
      </div>
    </div>
  );
};

export default StaybookSearchPage;
