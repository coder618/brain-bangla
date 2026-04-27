import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions | Toys Website",
  description: "Terms and conditions for our toys store.",
};

export default function TermsAndConditions() {
  return (
    <main className="container py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-zinc-900">
          Terms and Conditions
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
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">1. Introduction</h2>
            <p>
              Welcome to our Toy Store. By accessing our website and purchasing our
              products, you agree to be bound by these Terms and Conditions and our Privacy
              Policy. If you disagree with any part of these terms, please do not use our
              website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">2. Purchases and Payment</h2>
            <p>
              All purchases made through our website are subject to product availability. We
              may, in our sole discretion, limit or cancel the quantities offered on our
              website or limit the sales of our products or services to any person,
              household, geographic region, or jurisdiction. Prices for our products are
              subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">3. Shipping and Delivery</h2>
            <p>
              We aim to deliver toys to your kids as quickly as possible. Shipping times may
              vary depending on your location and the shipping method selected during
              checkout. We are not responsible for any delays outside our control, but we
              will always strive to keep you informed of your order status.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">4. Returns and Refunds</h2>
            <p>
              If you or your child are not completely satisfied with a purchase, please review
              our return policy. Most items can be returned within 30 days of delivery in
              their original packaging and unused condition. Refunds will be processed to the
              original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions or concerns about these Terms, please{" "}
              <Link
                href="/contact"
                className="text-[#40b5a6] hover:underline font-semibold"
              >
                contact us
              </Link>
              . We are always happy to assist you!
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}