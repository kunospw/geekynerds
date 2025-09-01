import { FiGrid } from 'react-icons/fi'
import { BiCodeAlt, BiData, BiServer, BiMobile } from 'react-icons/bi'

// Shared category list used by ProductPage and ProductSection
const CATEGORIES = [
  { id: 'all', name: 'All Books', icon: FiGrid, query: '' },
  { id: 'javascript', name: 'JavaScript', icon: BiCodeAlt, query: 'javascript' },
  { id: 'python', name: 'Python', icon: BiCodeAlt, query: 'python' },
  { id: 'react', name: 'React', icon: BiCodeAlt, query: 'react' },
  { id: 'nodejs', name: 'Node.js', icon: BiServer, query: 'nodejs' },
  { id: 'data', name: 'Data Science', icon: BiData, query: 'data-science' },
  { id: 'mobile', name: 'Mobile Dev', icon: BiMobile, query: 'mobile-development' },
]

export default CATEGORIES
