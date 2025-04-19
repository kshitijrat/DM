import { Link } from "react-router-dom"
import { AlertTriangle, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

const Footer = ({ language }) => {
  const translations = {
    en: {
      quickLinks: "Quick Links",
      home: "Home",
      alerts: "Disaster Alerts",
      seek: "Seek Resources",
      provide: "Provide Resources",
      contact: "Contact Us",
      about: "About Us",
      mission:
        "Our mission is to provide real-time disaster alerts and facilitate resource sharing during emergencies.",
      rights: "© 2023 DisasterAlert. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookies: "Cookies Policy",
    },
    hi: {
      quickLinks: "त्वरित लिंक",
      home: "होम",
      alerts: "आपदा अलर्ट",
      seek: "संसाधन प्राप्त करें",
      provide: "संसाधन प्रदान करें",
      contact: "संपर्क करें",
      about: "हमारे बारे में",
      mission:
        "हमारा मिशन आपातकालीन स्थिति के दौरान रीयल-टाइम आपदा अलर्ट प्रदान करना और संसाधन साझा करने की सुविधा प्रदान करना है।",
      rights: "© 2023 डिजास्टर अलर्ट। सर्वाधिकार सुरक्षित।",
      privacy: "गोपनीयता नीति",
      terms: "सेवा की शर्तें",
      cookies: "कुकीज़ नीति",
    },
  }

  const t = translations[language] || translations.en

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                DisasterAlert
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t.mission}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-red-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-red-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-red-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg text-white font-semibold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  {t.home}
                </Link>
              </li>
              <li>
                <Link
                  to="/disaster-alerts"
                  className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  {t.alerts}
                </Link>
              </li>
              <li>
                <Link
                  to="/seek-resources"
                  className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  {t.seek}
                </Link>
              </li>
              <li>
                <Link
                  to="/provide-resources"
                  className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  {t.provide}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg text-white font-semibold mb-4">{t.contact}</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Mail size={16} />
                <span>contact@disasteralert.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-600 dark:text-gray-400">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>123 Emergency Lane, Safety City, SC 12345</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg text-white font-semibold mb-4">{t.about}</h3>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-md hover:from-red-600 hover:to-orange-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">{t.rights}</p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-sm transition-colors"
            >
              {t.privacy}
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-sm transition-colors"
            >
              {t.terms}
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-sm transition-colors"
            >
              {t.cookies}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
