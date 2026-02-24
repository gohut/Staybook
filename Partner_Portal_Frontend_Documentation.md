# Staybook Partner Portal Frontend Documentation

## Overview
The Partner Portal is a comprehensive hotel management dashboard designed for property partners to manage their hotels, rooms, reservations, and overall business operations. The portal features a modern, professional design with a dark theme and intuitive navigation structure.

---

## Website Theme & Design System

### Color Palette

#### Primary Colors
- **Dark Background**: `#020617` (Deep navy blue)
- **Primary Gradient**: Linear gradient from `#06b6d4` (Cyan) to `#3b82f6` (Blue)
- **Secondary Gradient**: Linear gradient from `#a855f7` (Purple) to `#ec4899` (Pink)

#### Accent Colors
- **Success Green**: Used for positive indicators and confirmations
- **Warning Orange**: Used for alerts and warnings
- **Info Blue**: Used for informational messages
- **Error Red**: Used for error states and notifications

#### Neutral Colors
- **White**: `#ffffff` (Cards, headers, text backgrounds)
- **Light Gray**: `#f8fafc` (Main page background)
- **Border Gray**: `#e5e7eb` (Dividers and borders)
- **Text Gray**: `#6b7280` (Secondary text)
- **Muted Text**: `#94a3b8` (Labels and subtitles)

### Typography
- **Headings**: Font weight 600, clean sans-serif
- **Body Text**: Regular weight, good readability
- **Small Text**: 12px for subtitles and metadata
- **Icons**: Feather Icons (Fi) and Heroicons (Hi) library

### Design Elements
- **Border Radius**: 10px for small elements, 14px for buttons, 18px for cards
- **Shadows**: Subtle box shadows for depth
- **Gradients**: Extensive use of linear gradients for visual appeal
- **Transitions**: Smooth 0.25s ease transitions for interactions

---

## Layout Structure

### Overall Layout
```
┌─────────────────────────────────────────────────────────┐
│                Top Header (PHnavbar)                    │
├─────────────┬───────────────────────────────────────────┤
│             │                                           │
│   Side      │            Main Content Area              │
│ Navigation  │                                           │
│  (PVnavbar) │                                           │
│             │                                           │
│             │                                           │
│             │                                           │
└─────────────┴───────────────────────────────────────────┘
```

### Dimensions
- **Sidebar Width**: 280px (fixed)
- **Header Height**: 70px (fixed)
- **Main Content**: Responsive, takes remaining space
- **Content Padding**: 24px
- **Scrollbar**: Custom 8px width styling

---

## Navigation System

### Vertical Navigation Bar (PVnavbar)
**File**: `Navbars/PVnavbar.jsx`

#### Logo Section
- **StayBook Branding**: Logo icon with text
- **Partner Portal Subtitle**: Indicates portal type
- **Logo Styling**: Gradient background (Cyan to Blue)

#### Navigation Items
| Section | Icon | Label | Access Level |
|---------|------|-------|--------------|
| Dashboard | FiHome | Dashboard | Full Partner |
| Property Management | FiGrid | Property Management | All |
| Photos & Media | FiImage | Photos & Media | Full Partner |
| Reviews | FiStar | Reviews | Full Partner |
| Availability & Pricing | FiCalendar | Availability & Pricing | Full Partner |
| Reservations | FiBook | Reservations | All |
| Completed & No-Shows | FiCheckCircle | Completed & No-Shows | Full Partner |
| Notifications | FiBell | Notifications | Full Partner |
| Settings | FiSettings | Settings | All |

#### Hotel Profile Section
- **Hotel Avatar**: GP (Grand Plaza)
- **Hotel Name**: Grand Plaza Hotel
- **Location**: Miami Beach, FL
- **Styling**: Gradient background (Purple to Pink)

### Top Header Bar (PHnavbar)
**File**: `Navbars/PHnavbar.jsx`

#### Left Section
- **Page Title**: Dynamic based on active section
- **Styling**: Large, bold text

#### Right Section
- **Search Bar**: 
  - Icon: FiSearch
  - Placeholder: "Search reservations..."
  - Background: Light gray `#f3f4f6`
  - Rounded corners: 10px

- **Notifications Bell**:
  - Icon: FiBell
  - Badge: Red circle with count (2)
  - Interactive hover states

- **User Profile**:
  - Avatar: Blue circle with initials "PM"
  - Name: Property Manager
  - Email: manager@grandplaza.com
  - Dropdown indicator: FiChevronDown

---

## Main Sections & Functionality

