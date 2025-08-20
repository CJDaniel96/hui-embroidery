import { Link } from '@/i18n/navigation';

interface FooterProps {
  text: {
    copyright: string;
    allRightsReserved: string;
    quickLinks: string;
    contact: string;
    followUs: string;
  };
  navigation: {
    home: string;
    gallery: string;
    about: string;
    blog: string;
    contact: string;
  };
}

export default function Footer({ text, navigation }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 chinese-corner"></div>
              <span className="text-xl font-bold">慧繡雅集</span>
            </div>
            <p className="text-gray-300 max-w-sm">
              傳承中華傳統刺繡工藝，弘揚東方美學文化，每一針每一線都蘊含著深厚的文化底蘊。
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{text.quickLinks}</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                {navigation.home}
              </Link>
              <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors duration-200">
                {navigation.gallery}
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                {navigation.about}
              </Link>
              <Link href="/blog" className="text-gray-300 hover:text-white transition-colors duration-200">
                {navigation.blog}
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                {navigation.contact}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{text.contact}</h3>
            <div className="text-gray-300 space-y-2">
              <p>📧 info@hui-embroidery.com</p>
              <p>📞 +886-2-1234-5678</p>
              <p>📍 台北市中正區...</p>
            </div>
            
            {/* Social Media */}
            <div className="space-y-2">
              <h4 className="font-medium">{text.followUs}</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Facebook
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Instagram
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            {text.copyright} {currentYear} 慧繡雅集. {text.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}