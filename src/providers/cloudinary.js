'use strict'

const cloudinary = require('cloudinary')
const error = require('../utils/error')

const cloudConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}

class cloudinaryProvider {
    constructor(){
        this.getConnection()
    }
    
    async getConnection() {
        cloudinary.config(cloudConfig)
    }

    async uploadFile(path) {
        try {
            const result = await cloudinary.uploader.upload(path)
            return result;
        } catch (e) {
            console.log(e)
            throw error('There was an error while uploading the file' , 500)
        }
    }


}

module.exports = new cloudinaryProvider()