### 1. Dashboard Section
**File**: `Dashboard/PartnerDashboard.jsx`

#### Key Metrics Cards
- **Total Rooms**: 48 rooms
- **Available Today**: 12 rooms
- **Active Reservations**: 4 reservations
- **Check-ins Today**: 2 guests

#### Revenue Analytics
- **Average Nightly Rate**: $285 (↑ 12% vs last month)
- **Occupancy Rate**: 75% (↑ 5% vs last month)
- **Total Revenue (Jan)**: $45,280 (↑ 18% vs Dec)

#### Today's Operations
##### Check-ins Card
- **Guest**: Emily Rodriguez
- **Time**: 3:00 PM
- **Room**: Family Suite
- **Details**: 4 guests · 3 nights

##### Check-outs Card
- **Guest**: David Thompson
- **Time**: 11:00 AM
- **Room**: Deluxe Ocean View
- **Payment**: $500 · paid

#### Room Status Overview
**Room Types Available**:
- **Deluxe Ocean View**: 15 total, 2 occupied, 13 available (13% occupancy)
- **Executive Suite**: 8 total, 3 occupied, 5 available (38% occupancy)
- **Standard Double**: 20 total, 2 occupied, 18 available (10% occupancy)
- **Family Suite**: 5 total, 1 occupied, 4 available (20% occupancy)

#### Recent Reservations Table
**Columns**: Guest, Room Type, Check-in, Check-out, Status
**Sample Data**:
- John Anderson (RES-2024-001) - Deluxe Ocean View - 20/01/2026 to 23/01/2026
- Sarah Mitchell (RES-2024-002) - Executive Suite - 18/01/2026 to 21/01/2026

#### Alert System
- **Low Availability**: Only 2 Deluxe Ocean View rooms available this weekend
- **Upcoming Check-ins**: 2 guests checking in today
- **Occupancy Rate**: Current occupancy at 75%

### 2. Property Management Section
**File**: `Property_Management/PropertyManagement.jsx`

#### Hotel Information Management
- **Basic Details**:
  - Name: Grand Plaza Hotel
  - Email: info@grandplaza.com
  - Address: 123 Ocean Drive, Miami Beach, FL 33139
  - Phone: +1 (305) 555-0123
  - Coordinates: Latitude/Longitude fields
  - Check-in/Check-out times: 15:00 / 11:00
  - Star Rating: 5 stars
  - Description: Luxury beachfront living description

#### Room Type Management
**Sample Room Types**:
1. **Deluxe Ocean View**
   - Bed: King Bed
   - Price: $250/night
   - Capacity: 2 guests
   - Total Rooms: 15
   - Amenities: Wi-Fi, AC, Smart TV, Mini Bar, Ocean View, Balcony

2. **Executive Suite**
   - Bed: King Bed + Sofa Bed
   - Price: $450/night
   - Capacity: 4 guests
   - Total Rooms: 8

#### Features
- **CRUD Operations**: Create, Read, Update, Delete for hotels and rooms
- **Photo Upload**: Multiple image uploads for hotel gallery
- **Amenities Management**: Comprehensive amenity selection
- **Pricing Configuration**: Dynamic pricing per room type
- **Read-only Mode**: Available for sub-partners

### 3. Photos & Media Section
**File**: `Photos_Media/Photosmedia.jsx`

#### Media Management
- **Photo Gallery**: Upload and manage hotel photos
- **Image Organization**: Categorize by room types and areas
- **Bulk Upload**: Multiple file selection
- **Image Preview**: Lightbox viewer for photos
- **Delete & Replace**: Remove and update images

### 4. Reviews Section
**File**: `Reviews/Reviews.jsx`

#### Review Management
- **Guest Reviews**: Display customer feedback
- **Rating System**: 5-star rating display
- **Review Responses**: Ability to respond to reviews
- **Review Analytics**: Average ratings and review counts
- **Filter & Sort**: By date, rating, status

### 5. Availability & Pricing Section
**File**: `Availability_Pricing/Availabilitypr.jsx`

#### Pricing Management
- **Dynamic Pricing**: Set different rates for different dates
- **Seasonal Pricing**: Special rates for peak seasons
- **Availability Calendar**: Visual calendar interface
- **Bulk Updates**: Apply pricing changes to multiple dates
- **Competitor Analysis**: Rate comparison tools

#### Availability Control
- **Room Availability**: Mark rooms as available/unavailable
- **Minimum Stay**: Set minimum night requirements
- **Check-in/Check-out Restrictions**: Day-specific restrictions

