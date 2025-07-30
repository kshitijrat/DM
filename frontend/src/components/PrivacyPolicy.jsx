import Navbar from "../components/Navbar"; // assuming you have Navbar component

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-16 px-6 md:px-20 lg:px-40 pb-20">
      <Navbar />
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
        <section className="space-y-6 text-justify leading-relaxed">
          <p>
            At DisasterAlert, your privacy is our priority. We are committed to
            protecting your personal information and using it responsibly.
          </p>
          <p>
            We collect only the necessary data to provide you with timely disaster
            alerts and resource sharing features. Your information is never sold or
            shared with third parties without your consent.
          </p>
          <p>
            We use cookies to enhance your experience on our website. You can manage
            your cookie preferences through your browser settings.
          </p>
          <p>
            For more detailed information, please contact us at
            <a
              href="mailto:contact@disasteralert.com"
              className="text-red-500 underline ml-1"
            >
              contact@disasteralert.com
            </a>.
          </p>
          <p>Last updated: July 2025</p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
