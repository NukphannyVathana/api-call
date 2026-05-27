const API_BASE = 'https://dummyjson.com/products'

const mapProduct = (product) => ({
  id: product.id,
  name: product.title ?? product.name,
  price: product.price,
  category: product.category ?? 'Uncategorized',
  rating: product.rating ?? 0,
  image: product.thumbnail || (product.images?.[0] ?? ''),
  description: product.description ?? ''
})

export const fetchProducts = async (query = '') => {
  const endpoint = query
    ? `${API_BASE}/search?q=${encodeURIComponent(query)}`
    : API_BASE

  const response = await fetch(endpoint)
  if (!response.ok) {
    throw new Error('Failed to load products from API')
  }

  const data = await response.json()
  return Array.isArray(data.products)
    ? data.products.map(mapProduct)
    : []
}

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`)
  if (!response.ok) {
    throw new Error('Product not found')
  }

  const product = await response.json()
  return mapProduct(product)
}
