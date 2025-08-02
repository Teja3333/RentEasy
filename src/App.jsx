import { useState } from 'react'
import './App.css'
import Header from './componets/Header'
import Home from './componets/Home'
// import Home from './components/Home'
// import HallBooking from './components/HallBooking'
import HallBooking from './componets/HallBooking'
import BikeRental from './componets/BikeRental'
import CarRental from './componets/CarRental'
import Construction from './componets/Construction'
import BookingHistory from './componets/BookingHistory'
// import BikeRental from './components/BikeRental'
// import CarRental from './components/CarRental'
// import Construction from './components/Construction'
// import BookingHistory from './components/BookingHistory'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [bookings, setBookings] = useState([])

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now(),
      bookingDate: new Date().toLocaleDateString(),
      status: 'confirmed'
    }
    setBookings([...bookings, newBooking])
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />
      case 'halls':
        return <HallBooking addBooking={addBooking} />
      case 'bikes':
        return <BikeRental addBooking={addBooking} />
      case 'cars':
        return <CarRental addBooking={addBooking} />
      case 'construction':
        return <Construction addBooking={addBooking} />
      case 'bookings':
        return <BookingHistory bookings={bookings} />
      default:
        return <Home setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="App">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} bookingsCount={bookings.length} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App