import type { Category, City, Shop, Order, Product, PortalSettings, Expense } from "./types";

export const expenseCategories = ["Logistics", "Warehouse Rent", "Salaries", "Fuel", "Packaging", "Utilities", "Miscellaneous"];

export const hsnCodes: Record<string, string> = {
  Taps: "8481",
  "Bathroom Accessories": "7324",
  "Wooden Doors": "4418",
  Plywood: "4412",
  Laminates: "4823",
  "Construction Materials": "7214",
  Hardware: "8302",
  Adhesives: "3506",
};

export const seedExpenses: Expense[] = [
  { id: "exp-1", date: "2026-07-05", category: "Logistics", vendor: "Sharma Transport Co.", amount: 18500, paymentMode: "Bank Transfer", notes: "Mumbai + Delhi NCR dispatches" },
  { id: "exp-2", date: "2026-07-10", category: "Warehouse Rent", vendor: "Bhiwandi Godown Trust", amount: 45000, paymentMode: "Bank Transfer", notes: "July rent — Unit 4" },
  { id: "exp-3", date: "2026-07-15", category: "Salaries", vendor: "Staff Payroll", amount: 120000, paymentMode: "Bank Transfer", notes: "July payroll (9 staff)" },
  { id: "exp-4", date: "2026-07-18", category: "Fuel", vendor: "HP Petrol Pump, Bhiwandi", amount: 6200, paymentMode: "Cash" },
  { id: "exp-5", date: "2026-08-03", category: "Packaging", vendor: "Om Packaging Suppliers", amount: 9400, paymentMode: "UPI", notes: "Stretch film + cartons" },
  { id: "exp-6", date: "2026-08-12", category: "Logistics", vendor: "VRL Logistics", amount: 22000, paymentMode: "Bank Transfer", notes: "Bangalore + Hyderabad lanes" },
  { id: "exp-7", date: "2026-09-05", category: "Utilities", vendor: "MSEB Electricity", amount: 7800, paymentMode: "UPI" },
  { id: "exp-8", date: "2026-09-20", category: "Salaries", vendor: "Staff Payroll", amount: 120000, paymentMode: "Bank Transfer", notes: "August payroll (9 staff)" },
];

