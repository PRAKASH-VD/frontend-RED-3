export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} RealEstate. All rights reserved.
      </div>
    </footer>
  )
}