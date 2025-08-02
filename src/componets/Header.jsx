import React from 'react'

const Header = ({ currentPage, setCurrentPage, bookingsCount }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'halls', label: 'Halls', icon: '🏢' },
    { id: 'bikes', label: 'Bikes', icon: '🚲' },
    { id: 'cars', label: 'Cars', icon: '🚗' },
    { id: 'construction', label: 'Construction', icon: '🏗️' },
    { id: 'bookings', label: `Bookings (${bookingsCount})`, icon: '📋' }
  ]

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>RentEase</h1>
          <span>Your One-Stop Rental Solution</span>
        </div>
        <nav className="nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header