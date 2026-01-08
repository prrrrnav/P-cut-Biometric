import React from 'react';
import { Fingerprint } from 'lucide-react';

const Footer = ({ navigate }) => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Fingerprint className="text-white" size={24} />
              </div>
              <span className="text-lg font-bold">TST Technologies</span>
            </div>
            <p className="text-gray-400 text-sm">
              Leading provider of biometric security solutions. Trusted by 580+ organizations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate('product-list', 'biometric-cctv', 'fingerprint')} className="text-gray-400 hover:text-white">Fingerprint</button></li>
              <li><button onClick={() => navigate('product-list', 'biometric-cctv', 'face-recognition')} className="text-gray-400 hover:text-white">Face Recognition</button></li>
              <li><button onClick={() => navigate('product-list', 'biometric-cctv', 'rfid-reader')} className="text-gray-400 hover:text-white">RFID</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate('about')} className="text-gray-400 hover:text-white">About</button></li>
              <li><button onClick={() => navigate('contact')} className="text-gray-400 hover:text-white">Contact</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 TST Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
