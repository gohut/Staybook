# Staybook Tour Packages Frontend Documentation

## Overview
The Tour Packages module is a comprehensive holiday package booking system within the Staybook application. It allows users to search, browse, customize, and book tour packages across various destinations in India. The module consists of three main pages that guide users through the complete booking journey.

---

## Module Structure

```
Tour_packages/
├── TourPk_pge_2/          # Package Search & Listing Page
├── TourPk_pge_3/          # Package Details & Customization Page
└── TourPk_pge_4/          # Booking & Payment Page
```

---

## Page 1: TourPk_pge_2 - Package Search & Listing

### File: `TourPk_pge_2/TourPkpge2.jsx`

#### Purpose
Main search and listing page for tour packages. Users can search for packages based on destination, dates, and guest requirements.

#### Key Components

##### 1. **HeaderSearch Component**
- **Location**: `Header_search/HeaderSearch.jsx`
- **Functionality**: Search form with the following fields:
  - **Starting From**: Departure city (default: New Delhi)
  - **Going To**: Destination city (default: Goa)
  - **Starting Date**: Date picker for departure
  - **Rooms & Guests**: Guest and room selection (format: "X Adults, Y Rooms")
  - **Search Button**: Triggers package search

##### 2. **FiltersSidebar2 Component**
- **Location**: `Filter_sidebar/FiltersSidebar2.jsx`
- **Functionality**: Advanced filtering options for packages
  - Budget ranges
  - Duration filters
  - Hotel categories
  - Activity types
  - Meal preferences

##### 3. **PackageCard Component**
- **Location**: `Package_card/PackageCard.jsx`
- **Functionality**: Individual package display cards

#### Package Data Structure
Each package contains:
```javascript
{
  id: "unique-package-id",
  title: "Package Name",
  duration: "2N/3D",  // Nights/Days format
  itinerary: "Detailed itinerary",
  destination: "City/State",
  image: "Package image URL",
  hotelCategory: "4 Star Hotel",
  meals: "Meal plan details",
  activities: "Number of activities",
  freebies: ["Complimentary items"],
  bookOffer: "Special booking offer",
  emi: "Monthly EMI amount",
  pricePerPerson: 4660,
  totalPrice: 9320
}
```

#### Features Displayed
- **Package Images**: High-quality destination photos
- **Duration & Itinerary**: Trip length and detailed itinerary
- **Hotel Category**: Star rating and accommodation type
- **Meal Plans**: Included meals (Breakfast, Dinner, etc.)
- **Activities**: Number and type of included activities
- **Freebies**: Complimentary services (Hi-Tea, Trekking, etc.)
- **Pricing**: Per person and total pricing
- **EMI Options**: Monthly installment plans
- **Special Offers**: Limited-time booking discounts

#### Sample Packages Available
1. **Lakeside Wayanad - Terrace Resorts**
   - Duration: 2N/3D
   - Destination: Kerala
   - Price: ₹4,660/person

2. **Goa Beach Escape - Candolim Stay**
   - Duration: 3N/4D
   - Destination: Goa
   - Price: ₹5,980/person

3. **Royal Jaipur Heritage Trail**
   - Duration: 4N/5D
   - Destination: Jaipur + Udaipur
   - Price: ₹8,420/person

---

## Page 2: TourPk_pge_3 - Package Details & Customization

### File: `TourPk_pge_3/Tourpkpge3.jsx`

#### Purpose
Detailed package view with customization options, photo gallery, and booking interface.

#### Key Components

##### 1. **SearchBar Component**
- **Location**: `Search_Bar/SearchBar.jsx`
- **Functionality**: Persistent search bar for package modifications
  - Date selection
  - Guest and room configuration
  - Quick package re-search

##### 2. **PackageGallery Component**
- **Location**: `Packag_Gallery/PackageGallery.jsx`
- **Functionality**: Interactive photo gallery
  - **Main Gallery Display**: Large primary image with thumbnail grid
  - **Image Viewer Modal**: Full-screen image viewing with navigation
  - **Gallery Features**:
    - 8 high-quality destination images
    - Keyboard navigation (Arrow keys, Escape)
    - Thumbnail strip for quick navigation
    - Photo count display
    - Share functionality
  - **Gallery Tabs**: ITINERARY | POLICIES | SUMMARY
  - **Package Tags**: Customizable, Duration, Location

##### 3. **DayPlanSection Component**
- **Location**: `Itenary/DayPlanSection.jsx`
- **Functionality**: Detailed day-by-day itinerary
  - **Trip Summary Bar**: 
    - 5 DAY PLAN
    - 2 TRANSFERS
    - 1 HOTEL
    - 4 MEALS
  - **Daily Breakdown**:
    - Date navigation (06 Feb - 10 Feb)
    - Day-wise activities and inclusions
    - Flight details (arrival information)
    - Transfer arrangements (Airport to Hotel)
    - Hotel accommodations with details
    - Meal plans
  - **Hotel Details**:
    - Name: Turtle Beach Resort - Morjim
    - Rating: ★★★★☆
    - Location: Morjim · 8 minutes walk to Morjim Beach
    - Room Type: Classic Room
    - Amenities: Breakfast, Happy Hours, Food discounts, Welcome drinks
  - **Customization Options**:
    - Remove/Modify transfers
    - Change hotel options
    - Add activities to each day

