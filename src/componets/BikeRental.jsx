import React, { useState } from 'react'

const BikeRental = ({ addBooking }) => {
  const [selectedBike, setSelectedBike] = useState(null)
  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    startDate: '',
    endDate: '',
    days: 1
  })
  const [showBookingForm, setShowBookingForm] = useState(false)

  const bikes = [
    {
      id: 1,
      name: 'Royal Enfield Classic 350',
      image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
      type: 'Cruiser',
      engine: '349cc',
      mileage: '35 km/l',
      price: 800,
      features: ['ABS', 'Electric Start', 'LED Headlight', 'Digital Console'],
      description: 'Classic cruiser bike perfect for long rides and city commuting'
    },
    {
      id: 2,
      name: 'Honda CBR 250R',
      image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
      type: 'Sports',
      engine: '249cc',
      mileage: '30 km/l',
      price: 1200,
      features: ['Fuel Injection', 'Racing Position', 'Disc Brakes', 'Aerodynamic Design'],
      description: 'High-performance sports bike for thrill seekers and racing enthusiasts'
    },
    {
      id: 3,
      name: 'Yamaha FZ-S',
      image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
      type: 'Street',
      engine: '149cc',
      mileage: '45 km/l',
      price: 600,
      features: ['Fuel Injection', 'LED Lighting', 'Single Channel ABS', 'Bluetooth'],
      description: 'Stylish street bike with excellent fuel efficiency and modern features'
    },
    {
      id: 4,
      name: 'TVS Jupiter',
      image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
      type: 'Scooter',
      engine: '109cc',
      mileage: '62 km/l',
      price: 400,
      features: ['Automatic Transmission', 'Under Seat Storage', 'Mobile Charging', 'Eco Mode'],
      description: 'Comfortable and fuel-efficient scooter for daily commuting'
    }
  ]

  const handleBooking = (bike) => {
    setSelectedBike(bike)
    setShowBookingForm(true)
  }

  const calculateDays = (startDate, endDate) => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      return diffDays
    }
    return 1
  }

  const handleDateChange = (e) => {
    const { name, value } = e.target
    const updatedForm = { ...bookingForm, [name]: value }
    
    if (name === 'startDate' || name === 'endDate') {
      const days = calculateDays(
        name === 'startDate' ? value : bookingForm.startDate,
        name === 'endDate' ? value : bookingForm.endDate
      )
      updatedForm.days = days
    }
    
    setBookingForm(updatedForm)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const totalPrice = selectedBike.price * bookingForm.days
    const booking = {
      type: 'Bike',
      item: selectedBike.name,
      customer: bookingForm.customerName,
      email: bookingForm.email,
      phone: bookingForm.phone,
      license: bookingForm.licenseNumber,
      startDate: bookingForm.startDate,
      endDate: bookingForm.endDate,
      duration: bookingForm.days + ' days',
      price: totalPrice
    }
    addBooking(booking)
    alert('Bike booked successfully!')
    setShowBookingForm(false)
    setBookingForm({
      customerName: '',
      email: '',
      phone: '',
      licenseNumber: '',
      startDate: '',
      endDate: '',
      days: 1
    })
  }

  const handleInputChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    })
  }

  if (showBookingForm) {
    return (
      <div className="booking-form-container">
        <div className="booking-form">
          <h2>Book {selectedBike.name}</h2>
          <div className="selected-item-info">
            <img src={selectedBike.image} alt={selectedBike.name} />
            <div>
              <h3>{selectedBike.name}</h3>
              <p>Type: {selectedBike.type}</p>
              <p>Price: ₹{selectedBike.price}/day</p>
            </div>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Customer Name</label>
              <input
                type="text"
                name="customerName"
                value={bookingForm.customerName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={bookingForm.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={bookingForm.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Driving License Number</label>
              <input
                type="text"
                name="licenseNumber"
                value={bookingForm.licenseNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={bookingForm.startDate}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={bookingForm.endDate}
                  onChange={handleDateChange}
                  min={bookingForm.startDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>
            <div className="rental-summary">
              <p><strong>Rental Duration:</strong> {bookingForm.days} days</p>
              <p><strong>Daily Rate:</strong> ₹{selectedBike.price}</p>
            </div>
            <div className="total-price">
              <h3>Total Price: ₹{selectedBike.price * bookingForm.days}</h3>
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setShowBookingForm(false)} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="service-page">
      <div className="service-header">
        <h1>Bike Rental</h1>
        <p>Explore our collection of bikes for every riding style</p>
      </div>
      <div className="items-grid">
        {bikes.map(bike => (
          <div key={bike.id} className="item-card">
            <div className="item-image">
              <img src={bike.image} alt={bike.name} />
              <div className="item-overlay">
                <button 
                  className="book-btn"
                  onClick={() => handleBooking(bike)}
                >
                  Rent Now
                </button>
              </div>
            </div>
            <div className="item-details">
              <h3>{bike.name}</h3>
              <p className="item-description">{bike.description}</p>
              <div className="item-specs">
                <span><strong>Type:</strong> {bike.type}</span>
                <span><strong>Engine:</strong> {bike.engine}</span>
                <span><strong>Mileage:</strong> {bike.mileage}</span>
              </div>
              <ul className="item-features">
                {bike.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="item-price">
                <span className="price">₹{bike.price}</span>
                <span className="period">/day</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BikeRental