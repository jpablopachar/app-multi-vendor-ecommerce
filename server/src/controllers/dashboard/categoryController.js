/* eslint-disable no-undef */

import { v2 as cloudinary } from 'cloudinary'
import formidable from 'formidable'
import Category from '../../models/category.js'
import { responseReturn } from '../../utils/response.js'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
})

export class CategoryController {
  addCategory = async (req, res) => {
    const form = formidable()

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return responseReturn(res, 400, { error: 'Error parsing the form' })
      }

      const { name } = fields
      const { image } = files

      if (!name || !image) {
        return responseReturn(res, 400, {
          error: 'Name and image are required',
        })
      }

      const slug = this._createSlug(name[0])

      try {
        const imageUrl = await this._uploadImage(image[0].filepath)

        if (!imageUrl) {
          return responseReturn(res, 400, { error: 'Image upload failed' })
        }

        const category = await Category.create({
          name: name[0].trim(),
          slug,
          image: imageUrl,
        })

        return responseReturn(res, 201, {
          category,
          message: 'Category added successfully',
        })
      } catch (error) {
        console.error('Error in addCategory:', error)

        return responseReturn(res, 500, { error: 'Internal Server Error' })
      }
    })
  }

  getCategories = async (req, res) => {
    const { page = 1, searchValue = '', parPage = 10 } = req.query

    const skipPage = (parseInt(page) - 1) * parseInt(parPage)

    try {
      const query = searchValue ? { $text: { $search: searchValue } } : {}

      const [categories, total] = await Promise.all([
        Category.find(query)
          .skip(skipPage)
          .limit(parseInt(parPage))
          .sort({ createdAt: -1 }),
        Category.countDocuments(query),
      ])

      return responseReturn(res, 200, { categories, total })
    } catch (error) {
      console.error('Error in getCategories:', error)

      return responseReturn(res, 500, { error: 'Internal server error' })
    }
  }

  updateCategory = async (req, res) => {
    const form = formidable()

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return responseReturn(res, 400, { error: 'Error parsing the form' })
      }

      const { name } = fields
      const { image } = files
      const { id } = req.params

      if (!name) {
        return responseReturn(res, 400, { error: 'Name is required' })
      }

      // name = name[0].trim()
      const slug = this._createSlug(name[0])

      try {
        const updateData = { name: name[0].trim(), slug }

        if (image) {
          const imageUrl = await this._uploadImage(image[0].filepath)

          if (imageUrl) {
            updateData.image = imageUrl
          } else {
            return responseReturn(res, 400, { error: 'Image upload failed' })
          }
        }

        const category = await Category.findByIdAndUpdate(id, updateData, {
          new: true,
        })

        if (!category)
          return responseReturn(res, 404, { error: 'Category not found' })

        return responseReturn(res, 200, {
          category,
          message: 'Category updated successfully',
        })
      } catch (error) {
        console.error('Error in updateCategory:', error)

        return responseReturn(res, 500, { error: 'Internal server error' })
      }
    })
  }

  deleteCategory = async (req, res) => {
    const { id } = req.params

    try {
      const category = await Category.findByIdAndDelete(id)

      if (!category) {
        return responseReturn(res, 404, { error: 'Category not found' })
      }

      return responseReturn(res, 200, {
        message: 'Category deleted successfully',
      })
    } catch (error) {
      console.error('Error in deleteCategory:', error)

      return responseReturn(res, 500, { error: 'Internal server error' })
    }
  }

  _createSlug = (name) => {
    return name.trim().split(' ').join('-').toLowerCase()
  }

  _uploadImage = async (filepath) => {
    const result = await cloudinary.uploader.upload(filepath, {
      folder: 'categories',
    })

    return result.url
  }
}
