export type Category = 'beans' | 'filter-coffee' | 'brewing-gear'

export interface Product {
  id: string
  slug: string
  name: string
  category: Category
  estate?: string
  roast?: 'Light' | 'Medium' | 'Medium-dark' | 'Dark'
  notes?: string
  weight: string
  price: number
  mrp: number
  inStock: boolean
  colour: string
  description: string
}

export const CATEGORIES: { slug: Category; name: string; blurb: string }[] = [
  { slug: 'beans', name: 'Coffee beans', blurb: 'Single-estate beans, roasted every Monday' },
  { slug: 'filter-coffee', name: 'Filter coffee', blurb: 'South Indian filter blends with chicory' },
  { slug: 'brewing-gear', name: 'Brewing gear', blurb: 'Filters, drippers and grinders' },
]

export const PRODUCTS: Product[] = [
  { id: 'KC-B01', slug: 'baba-budangiri-medium', name: 'Baba Budangiri Estate', category: 'beans', estate: 'Baba Budangiri, Chikmagalur', roast: 'Medium', notes: 'Chocolate, orange peel, caramel', weight: '250 g', price: 599, mrp: 699, inStock: true, colour: '#7a4a2a', description: 'Arabica from the hills where coffee first arrived in India. Sweet and balanced, great as a pour-over or in a French press.' },
  { id: 'KC-B02', slug: 'ratnagiri-honey-light', name: 'Ratnagiri Honey Process', category: 'beans', estate: 'Ratnagiri Estate, Chikmagalur', roast: 'Light', notes: 'Jaggery, apricot, black tea', weight: '250 g', price: 749, mrp: 849, inStock: true, colour: '#b5783a', description: 'Honey-processed micro-lot with bright fruit and a long sweet finish. Best as a pour-over.' },
  { id: 'KC-B03', slug: 'coorg-robusta-dark', name: 'Coorg Robusta Kaapi', category: 'beans', estate: 'Kodagu', roast: 'Dark', notes: 'Dark chocolate, nutty, bold', weight: '250 g', price: 449, mrp: 499, inStock: true, colour: '#3b2418', description: 'Strong, low-acid robusta for espresso and milk drinks. The crema lovers\' bag.' },
  { id: 'KC-B04', slug: 'monsooned-malabar-medium', name: 'Monsooned Malabar AA', category: 'beans', estate: 'Mangaluru coast', roast: 'Medium', notes: 'Earthy, spice, low acidity', weight: '250 g', price: 649, mrp: 749, inStock: true, colour: '#5d6b4a', description: 'Beans aged in the monsoon winds of the Malabar coast for a mellow, heavy-bodied cup.' },
  { id: 'KC-B05', slug: 'araku-valley-medium-dark', name: 'Araku Valley Organic', category: 'beans', estate: 'Araku, Andhra Pradesh', roast: 'Medium-dark', notes: 'Cocoa, red fruit, smooth', weight: '250 g', price: 699, mrp: 799, inStock: true, colour: '#8c3b2e', description: 'Grown by tribal farming cooperatives in the Eastern Ghats. Rich and round.' },
  { id: 'KC-B06', slug: 'kalledevarapura-natural-light', name: 'Kalledevarapura Natural', category: 'beans', estate: 'Kalledevarapura, Chikmagalur', roast: 'Light', notes: 'Blueberry, wine, cacao nib', weight: '250 g', price: 849, mrp: 949, inStock: false, colour: '#6b3a5c', description: 'A fruity natural-process micro-lot. Sold out until the next harvest.' },
  { id: 'KC-F01', slug: 'filter-coffee-80-20', name: 'Classic Filter Coffee 80:20', category: 'filter-coffee', roast: 'Dark', notes: 'Strong, chicory, malty', weight: '500 g', price: 449, mrp: 499, inStock: true, colour: '#4a2c1d', description: '80% coffee, 20% chicory, ground for the steel filter. The authentic degree-coffee taste.' },
  { id: 'KC-F02', slug: 'pure-filter-coffee-100', name: 'Pure Filter Coffee (no chicory)', category: 'filter-coffee', roast: 'Medium-dark', notes: 'Smooth, nutty, sweet', weight: '500 g', price: 549, mrp: 599, inStock: true, colour: '#6a3f26', description: '100% coffee, ground for the steel filter, for those who skip the chicory.' },
  { id: 'KC-F03', slug: 'filter-coffee-70-30', name: 'Strong Filter Coffee 70:30', category: 'filter-coffee', roast: 'Dark', notes: 'Bold, thick, chicory-forward', weight: '500 g', price: 399, mrp: 449, inStock: true, colour: '#2f1b12', description: 'The extra-strong, extra-thick blend for milky Kumbakonam-style kaapi.' },
  { id: 'KC-G01', slug: 'steel-south-indian-filter', name: 'Steel South Indian Filter', category: 'brewing-gear', weight: '4-cup', price: 399, mrp: 499, inStock: true, colour: '#9aa3ad', description: 'The classic two-part steel filter. Makes decoction for four cups.' },
  { id: 'KC-G02', slug: 'dabara-tumbler-set', name: 'Dabara & Tumbler Set (2)', category: 'brewing-gear', weight: 'Set of 2', price: 549, mrp: 649, inStock: true, colour: '#b8a07a', description: 'Brass-finish steel dabara and tumbler, for cooling and frothing kaapi the traditional way.' },
  { id: 'KC-G03', slug: 'pour-over-dripper', name: 'Ceramic Pour-over Dripper', category: 'brewing-gear', weight: '1–2 cups', price: 899, mrp: 1099, inStock: true, colour: '#e3dccf', description: 'A hand-glazed dripper made in Khurja. Takes standard size-02 papers.' },
  { id: 'KC-G04', slug: 'hand-grinder', name: 'Burr Hand Grinder', category: 'brewing-gear', weight: '30 g hopper', price: 2499, mrp: 2999, inStock: true, colour: '#3a3f44', description: 'Steel conical burrs with 18 settings, from espresso to French press.' },
]

export const FREE_SHIPPING_FROM = 999
export const SHIPPING_FEE = 79

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug)
export const getById = (id: string) => PRODUCTS.find((p) => p.id === id)
export const inCategory = (c: string) => PRODUCTS.filter((p) => p.category === c)
export const categoryOf = (c: string) => CATEGORIES.find((x) => x.slug === c)
export const inr = (n: number) => '₹' + n.toLocaleString('en-IN')
export const pctOff = (p: Product) => (p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0)
