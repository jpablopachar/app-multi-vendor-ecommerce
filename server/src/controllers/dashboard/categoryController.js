/* eslint-disable no-undef */

import { v2 as cloudinary } from 'cloudinary'
import formidable from 'formidable'
import Category from '../../models/category.js'
import { responseReturn } from '../../utils/response.js'

export class CategoryController {
  addCategory = async (req, res) => {
    const form = formidable()

    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 404, { error: 'Something went wrong' })
      } else {
        let { name } = fields
        let { image } = files

        name = name[0].trim()

        const slug = name.split(' ').join('-')

        cloudinary.config({
          cloud_name: process.env.CLOUD_NAME,
          api_key: process.env.CLOUD_API_KEY,
          api_secret: process.env.CLOUD_API_SECRET,
          secure: true,
        })

        try {
          const response = await cloudinary.uploader.upload(image[0].filepath, {
            folder: 'categories',
          })

          if (response) {
            const category = await Category.create({
              name,
              slug,
              image: response.url,
            })

            responseReturn(res, 201, {
              category,
              message: 'Category added successfully',
            })
          } else {
            responseReturn(res, 404, { error: 'Image upload failed' })
          }
        } catch {
          responseReturn(res, 500, { error: 'Internal Server Error' })
        }
      }
    })
  }

  getCategories = async (req, res) => {
    const { page, searchValue, parPage } = req.query

    try {
      let skipPage = ''

      if (parPage && page) skipPage = parseInt(parPage) * (parseInt(page) - 1)

      if (searchValue && page && parPage) {
        const categories = await Category.find({
          $text: { $search: searchValue },
        })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 })

        const total = await Category.find({
          $text: { $search: searchValue },
        }).countDocuments()

        responseReturn(res, 200, { categories, total })
      } else if (searchValue === '' && page && parPage) {
        const categories = await Category.find({})
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 })

        const total = await Category.find({}).countDocuments()

        responseReturn(res, 200, { categories, total })
      } else {
        const categories = await Category.find({}).sort({ createdAt: -1 })
        const total = await Category.find({}).countDocuments()

        responseReturn(res, 200, { categories, total })
      }
    } catch (error) {
      console.log(error.message)
    }
  }
}
