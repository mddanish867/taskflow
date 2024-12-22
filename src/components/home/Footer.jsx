const Footer = () => {
    return (
      <footer className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-thin tracking-wider mb-6">
              <div className="items-center">
                <span className="text-2xl font-bold text-blue-600">SooraAuth</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-gray-500 hover:text-gray-900">Features</a></li>
                  <li><a href="/pricing" className="text-gray-500 hover:text-gray-900">Pricing</a></li>
                  <li><a href="/updates" className="text-gray-500 hover:text-gray-900">Updates</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="/about" className="text-gray-500 hover:text-gray-900">About</a></li>
                  <li><a href="/careers" className="text-gray-500 hover:text-gray-900">Careers</a></li>
                  <li><a href="/contact" className="text-gray-500 hover:text-gray-900">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="/docs" className="text-gray-500 hover:text-gray-900">Documentation</a></li>
                  <li><a href="/guides" className="text-gray-500 hover:text-gray-900">Guides</a></li>
                  <li><a href="/support" className="text-gray-500 hover:text-gray-900">Support</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="/privacy" className="text-gray-500 hover:text-gray-900">Privacy</a></li>
                  <li><a href="/terms" className="text-gray-500 hover:text-gray-900">Terms</a></li>
                  <li><a href="/security" className="text-gray-500 hover:text-gray-900">Security</a></li>
                </ul>
              </div>
            </div>
            <div className="text-sm text-gray-400 pt-8 border-t border-gray-200">
              © {new Date().getFullYear()} SooraAuth. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer