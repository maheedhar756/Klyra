import { Schema, model, models } from 'mongoose';

const SubCategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
});

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  featured: {
    type: Boolean,
    default: false
  },
  subcategories: [SubCategorySchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamps on save
CategorySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Category = models.Category || model('Category', CategorySchema);