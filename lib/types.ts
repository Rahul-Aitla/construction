export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  moq: number;
  img: string;
  packaging: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string;
  image: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
  code: string;
  image: string;
}

export interface Shop {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  cityId: string;
  cityName: string;
  gstin: string;
  creditLimit: number;
  creditUsed: number;
  totalOrders: number;
  totalSales: number;
  registeredDate: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  brand: string;
  category: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  unit: string;
}

export type OrderStatus = "Pending" | "Confirmed" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  shopId: string;
  shopName: string;
  ownerName: string;
  phone: string;
  deliveryAddress: string;
  cityId: string;
  cityName: string;
  items: OrderItem[];
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryDate: string;
  notes?: string;
}

export interface PortalSettings {
  businessName: string;
  gstin: string;
  email: string;
  phone: string;
  warehouseAddress: string;
  deliveryCharge: number;
  codEnabled: boolean;
  creditEnabled: boolean;
  notificationsEnabled: boolean;
}

export interface Toast {
  id: number;
  title: string;
  message?: string;
  variant: "success" | "info" | "error";
}
