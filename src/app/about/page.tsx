export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About Tagde Nutrition</h1>
      <div className="prose prose-green max-w-none text-gray-600 leading-relaxed space-y-4">
        <p>
          Tagde Nutrition was founded with a simple belief: every Indian deserves access
          to clean, effective, and honestly labelled nutritional supplements.
        </p>
        <p>
          Whether you are a dedicated gym-goer chasing muscle gains, or someone simply
          looking to fill the gaps in everyday nutrition, our products are formulated
          with clinically relevant dosages and transparent ingredients.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Our Promise</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>No proprietary blends that hide actual dosages</li>
          <li>Third-party lab tested for purity and potency</li>
          <li>Formulated for the Indian climate, diet, and lifestyle</li>
          <li>Honest pricing without unnecessary middlemen</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Who We Serve</h2>
        <p>
          From college students starting their fitness journey, to working professionals
          who need energy and focus, to serious athletes pushing for peak performance —
          Tagde Nutrition is built for anyone who refuses to settle for average.
        </p>
        <p className="mt-8 font-medium text-gray-900">
          Train hard. Recover smarter. Live better.
        </p>
      </div>
    </div>
  );
}
