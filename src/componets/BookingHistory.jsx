import React from 'react'

const BookingHistory = ({ bookings }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#059669'
      case 'pending': return '#d97706'
      case 'cancelled': return '#dc2626'
      default: return '#6b7280'
    }
  }

  if (bookings.length === 0) {
    return (
      <div className="booking-history">
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h2>No Bookings Yet</h2>
          <p>Your booking history will appear here once you make your first reservation.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-history">
      <div className="service-header">
        <h1>Booking History</h1>
        <p>Track all your reservations and rental history</p>
      </div>
      
      <div className="bookings-list">
        {bookings.map(booking => (
          <div key={booking.id} className="booking-card">
            <div className="booking-header">
              <div className="booking-type">
                <span className="type-badge">{booking.type}</span>
                <h3>{booking.item}</h3>
              </div>
              <div className="booking-status">
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(booking.status) }}
                >
                  {booking.status}
                </span>
              </div>
            </div>
            
            <div className="booking-details">
              <div className="detail-section">
                <h4>Customer Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Name:</strong> {booking.customer}
                  </div>
                  <div className="detail-item">
                    <strong>Email:</strong> {booking.email}
                  </div>
                  <div className="detail-item">
                    <strong>Phone:</strong> {booking.phone}
                  </div>
                  {booking.license && (
                    <div className="detail-item">
                      <strong>License:</strong> {booking.license}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>Booking Details</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Booking Date:</strong> {booking.bookingDate}
                  </div>
                  {booking.date && (
                    <div className="detail-item">
                      <strong>Event Date:</strong> {booking.date}
                    </div>
                  )}
                  {booking.startDate && (
                    <div className="detail-item">
                      <strong>Start Date:</strong> {booking.startDate}
                    </div>
                  )}
                  {booking.endDate && (
                    <div className="detail-item">
                      <strong>End Date:</strong> {booking.endDate}
                    </div>
                  )}
                  <div className="detail-item">
                    <strong>Duration:</strong> {booking.duration}
                  </div>
                  {booking.guests && (
                    <div className="detail-item">
                      <strong>Guests:</strong> {booking.guests}
                    </div>
                  )}
                  {booking.eventType && (
                    <div className="detail-item">
                      <strong>Event Type:</strong> {booking.eventType}
                    </div>
                  )}
                  {booking.withDriver && (
                    <div className="detail-item">
                      <strong>With Driver:</strong> {booking.withDriver}
                    </div>
                  )}
                  {booking.company && (
                    <div className="detail-item">
                      <strong>Company:</strong> {booking.company}
                    </div>
                  )}
                  {booking.projectType && (
                    <div className="detail-item">
                      <strong>Project Type:</strong> {booking.projectType}
                    </div>
                  )}
                  {booking.operatorRequired && (
                    <div className="detail-item">
                      <strong>Operator Required:</strong> {booking.operatorRequired}
                    </div>
                  )}
                  {booking.deliveryAddress && (
                    <div className="detail-item">
                      <strong>Delivery Address:</strong> {booking.deliveryAddress}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="booking-footer">
              <div className="booking-price">
                <strong>Total Amount: ₹{booking.price.toLocaleString()}</strong>
              </div>
              <div className="booking-actions">
                <button className="btn-secondary">View Details</button>
                <button className="btn-primary">Download Invoice</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingHistory