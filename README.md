# ⛅ Weather App

A modern, fully responsive weather application built with React and Tailwind CSS. Get real-time weather data and save your favorite locations for quick access.

## 🌟 Features

- **Real-time Weather Data**: Fetch current weather information for any city
- **Weather Display**: Shows temperature, location, and wind speed
- **Save Locations**: Store your favorite cities' weather data locally
- **View History**: See all saved weather records in an organized table
- **Delete Records**: Remove saved weather data with a single click
- **Fully Responsive**: Works seamlessly on mobile (320px), tablet (640px-1024px), and desktop (1280px+)
- **Persistent Storage**: All saved weather data is stored in browser's local storage
- **Beautiful UI**: Modern gradient background with smooth transitions and hover effects
- **Smooth Scrolling**: Integrated Lenis library for smooth scroll experience

## 🛠️ Tech Stack

### Frontend

- **React 19.2.8** - JavaScript library for building user interfaces
- **Tailwind CSS 4.3.3** - Utility-first CSS framework for responsive design
- **Vite 8.2.0** - Next generation frontend build tool
- **Axios 1.19.0** - HTTP client for API requests
- **Lenis 1.3.26** - Smooth scrolling library
- **Lucide React 1.28.0** - Icon library (prepared for future use)

### Developer Tools

- **Oxlint** - Fast, zero-config linter for JavaScript
- **React Plugin for Vite** - Enables HMR (Hot Module Replacement)
- **Tailwind CSS Vite Plugin** - Seamless Tailwind integration with Vite

## 📋 Project Structure

```
Weather-App/
├── src/
│   ├── App.jsx              # Main application component
│   ├── App.css              # App-specific styles (legacy)
│   ├── index.css            # Global styles and Tailwind directives
│   ├── main.jsx             # Application entry point
│   └── assets/              # Asset files directory
├── public/                  # Public static files
├── index.html              # HTML template
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration (auto-generated)
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**

   ```bash
   cd Weather-App
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Run Linter

```bash
npm run lint
```

Checks code quality using Oxlint.

## 📱 Responsive Design

The application is fully responsive with breakpoints optimized for all devices:

| Device       | Width   | Breakpoint | Layout                            |
| ------------ | ------- | ---------- | --------------------------------- |
| Small Mobile | 320px   | Base       | Stacked vertically, full width    |
| Mobile       | 375px   | Base       | Compact padding, responsive text  |
| Large Mobile | 425px   | Base       | Optimized spacing                 |
| Small Tablet | 640px   | `sm:`      | Cards start to flex               |
| Tablet       | 768px   | `md:`      | Medium spacing and typography     |
| Laptop       | 1024px  | `lg:`      | Side-by-side layout, full spacing |
| Desktop      | 1280px+ | `xl:`      | Maximum width constraints         |

### Responsive Features

- ✅ Flexible container: `flex flex-col lg:flex-row` (vertical on mobile, horizontal on desktop)
- ✅ Adaptive padding: `p-4 sm:p-6 md:p-8`
- ✅ Responsive typography: `text-xl sm:text-2xl md:text-3xl`
- ✅ Mobile-optimized table: `overflow-x-auto` with responsive text sizes
- ✅ Touch-friendly buttons: Minimum 44px height on all screens
- ✅ Smooth transitions: All responsive changes animated smoothly

## 💡 Key Features Explained

### 1. Get Weather

- Enter any city name in the input field
- Click "Get Weather" to fetch current weather data
- The app displays:
  - Current temperature in Celsius
  - Location name
  - Wind speed in km/h
- Uses the WeatherStack API for real-time data

### 2. Save Weather Data

- After fetching weather, click "Save" to store the record
- Data is automatically saved to browser's local storage
- Shows a confirmation message upon successful save
- Validation ensures all fields are filled before saving

### 3. Saved Locations Table

- Displays all previously saved weather records
- Shows Location, Temperature, Wind Speed, and Action columns
- Responsive table with horizontal scroll on mobile devices
- Compact display on small screens

### 4. Delete Records

- Click the "Delete" button on any saved record
- Confirmation dialog appears before deletion
- Immediately removes the record from storage and display
- Updates local storage in real-time

### 5. Local Storage

