import Navbar from "../components/Navbar";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-16 px-6 md:px-20 lg:px-40 pb-20">
      <Navbar />
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>
        <section className="space-y-6 text-justify leading-relaxed">
          <p>
            Welcome to DisasterAlert. By accessing or using our website and services,
            you agree to comply with these Terms of Service.
          </p>
          <p>
            You agree to use the platform responsibly and provide accurate
            information when contributing or seeking resources.
          </p>
          <p>
            We reserve the right to remove any content that violates our policies or
            is deemed inappropriate.
          </p>
          <p>
            DisasterAlert does not guarantee the availability or accuracy of user
            submitted resources.
          </p>
          <p>
            For any questions or concerns regarding these terms, please contact us at
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

export default TermsOfService;
