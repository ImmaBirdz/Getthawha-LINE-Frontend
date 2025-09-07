function Booking() {
  return (
    <>
      <div className="m-0 w-[360px] min-h-[90vh] bg-[linear-gradient(90deg,#4C2B00_0%,#2D1406_100%)] flex flex-col relative justify-center items-center">
        <div className='text-white text-2xl font-bold p-4'>You have no bookings</div>
        {/* redirect to main website */}
        <button className='bg-white text-black font-bold py-2 px-4 rounded'>Make a Booking</button>
      </div>
    </>
  )
}

export default Booking
