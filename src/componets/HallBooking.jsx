import React, { useState } from 'react'

const HallBooking = ({ addBooking }) => {
  const [selectedHall, setSelectedHall] = useState(null)
  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    guests: '',
    duration: '4'
  })
  const [showBookingForm, setShowBookingForm] = useState(false)

  const halls = [
    {
      id: 1,
      name: 'Grand Ballroom',
      image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg',
      capacity: '200-500 guests',
      area: '5000 sq ft',
      price: 15000,
      features: ['Air Conditioning', 'Sound System', 'Stage', 'Parking', 'Catering Kitchen'],
      description: 'Elegant ballroom perfect for weddings and large celebrations'
    },
    {
      id: 2,
      name: 'Conference Center',
      image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg',
      capacity: '50-150 guests',
      area: '2000 sq ft',
      price: 8000,
      features: ['Projector', 'WiFi', 'Air Conditioning', 'Whiteboard', 'Coffee Station'],
      description: 'Modern conference facility for corporate events and meetings'
    },
    {
      id: 3,
      name: 'Garden Pavilion',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
      capacity: '100-300 guests',
      area: '3000 sq ft',
      price: 12000,
      features: ['Garden View', 'Outdoor Seating', 'Fairy Lights', 'Bar Counter', 'Dance Floor'],
      description: 'Beautiful outdoor venue with garden views for intimate celebrations'
    },
    {
      id: 4,
      name: 'Luxury Banquet',
      image: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      capacity: '300-800 guests',
      area: '8000 sq ft',
      price: 25000,
      features: ['Crystal Chandeliers', 'Premium Sound System', 'Bridal Suite', 'Valet Parking', 'Five Star Catering'],
      description: 'Luxurious banquet hall for grand weddings and premium events'
    }
  ]

  const handleBooking = (hall) => {
    setSelectedHall(hall)
    setShowBookingForm(true)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const totalPrice = selectedHall.price * parseInt(bookingForm.duration)
    const booking = {
      type: 'Hall',
      item: selectedHall.name,
      customer: bookingForm.customerName,
      email: bookingForm.email,
      phone: bookingForm.phone,
      date: bookingForm.eventDate,
      duration: bookingForm.duration + ' hours',
      guests: bookingForm.guests,
      eventType: bookingForm.eventType,
      price: totalPrice
    }
    addBooking(booking)
    alert('Hall booked successfully!')
    setShowBookingForm(false)
    setBookingForm({
      customerName: '',
      email: '',
      phone: '',
      eventDate: '',
      eventType: '',
      guests: '',
      duration: '4'
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
          <h2>Book {selectedHall.name}</h2>
          <div className="selected-item-info">
            <img src={selectedHall.image} alt={selectedHall.name} />
            <div>
              <h3>{selectedHall.name}</h3>
              <p>Capacity: {selectedHall.capacity}</p>
              <p>Price: ₹{selectedHall.price}/4 hours</p>
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
              <label>Event Date</label>
              <input
                type="date"
                name="eventDate"
                value={bookingForm.eventDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="form-group">
              <label>Event Type</label>
              <select
                name="eventType"
                value={bookingForm.eventType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Event Type</option>
                <option value="Wedding">Wedding</option>
                <option value="Conference">Conference</option>
                <option value="Birthday Party">Birthday Party</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Expected Guests</label>
              <input
                type="number"
                name="guests"
                value={bookingForm.guests}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label>Duration (hours)</label>
              <select
                name="duration"
                value={bookingForm.duration}
                onChange={handleInputChange}
              >
                <option value="4">4 hours</option>
                <option value="6">6 hours</option>
                <option value="8">8 hours</option>
                <option value="12">12 hours</option>
              </select>
            </div>
            <div className="total-price">
              <h3>Total Price: ₹{selectedHall.price * parseInt(bookingForm.duration)}</h3>
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
        <h1>Hall Booking</h1>
        <p>Choose from our premium collection of event venues</p>
      </div>
      <div className="items-grid">
        {halls.map(hall => (
          <div key={hall.id} className="item-card">
            <div className="item-image">
              <img src={hall.image} alt={hall.name} />
              <div className="item-overlay">
                <button 
                  className="book-btn"
                  onClick={() => handleBooking(hall)}
                >
                  Book Now
                </button>
              </div>
            </div>
            <div className="item-details">
              <h3>{hall.name}</h3>
              <p className="item-description">{hall.description}</p>
              <div className="item-specs">
                <span><strong>Capacity:</strong> {hall.capacity}</span>
                <span><strong>Area:</strong> {hall.area}</span>
              </div>
              <ul className="item-features">
                {hall.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="item-price">
                <span className="price">₹{hall.price.toLocaleString()}</span>
                <span className="period">/4 hours</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HallBooking