export const seedCategories: Category[] = [
  { id: "cat-1", name: "Taps", description: "Brass & Stainless steel mixer taps, pillar cocks, and sensor faucets.", iconName: "Droplet", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80" },
  { id: "cat-2", name: "Bathroom Accessories", description: "Towel rails, soap dispensers, rain showers, and drain strainers.", iconName: "Bath", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=80" },
  { id: "cat-3", name: "Wooden Doors", description: "Flush doors, teak veneer wood doors, and engineered moisture-proof doors.", iconName: "DoorClosed", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80" },
  { id: "cat-4", name: "Plywood", description: "Marine grade BWP plywood, commercial MR plywood, and hardwood boards.", iconName: "Layers", image: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=600&q=80" },
  { id: "cat-5", name: "Laminates", description: "1mm high-pressure decorative laminates, anti-fingerprint & matte finish.", iconName: "Grid", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80" },
  { id: "cat-6", name: "Construction Materials", description: "Portland cement bags, TMT steel rebar bundles, and waterproofing compounds.", iconName: "Building2", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80" },
  { id: "cat-7", name: "Hardware", description: "Stainless steel hinges, mortise door locks, cabinet handles, and drawer slides.", iconName: "Wrench", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80" },
  { id: "cat-8", name: "Adhesives", description: "Woodworking PVA glues, epoxy resins, tile adhesives, and silicone sealants.", iconName: "Sparkles", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80" },
];

export const seedCities: City[] = [
  { id: "city-1", name: "Mumbai", state: "Maharashtra", code: "MUM", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80" },
  { id: "city-2", name: "Delhi NCR", state: "Delhi", code: "DEL", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80" },
  { id: "city-3", name: "Bangalore", state: "Karnataka", code: "BLR", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80" },
  { id: "city-4", name: "Ahmedabad", state: "Gujarat", code: "AMD", image: "https://images.unsplash.com/photo-1609828913637-a55d9a71b212?auto=format&fit=crop&w=600&q=80" },
  { id: "city-5", name: "Pune", state: "Maharashtra", code: "PUN", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80" },
  { id: "city-6", name: "Hyderabad", state: "Telangana", code: "HYD", image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=600&q=80" },
];

export const seedShops: Shop[] = [
  { id: "shop-1", name: "Apex Hardware & Sanitaryware", ownerName: "Rajesh Kumar", phone: "+91 98765 43210", email: "contact@apexhardware.in", address: "Shop No 14, Linking Road, Bandra West", cityId: "city-1", cityName: "Mumbai", gstin: "27AABCA1234D1Z5", creditLimit: 500000, creditUsed: 145000, totalOrders: 18, totalSales: 780000, registeredDate: "2025-01-15" },
  { id: "shop-2", name: "National Timber & Plywood Depot", ownerName: "Suresh Patel", phone: "+91 98220 11223", email: "info@nationaltimber.com", address: "Plot 42, Timber Market, Reay Road", cityId: "city-1", cityName: "Mumbai", gstin: "27BBCDE5678F1Z2", creditLimit: 1000000, creditUsed: 420000, totalOrders: 14, totalSales: 620000, registeredDate: "2025-02-01" },
  { id: "shop-3", name: "Royal Bath Fittings & Tiles", ownerName: "Anil Sharma", phone: "+91 98112 33445", email: "royalbath@gmail.com", address: "Sector 18, Hardware Market", cityId: "city-2", cityName: "Delhi NCR", gstin: "07CCDEF9012G1Z9", creditLimit: 750000, creditUsed: 210000, totalOrders: 16, totalSales: 740000, registeredDate: "2025-01-20" },
  { id: "shop-4", name: "Capital Construction Supplies", ownerName: "Vikas Gupta", phone: "+91 97110 99887", email: "sales@capitalconstructions.in", address: "Ring Road, Lajpat Nagar III", cityId: "city-2", cityName: "Delhi NCR", gstin: "07DDEFG3456H1Z4", creditLimit: 1200000, creditUsed: 590000, totalOrders: 20, totalSales: 880000, registeredDate: "2025-01-10" },
  { id: "shop-5", name: "Deccan Interior Hardware", ownerName: "Karthik Reddy", phone: "+91 99001 22334", email: "orders@deccanhardware.com", address: "80 Feet Road, Indiranagar", cityId: "city-3", cityName: "Bangalore", gstin: "29EEFGH7890I1Z8", creditLimit: 600000, creditUsed: 180000, totalOrders: 12, totalSales: 510000, registeredDate: "2025-02-12" },
  { id: "shop-6", name: "Kaveri Doors & Laminates", ownerName: "Manoj Hegde", phone: "+91 98450 66778", email: "kaveri.laminates@yahoo.com", address: "BVK Iyengar Road, Chickpet", cityId: "city-3", cityName: "Bangalore", gstin: "29FFGHI1234J1Z3", creditLimit: 800000, creditUsed: 310000, totalOrders: 16, totalSales: 780000, registeredDate: "2025-01-25" },
  { id: "shop-7", name: "Sabarmati Hardware Mart", ownerName: "Jitendra Shah", phone: "+91 98980 44556", email: "sabarmati.mart@gmail.com", address: "Ashram Road, Near Commerce College", cityId: "city-4", cityName: "Ahmedabad", gstin: "24GGHIJ5678K1Z7", creditLimit: 400000, creditUsed: 95000, totalOrders: 10, totalSales: 430000, registeredDate: "2025-03-01" },
  { id: "shop-8", name: "Maratha Building Materials", ownerName: "Prakash Deshmukh", phone: "+91 98230 77889", email: "marathabuilders@rediffmail.com", address: "Tilak Road, Sadashiv Peth", cityId: "city-5", cityName: "Pune", gstin: "27HHIJK9012L1Z1", creditLimit: 500000, creditUsed: 120000, totalOrders: 9, totalSales: 390000, registeredDate: "2025-02-28" },
];

export const seedOrders: Order[] = [
  {
    id: "ord-101", orderNumber: "ORD-89241", shopId: "shop-1", shopName: "Apex Hardware & Sanitaryware", ownerName: "Rajesh Kumar", phone: "+91 98765 43210",
    deliveryAddress: "Shop No 14, Linking Road, Bandra West, Mumbai", cityId: "city-1", cityName: "Mumbai",
    items: [
      { productId: "prod-1", productName: "Jaquar Ceramic Disc Basin Mixer Tap", sku: "JAQ-TAP-801", brand: "Jaquar", category: "Taps", unitPrice: 3450, quantity: 10, totalPrice: 34500, unit: "Box of 2 Pcs" },
      { productId: "prod-6", productName: "Fevicol SH Synthetic Resin Adhesive (50 kg)", sku: "PID-ADH-50K", brand: "Pidilite", category: "Adhesives", unitPrice: 9200, quantity: 2, totalPrice: 18400, unit: "Bucket (50 kg)" },
    ],
    subtotal: 52900, gstAmount: 9522, grandTotal: 62422, paymentMethod: "Cash on Delivery", status: "Pending", paidStatus: "Unpaid", createdAt: "2026-07-28 14:30", estimatedDeliveryDate: "2026-07-30", notes: "Please dispatch morning shift.",
  },
  {
    id: "ord-102", orderNumber: "ORD-89238", shopId: "shop-2", shopName: "National Timber & Plywood Depot", ownerName: "Suresh Patel", phone: "+91 98220 11223",
    deliveryAddress: "Plot 42, Timber Market, Reay Road, Mumbai", cityId: "city-1", cityName: "Mumbai",
    items: [
      { productId: "prod-4", productName: "CenturyPly Club Prime BWP Marine Plywood 19mm", sku: "CEN-PLY-419", brand: "CenturyPly", category: "Plywood", unitPrice: 4600, quantity: 20, totalPrice: 92000, unit: "Sheet (8x4 ft)" },
      { productId: "prod-3", productName: "Greenlam 1mm Textured Suede Laminate Sheet", sku: "GRN-LAM-102", brand: "Greenlam", category: "Laminates", unitPrice: 1850, quantity: 30, totalPrice: 55500, unit: "Sheet (8x4 ft)" },
    ],
    subtotal: 147500, gstAmount: 26550, grandTotal: 174050, paymentMethod: "Credit Line (Net 30)", status: "Confirmed", paidStatus: "Unpaid", dueDate: "2026-08-26", createdAt: "2026-07-27 11:15", estimatedDeliveryDate: "2026-07-29",
  },
  {
    id: "ord-103", orderNumber: "ORD-89220", shopId: "shop-3", shopName: "Royal Bath Fittings & Tiles", ownerName: "Anil Sharma", phone: "+91 98112 33445",
    deliveryAddress: "Sector 18, Hardware Market, Delhi NCR", cityId: "city-2", cityName: "Delhi NCR",
    items: [
      { productId: "prod-2", productName: "Kohler Artifacts Wall Mount Shower Arm & Head", sku: "KOH-BATH-309", brand: "Kohler", category: "Bathroom Accessories", unitPrice: 8900, quantity: 8, totalPrice: 71200, unit: "Piece" },
    ],
    subtotal: 71200, gstAmount: 12816, grandTotal: 84016, paymentMethod: "Cash on Delivery", status: "Delivered", paidStatus: "Paid", createdAt: "2026-07-25 09:45", estimatedDeliveryDate: "2026-07-27",
  },
  {
    id: "ord-104", orderNumber: "ORD-89215", shopId: "shop-4", shopName: "Capital Construction Supplies", ownerName: "Vikas Gupta", phone: "+91 97110 99887",
    deliveryAddress: "Ring Road, Lajpat Nagar III, Delhi NCR", cityId: "city-2", cityName: "Delhi NCR",
    items: [
      { productId: "prod-7", productName: "UltraTech Super Cement 50kg Bags", sku: "ULT-CEM-50", brand: "UltraTech", category: "Construction Materials", unitPrice: 390, quantity: 200, totalPrice: 78000, unit: "Bag (50 kg)" },
    ],
    subtotal: 78000, gstAmount: 14040, grandTotal: 92040, paymentMethod: "Cash on Delivery", status: "Delivered", paidStatus: "Paid", createdAt: "2026-07-24 16:20", estimatedDeliveryDate: "2026-07-26",
  },
  {
    id: "ord-105", orderNumber: "ORD-89210", shopId: "shop-5", shopName: "Deccan Interior Hardware", ownerName: "Karthik Reddy", phone: "+91 99001 22334",
    deliveryAddress: "80 Feet Road, Indiranagar, Bangalore", cityId: "city-3", cityName: "Bangalore",
    items: [
      { productId: "prod-5", productName: "Godrej Stainless Steel Mortise Door Handle Set", sku: "GOD-HW-904", brand: "Godrej", category: "Hardware", unitPrice: 2750, quantity: 15, totalPrice: 41250, unit: "Set of 1 Pair" },
      { productId: "prod-10", productName: 'EBCO Soft Close Ball Bearing Drawer Slides 18"', sku: "EBC-SLD-18", brand: "EBCO", category: "Hardware", unitPrice: 680, quantity: 50, totalPrice: 34000, unit: "Pair" },
    ],
    subtotal: 75250, gstAmount: 13545, grandTotal: 88795, paymentMethod: "Credit Line (Net 30)", status: "Pending", paidStatus: "Unpaid", dueDate: "2026-08-30", createdAt: "2026-07-28 17:10", estimatedDeliveryDate: "2026-07-31",
  },
];

export const seedProducts: Product[] = [
  { id: 1, name: "Jaquar Ceramic Disc Basin Mixer Tap", sku: "JAQ-TAP-801", category: "Taps", brand: "Jaquar", price: 3450, stock: 140, moq: 2, img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=120&q=80", packaging: "Box of 2 Pcs", description: "Premium ceramic mixer tap" },
  { id: 2, name: "Kohler Artifacts Wall Mount Shower Arm & Head", sku: "KOH-BATH-309", category: "Bathroom Accessories", brand: "Kohler", price: 8900, stock: 45, moq: 1, img: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=120&q=80", packaging: "1 Piece", description: "Elegant shower arm" },
  { id: 3, name: "Greenlam 1mm Textured Suede Laminate Sheet", sku: "GRN-LAM-102", category: "Laminates", brand: "Greenlam", price: 1850, stock: 320, moq: 5, img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=120&q=80", packaging: "Sheet (8x4 ft)", description: "Textured suede finish" },
  { id: 4, name: "CenturyPly Club Prime BWP Marine Plywood 19mm", sku: "CEN-PLY-419", category: "Plywood", brand: "CenturyPly", price: 4600, stock: 210, moq: 5, img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=120&q=80", packaging: "Sheet (8x4 ft)", description: "BWP marine grade plywood" },
  { id: 5, name: "Godrej Stainless Steel Mortise Door Handle Set", sku: "GOD-HW-904", category: "Hardware", brand: "Godrej", price: 2750, stock: 180, moq: 4, img: "https://images.unsplash.com/photo-1567225557596-e4f46b1f7e1f?w=120&q=80", packaging: "Set of 1 Pair", description: "Stainless steel mortise handle" },
  { id: 6, name: "Fevicol SH Synthetic Resin Adhesive (50 kg)", sku: "PID-ADH-50K", category: "Adhesives", brand: "Pidilite", price: 9200, stock: 65, moq: 1, img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=120&q=80", packaging: "Bucket (50 kg)", description: "Synthetic resin adhesive" },
  { id: 7, name: "UltraTech Super Cement 50kg Bags", sku: "ULT-CEM-50", category: "Construction Materials", brand: "UltraTech", price: 390, stock: 850, moq: 50, img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&q=80", packaging: "Bag (50 kg)", description: "Premium Portland cement" },
  { id: 8, name: "Teak Finish Molded Panel Wooden Door Leaf", sku: "GPN-DOR-701", category: "Wooden Doors", brand: "Greenpanel", price: 5800, stock: 40, moq: 2, img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=120&q=80", packaging: "Door Leaf", description: "Teak finish molded panel door" },
  { id: 9, name: "Hindware Concealed Diverter & Bath Spout Tap", sku: "HND-TAP-220", category: "Taps", brand: "Hindware", price: 4900, stock: 95, moq: 2, img: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=120&q=80", packaging: "1 Set", description: "Concealed diverter with bath spout" },
  { id: 10, name: 'EBCO Soft Close Ball Bearing Drawer Slides 18"', sku: "EBC-SLD-18", category: "Hardware", brand: "EBCO", price: 680, stock: 400, moq: 10, img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&q=80", packaging: "Pair", description: "Soft close drawer slides" },
  { id: 11, name: "Dr. Fixit 101 Waterproofing Compound 20L", sku: "PID-FIX-20L", category: "Adhesives", brand: "Pidilite", price: 2450, stock: 120, moq: 1, img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=120&q=80", packaging: "Can (20 Litres)", description: "Waterproofing compound" },
  { id: 12, name: "Merino Gloss Metallic Designer Laminate 1.2mm", sku: "MER-LAM-808", category: "Laminates", brand: "Merino", price: 2200, stock: 190, moq: 3, img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=120&q=80", packaging: "Sheet (8x4 ft)", description: "Gloss metallic designer laminate" },
  { id: 13, name: 'Stainless Steel Drain Grate Strainer 6x6"', sku: "JAQ-ACC-004", category: "Bathroom Accessories", brand: "Jaquar", price: 420, stock: 300, moq: 10, img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=120&q=80", packaging: "Piece", description: "Drain grate strainer" },
  { id: 14, name: "Jindal Panther Fe 550D TMT Steel Rebar Bundle", sku: "JIN-TMT-12M", category: "Construction Materials", brand: "Jindal Panther", price: 58500, stock: 18, moq: 1, img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=120&q=80", packaging: "Metric Tonne (1 MT)", description: "TMT steel rebar bundle" },
];

export const defaultSettings: PortalSettings = {
  businessName: "Sunglobalimpex Wholesale Distribution Ltd",
  gstin: "27AABCB5678K1Z2",
  email: "admin@sunglobalimpex.com",
  phone: "+91 90000 12345",
  warehouseAddress: "National Distribution Center, Bhiwandi, Maharashtra 421302",
  deliveryCharge: 500,
  codEnabled: true,
  creditEnabled: true,
  notificationsEnabled: true,
};
