'use client';

import React, { useEffect, useState } from 'react';
import { Category } from '../../types/category';
import { categoryService } from '../../services/categoryService';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFeatured, setFilterFeatured] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'createdAt'>('createdAt');
  const router = useRouter();

  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    featured: false,
    subcategories: []
  });

  const [newSubcategory, setNewSubcategory] = useState({
    name: '',
    slug: '',
    description: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter and sort categories
  useEffect(() => {
    let result = [...categories];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.subcategories.some(sub => 
          sub.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply featured filter
    if (filterFeatured) {
      result = result.filter(category => category.featured);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setFilteredCategories(result);
  }, [categories, searchTerm, filterFeatured, sortBy]);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError('Failed to load categories');
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'klyra_uploads');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      setNewCategory({ ...newCategory, image: data.secure_url });
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await categoryService.create(newCategory);
      setNewCategory({
        name: '',
        slug: '',
        description: '',
        image: '',
        featured: false,
        subcategories: []
      });
      fetchCategories();
    } catch (err) {
      console.error('Error creating category:', err);
      setError('Failed to create category');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      await categoryService.delete(id);
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
      setError('Failed to delete category');
    }
  };

  const handleAddSubcategory = (categoryId: string) => {
    const category = categories.find(c => c._id === categoryId);
    if (!category) return;

    const updatedCategory = {
      ...category,
      subcategories: [...category.subcategories, newSubcategory]
    };

    try {
      categoryService.update(categoryId, updatedCategory);
      setNewSubcategory({
        name: '',
        slug: '',
        description: ''
      });
      fetchCategories();
    } catch (err) {
      console.error('Error adding subcategory:', err);
      setError('Failed to add subcategory');
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'createdAt')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="createdAt">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.checked)}
              className="form-checkbox h-5 w-5 text-primary-600"
            />
            <span>Featured Only</span>
          </label>
        </div>
      </div>

      {/* Add New Category Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({
                  ...newCategory,
                  name: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input
                type="text"
                value={newCategory.slug}
                onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
              required
            />
            {newCategory.image && (
              <div className="mt-2 relative h-32 w-32">
                <Image
                  src={newCategory.image}
                  alt="Category preview"
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newCategory.featured}
                onChange={(e) => setNewCategory({ ...newCategory, featured: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm font-medium">Featured Category</span>
            </label>
          </div>

          <button
            type="submit"
            className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Add Category
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div className="space-y-6">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-gray-500">
              {loading ? 'Loading categories...' : 'No categories found'}
            </p>
          </div>
        ) : (
          filteredCategories.map((category) => (
          <div key={category._id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
                <p className="text-sm text-gray-500">Slug: {category.slug}</p>
                {category.featured && (
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded mt-2">
                    Featured
                  </span>
                )}
              </div>
              <div className="relative h-24 w-24">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
            </div>

            {/* Subcategories */}
            <div className="mt-4">
              <h4 className="font-medium mb-2">Subcategories</h4>
              <div className="space-y-2">
                {category.subcategories?.map((sub) => (
                  <div key={sub._id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span>{sub.name}</span>
                    <span className="text-sm text-gray-500">({sub.slug})</span>
                  </div>
                ))}
              </div>

              {/* Add Subcategory Form */}
              <div className="mt-4 border-t pt-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Subcategory name"
                    value={newSubcategory.name}
                    onChange={(e) => setNewSubcategory({
                      ...newSubcategory,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                    })}
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    onClick={() => handleAddSubcategory(category._id!)}
                    className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-end">
              <button
                onClick={() => handleDelete(category._id!)}
                className="text-red-600 hover:text-red-800"
              >
                Delete Category
              </button>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
}