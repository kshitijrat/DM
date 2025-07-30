import Navbar from "../components/Navbar";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-16 px-6 md:px-20 lg:px-40 pb-20">
      <Navbar />
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Cookies Policy</h1>
        <section className="space-y-6 text-justify leading-relaxed">
          <p>
            DisasterAlert uses cookies to improve your browsing experience and
            provide personalized features.
          </p>
          <p>
            Cookies are small text files stored on your device that help us
            remember your preferences and enhance site functionality.
          </p>
          <p>
            You can control or disable cookies through your browser settings; however,
            some features of our site may not function properly without cookies.
          </p>
          <p>
            By continuing to use our site, you consent to the use of cookies as described
            in this policy.
          </p>
          <p>
            For any questions about our cookie usage, please contact us at
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

export default CookiesPolicy;
