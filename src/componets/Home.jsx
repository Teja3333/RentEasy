import React from 'react'

const Home = ({ setCurrentPage }) => {
  const services = [
    {
      id: 'halls',
      title: 'Hall Booking',
      description: 'Book premium halls for weddings, conferences, and special events',
      icon: '🏢',
      features: ['Wedding Halls', 'Conference Rooms', 'Party Venues', 'Corporate Events'],
      price: 'Starting from ₹5,000/day'
    },
    {
      id: 'bikes',
      title: 'Bike Rental',
      description: 'Rent bikes for daily commute, weekend trips, and adventures',
      icon: '🚲',
      features: ['Sports Bikes', 'Cruisers', 'Scooters', 'Electric Bikes'],
      price: 'Starting from ₹200/day'
    },
    {
      id: 'cars',
      title: 'Car Rental',
      description: 'Premium cars for business trips, family outings, and travel',
      icon: '🚗',
      features: ['Sedans', 'SUVs', 'Hatchbacks', 'Luxury Cars'],
      price: 'Starting from ₹1,000/day'
    },
    {
      id: 'construction',
      title: 'Construction Services',
      description: 'Heavy machinery and construction equipment for all your building needs',
      icon: '🏗️',
      features: ['Excavators', 'Cranes', 'Bulldozers', 'Concrete Mixers'],
      price: 'Starting from ₹3,000/day'
    }
  ]

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to RentEase</h1>
          <p>Your premier destination for hall bookings and vehicle rentals</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Venues & Vehicles</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div className="service-price">{service.price}</div>
                <button 
                  className="service-btn"
                  onClick={() => setCurrentPage(service.id)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose RentEase?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3>Instant Booking</h3>
              <p>Book your preferred venue or vehicle instantly with real-time availability</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing with transparent billing and no hidden charges</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🛡️</div>
              <h3>Secure & Safe</h3>
              <p>All bookings are secure with insurance coverage and safety standards</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🎯</div>
              <h3>Quality Assured</h3>
              <p>Premium quality venues and well-maintained vehicles for your needs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home