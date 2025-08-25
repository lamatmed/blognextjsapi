// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Blog App</h3>
            <p className="text-gray-400">Share your thoughts with the world</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              Contact
            </a>
          </div>
        </div>
        
        <div className="text-center mt-8 text-gray-400">
          <p>&copy; {new Date().getFullYear()} Blog App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}