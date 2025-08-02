import React, { useState } from 'react'

const Construction = ({ addBooking }) => {
  const [selectedEquipment, setSelectedEquipment] = useState(null)
  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    companyName: '',
    projectType: '',
    startDate: '',
    endDate: '',
    days: 1,
    operatorRequired: false,
    deliveryAddress: ''
  })
  const [showBookingForm, setShowBookingForm] = useState(false)

  const equipment = [
    {
      id: 1,
      name: 'Hydraulic Excavator',
      image: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg',
      type: 'Heavy Machinery',
      capacity: '20 Ton',
      specifications: 'Bucket Capacity: 1.2 m³',
      price: 8000,
      features: ['GPS Tracking', 'Fuel Efficient', 'Advanced Hydraulics', 'Safety Systems'],
      description: 'Heavy-duty excavator perfect for digging, demolition, and earthmoving projects'
    },
    {
      id: 2,
      name: 'Tower Crane',
      image: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg',
      type: 'Lifting Equipment',
      capacity: '50 Ton',
      specifications: 'Max Height: 60m',
      price: 15000,
      features: ['Remote Control', 'Load Monitoring', 'Weather Resistant', 'Safety Certified'],
      description: 'High-capacity tower crane for multi-story construction and heavy lifting'
    },
    {
      id: 3,
      name: 'Bulldozer',
      image: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg',
      type: 'Earthmoving',
      capacity: '15 Ton',
      specifications: 'Blade Width: 3.4m',
      price: 6000,
      features: ['Powerful Engine', 'Durable Tracks', 'Precision Control', 'Low Maintenance'],
      description: 'Powerful bulldozer for land clearing, grading, and earthmoving operations'
    },
    {
      id: 4,
      name: 'Concrete Mixer Truck',
      image: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg',
      type: 'Concrete Equipment',
      capacity: '8 m³',
      specifications: 'Mixing Drum: 8 cubic meters',
      price: 4000,
      features: ['Automated Mixing', 'GPS Navigation', 'Quality Control', 'Timely Delivery'],
      description: 'Ready-mix concrete delivery truck for construction and infrastructure projects'
    },
    {
      id: 5,
      name: 'Mobile Crane',
      image: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg',
      type: 'Lifting Equipment',
      capacity: '25 Ton',
      specifications: 'Boom Length: 40m',
      price: 10000,
      features: ['All-Terrain Capability', 'Telescopic Boom', 'Outriggers', 'Load Charts'],
      description: 'Versatile mobile crane for construction, maintenance, and installation work'
    },
    {
      id: 6,
      name: 'Compactor Roller',
      image: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg',
      type: 'Road Equipment',
      capacity: '12 Ton',
      specifications: 'Drum Width: 2.1m',
      price: 3500,
      features: ['Vibration Control', 'Smooth Operation', 'Fuel Efficient', 'Easy Maintenance'],
      description: 'Heavy-duty compactor for road construction and soil compaction work'
    }
  ]

  const handleBooking = (equipment) => {
    setSelectedEquipment(equipment)
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
    const operatorCost = bookingForm.operatorRequired ? 1500 * bookingForm.days : 0
    const totalPrice = (selectedEquipment.price * bookingForm.days) + operatorCost
    const booking = {
      type: 'Construction',
      item: selectedEquipment.name,
      customer: bookingForm.customerName,
      email: bookingForm.email,
      phone: bookingForm.phone,
      company: bookingForm.companyName,
      projectType: bookingForm.projectType,
      startDate: bookingForm.startDate,
      endDate: bookingForm.endDate,
      duration: bookingForm.days + ' days',
      operatorRequired: bookingForm.operatorRequired ? 'Yes' : 'No',
      deliveryAddress: bookingForm.deliveryAddress,
      price: totalPrice
    }
    addBooking(booking)
    alert('Construction equipment booked successfully!')
    setShowBookingForm(false)
    setBookingForm({
      customerName: '',
      email: '',
      phone: '',
      companyName: '',
      projectType: '',
      startDate: '',
      endDate: '',
      days: 1,
      operatorRequired: false,
      deliveryAddress: ''
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
    const operatorCost = bookingForm.operatorRequired ? 1500 * bookingForm.days : 0
    const totalPrice = (selectedEquipment.price * bookingForm.days) + operatorCost

    return (
      <div className="booking-form-container">
        <div className="booking-form">
          <h2>Book {selectedEquipment.name}</h2>
          <div className="selected-item-info">
            <img src={selectedEquipment.image} alt={selectedEquipment.name} />
            <div>
              <h3>{selectedEquipment.name}</h3>
              <p>Type: {selectedEquipment.type}</p>
              <p>Price: ₹{selectedEquipment.price}/day</p>
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
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={bookingForm.companyName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Project Type</label>
              <select
                name="projectType"
                value={bookingForm.projectType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Project Type</option>
                <option value="Residential Construction">Residential Construction</option>
                <option value="Commercial Construction">Commercial Construction</option>
                <option value="Road Construction">Road Construction</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Demolition">Demolition</option>
                <option value="Excavation">Excavation</option>
                <option value="Other">Other</option>
              </select>
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
              <label>Delivery Address</label>
              <textarea
                name="deliveryAddress"
                value={bookingForm.deliveryAddress}
                onChange={handleInputChange}
                rows="3"
                placeholder="Enter complete project site address"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="operatorRequired"
                  checked={bookingForm.operatorRequired}
                  onChange={handleInputChange}
                />
                Include Certified Operator (+₹1,500/day)
              </label>
            </div>
            <div className="rental-summary">
              <p><strong>Rental Duration:</strong> {bookingForm.days} days</p>
              <p><strong>Equipment Rate:</strong> ₹{selectedEquipment.price}/day</p>
              {bookingForm.operatorRequired && <p><strong>Operator Charges:</strong> ₹1,500/day</p>}
              <p><strong>Delivery:</strong> Included within city limits</p>
            </div>
            <div className="total-price">
              <h3>Total Price: ₹{totalPrice.toLocaleString()}</h3>
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
        <h1>Construction Equipment Rental</h1>
        <p>Professional-grade construction machinery for all your building projects</p>
      </div>
      <div className="items-grid">
        {equipment.map(item => (
          <div key={item.id} className="item-card">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
              <div className="item-overlay">
                <button 
                  className="book-btn"
                  onClick={() => handleBooking(item)}
                >
                  Rent Now
                </button>
              </div>
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-description">{item.description}</p>
              <div className="item-specs">
                <span><strong>Type:</strong> {item.type}</span>
                <span><strong>Capacity:</strong> {item.capacity}</span>
                <span><strong>Specs:</strong> {item.specifications}</span>
              </div>
              <ul className="item-features">
                {item.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="item-price">
                <span className="price">₹{item.price.toLocaleString()}</span>
                <span className="period">/day</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Construction