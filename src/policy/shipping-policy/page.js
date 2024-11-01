import React from 'react';
import Navigation from '@/components/Navbar/Navigation';
import Footer from '@/components/Footer/Footer';
const ShippingPolicy = () => {
  return (
  <>
  <Navigation/>
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Shipping Policy</h1>
      <p className="text-gray-700 mb-4">
        At Divine Menswear, we are committed to delivering your order as quickly and efficiently as possible. We currently ship to France (Europe) and selected countries in Asia.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Shipping Regions</h2>
      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li>Europe: Only France</li>
        <li>Asia: Selected countries</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Shipping Costs</h2>
      <p className="text-gray-700 mb-4">
        Shipping costs are calculated at checkout based on your location and order size. We offer free shipping on orders over €100 for France. For international orders, shipping fees will apply depending on the destination.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Processing Time</h2>
      <p className="text-gray-700 mb-4">
        Orders are processed within 1-3 business days. Once your order has been processed, you will receive a confirmation email with your tracking information. Delivery times will vary based on your location.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Delivery Time</h2>
      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li>France: 3-5 business days</li>
        <li>Asia: 7-14 business days</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customs, Duties, and Taxes</h2>
      <p className="text-gray-700 mb-4">
        International shipments may be subject to additional customs fees, duties, or taxes depending on your country’s regulations. These fees are the responsibility of the customer.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Tracking Information</h2>
      <p className="text-gray-700 mb-4">
        Once your order has shipped, you will receive an email with the tracking information. Please allow up to 24 hours for tracking updates to appear.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
      <p className="text-gray-700">
        If you have any questions regarding our shipping policy, feel free to contact us at <a href="mailto:support@divinemenswear.com" className="text-blue-600 underline">support@divinemenswear.com</a>.
      </p>
    </div>
    <Footer/>
  </>
  );
};

export default ShippingPolicy;
