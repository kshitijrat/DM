import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import Modal from "../components/Modal";
import TermsOfService from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";
import CookiesPolicy from "./CookiesPolicy";

const Footer = ({ language }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: null });

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
  };
  const t = translations[language] || translations.en;

  // Content for modals (can be more detailed or imported from a separate file)
  const privacyPolicyContent = (
    <>
      <PrivacyPolicy />
    </>
  );

  const termsOfServiceContent = (
    <>
      <TermsOfService />
    </>
  );

  const cookiesPolicyContent = (
    <>
      <CookiesPolicy />
    </>
  );

  // openModal function inside component so it can access state setters
  const openModal = (type) => {
    if (type === "privacy") {
      setModalContent({ title: "Privacy Policy", body: privacyPolicyContent });
    } else if (type === "terms") {
      setModalContent({ title: "Terms of Service", body: termsOfServiceContent });
    } else if (type === "cookies") {
      setModalContent({ title: "Cookies Policy", body: cookiesPolicyContent });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      const res = await fetch('https://dm-backend-auge.onrender.com/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Email sent successfully!");
      } else {
        alert("❌ Failed: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error sending email");
    }
  };


  return (
    <>
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
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">{t.quickLinks}</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
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
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">{t.contact}</h3>
              <ul className="space-y-4">
                {/* First Contact */}
                <li className="flex flex-col space-y-1 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Mail size={16} />
                    <span>kshitijratnawa@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>Mandsaur, Madhya Pradesh India</span>
                  </div>
                </li>

                {/* Second Contact */}
                <li className="flex flex-col space-y-1 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Mail size={16} />
                    <span>priyasharma297g@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>Ratlam, Madhya Pradesh India</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">{t.about}</h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Subscribe to get <span className="text-red-500 font-medium">real-time disaster alerts</span> directly in your inbox.
              </p>

              <form className="space-y-2" onSubmit={handleSubmit}>
                <input
                  name="email"
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
              <button
                onClick={() => openModal("privacy")}
                className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-sm transition-colors"
              >
                {t.privacy}
              </button>
              <button
                onClick={() => openModal("terms")}
                className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-sm transition-colors"
              >
                {t.terms}
              </button>
              <button
                onClick={() => openModal("cookies")}
                className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-sm transition-colors"
              >
                {t.cookies}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalContent.title}>
        {modalContent.body}
      </Modal>
    </>
  );
};

export default Footer;
