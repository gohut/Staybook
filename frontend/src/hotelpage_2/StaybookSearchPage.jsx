import StaybookLayout from "./StaybookLayout";
import TopNavbar from "./TopNavbar";
import SearchBar from "./SearchBar";
import FiltersSidebar from "./FiltersSidebar";
import ListingsHeader from "./ListingsHeader";
import PropertyListings from "./PropertyListings";

const StaybookSearchPage = () => {
  return (
    <StaybookLayout>
      <TopNavbar />
      <SearchBar />

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "20px", padding: "20px 40px" }}>
        <FiltersSidebar />
        <div>
          <ListingsHeader />
          <PropertyListings />
        </div>
      </div>
    </StaybookLayout>
  );
};

export default StaybookSearchPage;