##### 4. **PriceAndOffers Component**
- **Location**: `Price_offeres/PriceAndOffers.jsx`
- **Functionality**: Pricing and promotional offers
  - **Pricing Display**:
    - Original price: ₹7,947
    - Discount: 6% OFF
    - Current price: ₹7,499/Adult
    - Tax information
  - **Payment Button**: "PROCEED TO PAYMENT"
  - **EMI Options**: No cost EMI @ ₹2,500
  - **Coupon System**:
    - Applied coupon: MOSTWANTED (-₹448)
    - Available coupon: MMTHLD (-₹193)
    - Coupon code input field

---

## Page 3: TourPk_pge_4 - Booking & Payment

### File: `TourPk_pge_4/Tourpkpge4.jsx`

#### Purpose
Final booking page with traveler details, add-ons, and payment summary.

#### Key Components

##### 1. **TravellerDetails Component**
- **Location**: `Travel_details/TravellerDetails.jsx`
- **Functionality**: Passenger information collection
  - Personal details for all travelers
  - Contact information
  - Special requirements
  - Government ID details

##### 2. **PackageAddOns Component**
- **Location**: `Package_addons/PackageAddOns.jsx`
- **Functionality**: Additional services and upgrades
  - Travel insurance options
  - Additional activities
  - Meal upgrades
  - Transfer enhancements
  - Room upgrades

##### 3. **FareSummary Component**
- **Location**: `Fair_summary/FareSummary.jsx`
- **Functionality**: Complete booking summary and payment
  - **Price Updates**:
    - Price drop notification: Rs.660 decrease
    - New total: Rs.22,962 (from Rs.23,622)
    - Non-refundable booking notice
    - No date change availability
  - **Pricing Breakdown**:
    - Grand Total: ₹22,962 (3 Adults, 6% OFF)
    - Basic Cost: ₹7,724 × 3 Travellers = ₹23,172
    - Coupon Discount: -₹1,306 (MOSTWANTED)
    - Fees & Taxes: ₹1,095 (GST 5.0%)
  - **Payment Options**:
    - EMI Available on all payment modes
    - "PROCEED TO PAYMENTS" button
  - **Terms & Conditions**:
    - Cancellation Policy acceptance
    - User Agreement
    - Terms of Service
    - Privacy Policy
  - **Booking Timer**: 08:42 minutes to complete booking

---

## User Journey Flow

### Step 1: Search & Discovery
1. User enters departure city and destination
2. Selects travel dates and guest count
3. Applies filters for budget, duration, preferences
4. browses available packages with detailed information

### Step 2: Package Selection & Customization
1. Clicks on package to view details
2. Explores photo gallery and destination images
3. Reviews detailed day-by-day itinerary
4. Customizes hotel, transfers, and activities
5. Applies coupons and views pricing

### Step 3: Booking & Payment
1. Enters traveler details
2. Selects add-ons and upgrades
3. Reviews complete fare breakdown
4. Accepts terms and conditions
5. Completes payment within time limit

---

## Technical Implementation

### State Management
- **React Hooks**: useState, useEffect, useMemo
- **URL State Management**: Search parameters persisted in URL
- **LocalStorage**: Search state persistence across sessions

### Navigation
- **React Router**: Page navigation and state passing
- **Programmatic Navigation**: navigate() function for page transitions
- **URL Parameters**: Search criteria maintained in URL

### Data Flow
- **Static Data**: Mock package data for development
- **Search State**: Centralized search parameter management
- **Component Props**: Data passed down through component hierarchy

### Styling
- **SCSS**: Modular styling for each component
- **Responsive Design**: Mobile-friendly layouts
- **Component-scoped Styles**: Isolated styling for maintainability

---

## Key Features Summary

### Search & Filter System
- Multi-criteria search (destination, dates, guests)
- Advanced filtering sidebar
- Real-time package filtering
- Search state persistence

### Visual Content
- High-quality image galleries
- Interactive photo viewers
- Destination showcases
- Hotel and activity imagery

### Pricing & Promotions
- Dynamic pricing display
- Coupon system integration
- EMI options
- Discount notifications

### Customization
- Flexible itinerary planning
- Hotel selection and upgrades
- Transfer arrangements
- Activity additions

### Booking Management
- Multi-traveler support
- Add-on services
- Comprehensive fare breakdown
- Time-limited booking offers

---

## Future Enhancements

### Backend Integration
- API integration for real package data
- Dynamic pricing from suppliers
- Real-time availability checking
- Booking confirmation system

### User Experience
- Saved search preferences
- Wishlist functionality
- Recently viewed packages
- Personalized recommendations

### Payment Integration
- Multiple payment gateways
- International payment support
- Refund management
- Booking modification system

---

*Documentation generated on: February 24, 2026*
*Module: Tour Packages (Frontend)*
*Application: Staybook Holiday Booking System*
