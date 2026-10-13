import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Muscle Building",
    slug: "muscle-building",
    description: "Protein, creatine and performance supplements for serious gains",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
  },
  {
    name: "General Nutrition",
    slug: "general-nutrition",
    description: "Essential vitamins and minerals for everyday health",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=800&q=80",
  },
  {
    name: "Pre & Post Workout",
    slug: "pre-post-workout",
    description: "Fuel your training and recover faster",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
  },
  {
    name: "Vitamins & Immunity",
    slug: "vitamins-immunity",
    description: "Support your immune system and overall wellness",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
  },
];

const products = [
  {
    name: "Tagde Whey Protein Isolate",
    slug: "tagde-whey-protein-isolate",
    description:
      "Premium whey protein isolate with 27g protein per serving. Fast-absorbing, low lactose, and perfect for lean muscle growth. Available in rich chocolate flavour.",
    benefits: [
      "27g high-quality protein per scoop",
      "Supports lean muscle growth & recovery",
      "Low in lactose and carbs",
      "Great mixability & taste",
    ],
    ingredients:
      "Whey Protein Isolate, Cocoa Powder, Natural Flavours, Sucralose, Digestive Enzymes (Lactase, Protease)",
    usage: "Mix 1 scoop (32g) with 200-250ml cold water or milk. Take post-workout or anytime for protein boost.",
    price: 349900, // ₹3499
    compareAt: 449900,
    stock: 120,
    images: [
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80",
      "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=800&q=80",
    ],
    featured: true,
    categorySlug: "muscle-building",
  },
  {
    name: "Tagde Creatine Monohydrate",
    slug: "tagde-creatine-monohydrate",
    description:
      "Pure micronized creatine monohydrate. 5g per serving to increase strength, power and muscle volume. Unflavoured and mixes easily.",
    benefits: [
      "Increases strength & power output",
      "Supports muscle volume & recovery",
      "Micronized for better absorption",
      "100% pure, no fillers",
    ],
    ingredients: "100% Creatine Monohydrate (Micronized)",
    usage: "Mix 5g (1 scoop) with water or your protein shake. Take daily, preferably post-workout.",
    price: 99900, // ₹999
    compareAt: 149900,
    stock: 200,
    images: [
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
    ],
    featured: true,
    categorySlug: "muscle-building",
  },
  {
    name: "Tagde BCAA 2:1:1",
    slug: "tagde-bcaa-211",
    description:
      "Essential branched-chain amino acids in the optimal 2:1:1 ratio. Reduces muscle breakdown and speeds recovery during intense training.",
    benefits: [
      "Reduces muscle soreness",
      "Prevents muscle breakdown",
      "Improves endurance",
      "Refreshing fruit punch flavour",
    ],
    ingredients:
      "L-Leucine, L-Isoleucine, L-Valine, Citric Acid, Natural Flavours, Sucralose, Colour (Beetroot)",
    usage: "Mix 1 scoop with 300ml water. Sip during workout or throughout the day.",
    price: 129900,
    compareAt: 179900,
    stock: 150,
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80",
    ],
    featured: false,
    categorySlug: "muscle-building",
  },
  {
    name: "Tagde Pre-Workout Ignite",
    slug: "tagde-pre-workout-ignite",
    description:
      "High-stim pre-workout with 200mg caffeine, citrulline, beta-alanine and nootropics. Explosive energy, focus and pumps.",
    benefits: [
      "Explosive energy & focus",
      "Massive muscle pumps",
      "Improved endurance",
      "No crash formula",
    ],
    ingredients:
      "L-Citrulline, Beta-Alanine, Caffeine Anhydrous, L-Tyrosine, Taurine, Natural Flavours, Sucralose",
    usage: "Mix 1 scoop with 250-300ml water 20-30 minutes before training. Do not exceed 1 scoop per day.",
    price: 179900,
    compareAt: 249900,
    stock: 90,
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    ],
    featured: true,
    categorySlug: "pre-post-workout",
  },
  {
    name: "Tagde Multivitamin Advanced",
    slug: "tagde-multivitamin-advanced",
    description:
      "Complete daily multivitamin with 24 essential vitamins & minerals plus antioxidants. Designed for active Indian adults.",
    benefits: [
      "Fills nutritional gaps",
      "Supports immunity & energy",
      "Antioxidant protection",
      "One tablet a day convenience",
    ],
    ingredients:
      "Vitamin A, B-Complex, C, D3, E, K, Calcium, Magnesium, Zinc, Selenium, Iron, and more",
    usage: "Take 1 tablet daily after breakfast with water.",
    price: 69900,
    compareAt: 99900,
    stock: 300,
    images: [
      "https://images.unsplash.com/photo-1550572017-edd951b55104?w=800&q=80",
    ],
    featured: true,
    categorySlug: "vitamins-immunity",
  },
  {
    name: "Tagde Omega-3 Fish Oil",
    slug: "tagde-omega-3-fish-oil",
    description:
      "High-strength EPA & DHA from pure fish oil. Supports heart, brain and joint health. Enteric coated to avoid fishy aftertaste.",
    benefits: [
      "Heart & brain health",
      "Joint mobility support",
      "Anti-inflammatory benefits",
      "No fishy burps",
    ],
    ingredients: "Fish Oil Concentrate (EPA 180mg, DHA 120mg per softgel), Gelatin, Glycerin",
    usage: "Take 1-2 softgels daily with a meal.",
    price: 89900,
    compareAt: 129900,
    stock: 180,
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    ],
    featured: false,
    categorySlug: "general-nutrition",
  },
  {
    name: "Tagde Mass Gainer Pro",
    slug: "tagde-mass-gainer-pro",
    description:
      "High-calorie mass gainer with 50g protein and complex carbs. Ideal for hard gainers looking to pack on size.",
    benefits: [
      "50g protein + complex carbs",
      "Supports healthy weight gain",
      "Added digestive enzymes",
      "Delicious chocolate flavour",
    ],
    ingredients:
      "Whey Protein Concentrate, Maltodextrin, Oat Flour, Cocoa, Creatine, Digestive Enzymes, Vitamins & Minerals",
    usage: "Mix 2 scoops with 400-500ml milk or water. Take 1-2 servings daily between meals.",
    price: 279900,
    compareAt: 349900,
    stock: 80,
    images: [
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80",
    ],
    featured: false,
    categorySlug: "muscle-building",
  },
  {
    name: "Tagde Vitamin D3 + K2",
    slug: "tagde-vitamin-d3-k2",
    description:
      "High-potency Vitamin D3 (2000 IU) with K2 (MK-7) for optimal calcium absorption and bone health. Especially important for Indians with low sun exposure.",
    benefits: [
      "Supports strong bones & immunity",
      "Better calcium utilisation with K2",
      "High bioavailability",
      "One softgel daily",
    ],
    ingredients: "Vitamin D3 (Cholecalciferol), Vitamin K2 (MK-7), MCT Oil, Softgel Capsule",
    usage: "Take 1 softgel daily with a meal containing fat.",
    price: 59900,
    compareAt: 79900,
    stock: 250,
    images: [
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
    ],
    featured: false,
    categorySlug: "vitamins-immunity",
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create categories
  const createdCategories: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    createdCategories[cat.slug] = created.id;
    console.log(`Created category: ${cat.name}`);
  }

  // Create products
  for (const prod of products) {
    const { categorySlug, ...data } = prod;
    await prisma.product.create({
      data: {
        ...data,
        categoryId: createdCategories[categorySlug],
      },
    });
    console.log(`Created product: ${prod.name}`);
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
