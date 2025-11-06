export interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories?: SubCategory[];
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Women',
    slug: 'women',
    subcategories: [
      { id: '1-1', name: 'Dresses', slug: 'dresses' },
      { id: '1-2', name: 'Tops', slug: 'tops' },
      { id: '1-3', name: 'Bottoms', slug: 'bottoms' },
      { id: '1-4', name: 'Outerwear', slug: 'outerwear' },
      { id: '1-5', name: 'Activewear', slug: 'activewear' },
    ]
  },
  {
    id: '2',
    name: 'Men',
    slug: 'men',
    subcategories: [
      { id: '2-1', name: 'Shirts', slug: 'shirts' },
      { id: '2-2', name: 'T-Shirts', slug: 't-shirts' },
      { id: '2-3', name: 'Pants', slug: 'pants' },
      { id: '2-4', name: 'Jackets', slug: 'jackets' },
      { id: '2-5', name: 'Activewear', slug: 'activewear' },
    ]
  },
  {
    id: '3',
    name: 'Kids',
    slug: 'kids',
    subcategories: [
      { id: '3-1', name: 'Girls', slug: 'girls' },
      { id: '3-2', name: 'Boys', slug: 'boys' },
      { id: '3-3', name: 'Baby', slug: 'baby' },
      { id: '3-4', name: 'Accessories', slug: 'accessories' },
    ]
  },
  {
    id: '4',
    name: 'Accessories',
    slug: 'accessories',
    subcategories: [
      { id: '4-1', name: 'Jewelry', slug: 'jewelry' },
      { id: '4-2', name: 'Bags', slug: 'bags' },
      { id: '4-3', name: 'Shoes', slug: 'shoes' },
      { id: '4-4', name: 'Scarves', slug: 'scarves' },
    ]
  },
  {
    id: '5',
    name: 'Home',
    slug: 'home',
    subcategories: [
      { id: '5-1', name: 'Bedding', slug: 'bedding' },
      { id: '5-2', name: 'Bath', slug: 'bath' },
      { id: '5-3', name: 'Decor', slug: 'decor' },
      { id: '5-4', name: 'Kitchen', slug: 'kitchen' },
    ]
  },
  {
    id: '6',
    name: 'Beauty',
    slug: 'beauty',
    subcategories: [
      { id: '6-1', name: 'Skincare', slug: 'skincare' },
      { id: '6-2', name: 'Makeup', slug: 'makeup' },
      { id: '6-3', name: 'Hair Care', slug: 'hair-care' },
      { id: '6-4', name: 'Fragrance', slug: 'fragrance' },
    ]
  }
];