### 6. Reservations Section
**File**: `Reservation/Reservation.jsx`

#### Reservation Management
- **Booking List**: Comprehensive reservation overview
- **Search & Filter**: By guest name, date, status
- **Status Management**: Confirm, cancel, modify bookings
- **Guest Information**: Contact details and special requests
- **Payment Status**: Track payment completion

#### Reservation Statistics
- **Total Bookings**: Overall booking count
- **Confirmed Reservations**: Active confirmed bookings
- **Pending Actions**: Bookings requiring attention
- **Revenue Tracking**: Booking revenue analytics

### 7. Completed & No-Shows Section
**File**: `Complete_No_shows/CompletedNosw.jsx`

#### Historical Data
- **Completed Stays**: Past guest history
- **No-Show Tracking**: Guests who didn't arrive
- **Revenue Analysis**: Actual vs expected revenue
- **Guest Patterns**: Repeat guest identification

### 8. Notifications Section
**File**: `Notifications/Notification.jsx`

#### Notification System
- **Real-time Alerts**: Instant booking notifications
- **System Messages**: Platform updates and announcements
- **Email Notifications**: Integration with email system
- **Notification History**: Past notifications log

### 9. Settings Section
**File**: `Settings/PartnerSettings.jsx`

#### Configuration Options
- **Profile Settings**: Update hotel and contact information
- **Payment Settings**: Bank account and payment preferences
- **Notification Preferences**: Choose notification types
- **Security Settings**: Password and access control
- **Integration Settings**: Third-party service connections

---

## User Role Management

### Access Control
The portal supports two user roles:

#### Full Partner
- **Access**: All sections and features
- **Capabilities**: Full CRUD operations, settings management
- **Default Section**: Dashboard

#### Sub-Partner
- **Limited Access**: Property, Reservations, Settings only
- **Restrictions**: Read-only property management
- **Default Section**: Reservations

---

## Interactive Features

### State Management
- **Active Section Tracking**: Current page state management
- **Role-based Rendering**: Dynamic content based on user role
- **Search Functionality**: Real-time search across reservations
- **Filter Systems**: Advanced filtering for data tables

### User Experience
- **Responsive Design**: Mobile-friendly layouts
- **Loading States**: Skeleton loaders during data fetching
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Confirmation messages for actions

### Data Visualization
- **Progress Bars**: Visual occupancy indicators
- **Status Badges**: Color-coded status indicators
- **Statistical Cards**: Key performance metrics
- **Charts & Graphs**: Revenue and occupancy trends

---

## Technical Implementation

### Component Architecture
- **Modular Design**: Separate components for each section
- **Reusable Components**: Shared UI components across sections
- **Prop-based Configuration**: Flexible component behavior
- **State Management**: React hooks for local state

### Styling Approach
- **SCSS Modules**: Scoped styling for components
- **CSS Variables**: Consistent color theming
- **Responsive Grid**: Flexible layout system
- **Animation Effects**: Smooth transitions and hover states

### Integration Points
- **API Integration**: RESTful API connections
- **File Upload**: Multi-file upload capabilities
- **Real-time Updates**: WebSocket connections for live data
- **Authentication**: JWT-based security

---

## Key Features Summary

### Visual Design
- **Modern Dark Theme**: Professional navy blue background
- **Gradient Accents**: Vibrant cyan-to-blue gradients
- **Consistent Spacing**: 24px content padding standard
- **Intuitive Icons**: Feather and Hero icon libraries

### Functional Capabilities
- **Complete Hotel Management**: End-to-end property administration
- **Reservation System**: Comprehensive booking management
- **Analytics Dashboard**: Real-time business metrics
- **Role-based Access**: Flexible permission system

### User Experience
- **Intuitive Navigation**: Clear section organization
- **Quick Actions**: One-click common operations
- **Search & Filter**: Powerful data discovery tools
- **Mobile Responsive**: Works on all device sizes

---

## Future Enhancements

### Advanced Features
- **Multi-property Support**: Manage multiple hotels
- **Channel Manager Integration**: Connect to booking platforms
- **Advanced Analytics**: AI-powered insights
- **Mobile App**: Native mobile application

### User Experience
- **Onboarding Wizard**: Guided setup for new partners
- **Help Center**: Integrated documentation and support
- **Customizable Dashboard**: Personalizable widget layout
- **Offline Mode**: Basic functionality without internet

---

*Documentation generated on: February 24, 2026*
*Module: Partner Portal (Frontend)*
*Application: Staybook Hotel Management System*
