import React, { useState } from 'react'

const CarRental = ({ addBooking }) => {
  const [selectedCar, setSelectedCar] = useState(null)
  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    startDate: '',
    endDate: '',
    days: 1,
    withDriver: false
  })
  const [showBookingForm, setShowBookingForm] = useState(false)

  const cars = [
    {
      id: 1,
      name: 'Maruti Swift',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      type: 'Hatchback',
      fuel: 'Petrol',
      seating: '5 seater',
      transmission: 'Manual',
      price: 1200,
      features: ['AC', 'Power Steering', 'Central Locking', 'Music System'],
      description: 'Compact and fuel-efficient car perfect for city driving'
    },
    {
      id: 2,
      name: 'Honda City',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      type: 'Sedan',
      fuel: 'Petrol',
      seating: '5 seater',
      transmission: 'Automatic',
      price: 2000,
      features: ['AC', 'Automatic Transmission', 'Touchscreen', 'Rear Camera', 'Airbags'],
      description: 'Premium sedan with automatic transmission and luxury features'
    },
    {
      id: 3,
      name: 'Mahindra Scorpio',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      type: 'SUV',
      fuel: 'Diesel',
      seating: '7 seater',
      transmission: 'Manual',
      price: 2800,
      features: ['4WD', 'High Ground Clearance', 'Captain Seats', '4x4 Drive', 'Rugged Build'],
      description: 'Powerful SUV perfect for family trips and off-road adventures'
    },
    {
      id: 4,
      name: 'BMW 3 Series',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      type: 'Luxury Sedan',
      fuel: 'Petrol',
      seating: '5 seater',
      transmission: 'Automatic',
      price: 5000,
      features: ['Luxury Interior', 'Sunroof', 'Premium Sound', 'Leather Seats', 'Advanced Safety'],
      description: 'Premium luxury sedan for special occasions and business trips'
    }
  ]

  const handleBooking = (car) => {
    setSelectedCar(car)
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
    const driverCost = bookingForm.withDriver ? 500 * bookingForm.days : 0
    const totalPrice = (selectedCar.price * bookingForm.days) + driverCost
    const booking = {
      type: 'Car',
      item: selectedCar.name,
      customer: bookingForm.customerName,
      email: bookingForm.email,
      phone: bookingForm.phone,
      license: bookingForm.licenseNumber,
      startDate: bookingForm.startDate,
      endDate: bookingForm.endDate,
      duration: bookingForm.days + ' days',
      withDriver: bookingForm.withDriver ? 'Yes' : 'No',
      price: totalPrice
    }
    addBooking(booking)
    alert('Car booked successfully!')
    setShowBookingForm(false)
    setBookingForm({
      customerName: '',
      email: '',
      phone: '',
      licenseNumber: '',
      startDate: '',
      endDate: '',
      days: 1,
      withDriver: false
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setBookingForm({
      ...bookingForm,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  if (showBookingForm) {
    const driverCost = bookingForm.withDriver ? 500 * bookingForm.days : 0
    const totalPrice = (selectedCar.price * bookingForm.days) + driverCost

    return (
      <div className="booking-form-container">
        <div className="booking-form">
          <h2>Book {selectedCar.name}</h2>
          <div className="selected-item-info">
            <img src={selectedCar.image} alt={selectedCar.name} />
            <div>
              <h3>{selectedCar.name}</h3>
              <p>Type: {selectedCar.type}</p>
              <p>Price: ₹{selectedCar.price}/day</p>
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
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="withDriver"
                  checked={bookingForm.withDriver}
                  onChange={handleInputChange}
                />
                Include Driver (+₹500/day)
              </label>
            </div>
            <div className="rental-summary">
              <p><strong>Rental Duration:</strong> {bookingForm.days} days</p>
              <p><strong>Car Rate:</strong> ₹{selectedCar.price}/day</p>
              {bookingForm.withDriver && <p><strong>Driver Charges:</strong> ₹500/day</p>}
            </div>
            <div className="total-price">
              <h3>Total Price: ₹{totalPrice}</h3>
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
        <h1>Car Rental</h1>
        <p>Choose from our premium fleet of well-maintained vehicles</p>
      </div>
      <div className="items-grid">
        {cars.map(car => (
          <div key={car.id} className="item-card">
            <div className="item-image">
              <img src={car.image} alt={car.name} />
              <div className="item-overlay">
                <button 
                  className="book-btn"
                  onClick={() => handleBooking(car)}
                >
                  Rent Now
                </button>
              </div>
            </div>
            <div className="item-details">
              <h3>{car.name}</h3>
              <p className="item-description">{car.description}</p>
              <div className="item-specs">
                <span><strong>Type:</strong> {car.type}</span>
                <span><strong>Fuel:</strong> {car.fuel}</span>
                <span><strong>Seating:</strong> {car.seating}</span>
                <span><strong>Transmission:</strong> {car.transmission}</span>
              </div>
              <ul className="item-features">
                {car.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="item-price">
                <span className="price">₹{car.price}</span>
                <span className="period">/day</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CarRental