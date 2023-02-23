export default function Footer() {
  return (
    <footer className='py-14'>
      <div className='container flex justify-center'>
        <p className='text-gray-600'>
          &copy; {new Date().getFullYear()} Study Buddy
        </p>
      </div>
    </footer>
  )
}