- All saved weather data persists in the browser
- Data survives page refreshes and browser restarts
- Stored as JSON in browser's local storage under key "WeatherData"
- No backend required for data persistence

## 🔌 API Integration

The app uses the **WeatherStack API** for fetching real-time weather data.

### API Details

- **Provider**: WeatherStack (https://weatherstack.com)
- **Endpoint**: `https://api.weatherstack.com/current`
- **Authentication**: API Key-based
- **Data Fetched**:
  - Current temperature
  - Location name and coordinates
  - Wind speed
  - Weather condition (stored in API response)

### How It Works

1. User enters a city name
2. App makes HTTP GET request via Axios
3. API returns weather data in JSON format
4. App parses and displays the data
5. User can save the data or fetch another city

## 🎨 Design Features

### Color Scheme

- **Background**: Gradient (sky-400 → blue-500 → indigo-600)
- **Cards**: White with shadow (`shadow-2xl`)
- **Accents**: Blue for primary actions, red for destructive actions
- **Text**: Gray-800 for headings, gray-700 for body text

### Components

- **Input Field**: Full-width with focus ring and smooth transitions
- **Buttons**: Flex-based layout with hover and active states
- **Cards**: Rounded corners with modern shadow effects
- **Table**: Clean design with border separators and hover states
- **Spacing**: Responsive gaps and padding for visual hierarchy

## 🔐 State Management

The app uses React's built-in hooks for state management:

```javascript
- city: Input field value for city search
- temp: Current temperature display
- location: Current location name
- wind: Current wind speed
- tableData: Array of saved weather records (persisted to localStorage)
```

**No external state management library needed** - React hooks are sufficient for this application's complexity.

## 💾 Browser Local Storage

Data is stored in a structured format:

```json
{
  "WeatherData": [
    {
      "id": 1726234567890,
      "location": "London",
      "temp": 15,
      "wind": 12
    },
    {
      "id": 1726234578901,
      "location": "New York",
      "temp": 22,
      "wind": 8
    }
  ]
}
```

## 🎯 Business Logic

1. **Validation**
   - City name required before fetching weather
   - All fields required before saving
   - Confirmation required before deletion

2. **Data Flow**
   - User input → API call → State update → UI render
   - Save → localStorage update → Table refresh
   - Delete → Confirmation → localStorage update → Table refresh

3. **Error Handling**
   - Alert if city is not entered
   - Alert if API call fails or city not found
   - Validation before save/delete operations

## 🌐 Browser Support

- **Chrome/Edge**: ✅ Full support
- **Firefox**: ✅ Full support
- **Safari**: ✅ Full support
- **Mobile Browsers**: ✅ Full support (iOS Safari, Chrome Mobile, etc.)

## 🚀 Future Enhancements

- [ ] Add weather forecast for next 7 days
- [ ] Multiple weather information (humidity, pressure, UV index)
- [ ] Weather condition icons based on current conditions
- [ ] Temperature unit conversion (Celsius ↔ Fahrenheit)
- [ ] Search history/suggestions
- [ ] Weather alerts and notifications
- [ ] Dark mode toggle
- [ ] Export weather data as CSV/PDF
- [ ] Geolocation-based weather detection
- [ ] Multiple language support
- [ ] User authentication and cloud sync
- [ ] Weather chart/graphs visualization

## 📝 Code Quality

- Uses **React 19** with Strict Mode for development warnings
- Follows **Tailwind CSS** utility-first approach
- Oxlint configured for code quality checks
- Modern ES6+ JavaScript syntax
- Component-based architecture
- Clean, readable, and maintainable code

## 🤝 Contributing

This project is part of the BrainerHub MERN Internship program. Contributions and improvements are welcome!

### Development Workflow

1. Make your changes
2. Run `npm run lint` to check code quality
3. Test on all breakpoints (use browser DevTools)
4. Ensure no horizontal scroll on any screen size
5. Test API integration and localStorage functionality

## 📄 License

This project is created as part of the BrainerHub MERN Internship program.

## 👨‍💻 Author

Created as part of BrainerHub MERN Internship - React JS Module

---

**Happy Weather Checking! 🌤️☀️🌧️**

For more information about the Weather App features and improvements, see the inline code comments in [App.jsx](./src/App.jsx).
