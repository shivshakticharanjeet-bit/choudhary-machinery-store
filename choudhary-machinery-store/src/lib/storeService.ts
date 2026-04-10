import { v4 as uuidv4 } from 'uuid';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'screw' | 'machine';
  imageUrl: string;
  specs?: Record<string, string>;
  createdAt: number;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  productId?: string;
  createdAt: number;
}

const PRODUCTS_KEY = 'choudhary_products';
const INQUIRIES_KEY = 'choudhary_inquiries';

// Initial data
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Self-Tapping Screw',
    description: 'High-quality zinc-plated self-tapping screws for metal and wood.',
    price: 0.5,
    category: 'screw',
    imageUrl: 'https://picsum.photos/seed/screw1/400/300',
    specs: { Material: 'Zinc Plated Steel', Size: 'M4 x 20mm' },
    createdAt: Date.now()
  },
  {
    id: '2',
    name: 'Automatic Screw Making Machine',
    description: 'High-speed automatic screw heading machine for mass production.',
    price: 15000,
    category: 'machine',
    imageUrl: 'https://picsum.photos/seed/machine1/400/300',
    specs: { Capacity: '100-150 pcs/min', Power: '5.5 kW' },
    createdAt: Date.now()
  }
];

export const formatINR = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const authService = {
  login: (password: string): boolean => {
    if (password === 'admin123') {
      localStorage.setItem('choudhary_auth', 'true');
      return true;
    }
    return false;
  },
  logout: () => {
    localStorage.removeItem('choudhary_auth');
  },
  isAuthenticated: (): boolean => {
    return localStorage.getItem('choudhary_auth') === 'true';
  }
};

export const storeService = {
  getProducts: (): Product[] => {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (!stored) {
      // Convert initial prices to INR (approx 80x)
      const inrProducts = INITIAL_PRODUCTS.map(p => ({
        ...p,
        price: p.price * (p.category === 'machine' ? 80000 : 5)
      }));
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(inrProducts));
      return inrProducts;
    }
    return JSON.parse(stored);
  },

  addProduct: (product: Omit<Product, 'id' | 'createdAt'>): Product => {
    const products = storeService.getProducts();
    const newProduct: Product = {
      ...product,
      id: uuidv4(),
      createdAt: Date.now()
    };
    products.push(newProduct);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return newProduct;
  },

  deleteProduct: (id: string) => {
    const products = storeService.getProducts().filter(p => p.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  },

  getInquiries: (): Inquiry[] => {
    const stored = localStorage.getItem(INQUIRIES_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Inquiry => {
    const inquiries = storeService.getInquiries();
    const newInquiry: Inquiry = {
      ...inquiry,
      id: uuidv4(),
      createdAt: Date.now()
    };
    inquiries.push(newInquiry);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
    return newInquiry;
  }
};
