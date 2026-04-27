import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Toys Website",
  description: "Privacy policy for our toys store.",
};

export default function PrivacyPolicy() {
  return (
    <main className="container py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-zinc-900">
          Privacy Policy
        </h1>
        <p className="text-zinc-500 mb-8">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <div className="space-y-8 text-zinc-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us when you create an account,
              make a purchase, sign up for our newsletter, or contact customer support. This
              may include your name, email address, shipping address, and payment
              information. We use this to process your orders and ensure smooth delivery of
              your toys.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p>
              We use the information we collect to process transactions, deliver your orders,
              send order confirmations, respond to customer service requests, and communicate
              with you about new products, exclusive offers, and promotions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              3. Children&apos;s Privacy
            </h2>
            <p>
              While we sell toys meant for children, our website is intended for use by
              adults who can make purchases with a credit card or other permitted payment
              method. We do not knowingly collect personal information from children under the
              age of 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              4. Data Security
            </h2>
            <p>
              We take reasonable measures to help protect information about you from loss,
              theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
              Your payment information is always processed securely through trusted third-party
              payment processors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              5. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or how we handle your data,
              please{" "}
              <Link
                href="/contact"
                className="text-[#40b5a6] hover:underline font-semibold"
              >
                contact us
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}