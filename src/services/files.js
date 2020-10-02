'use strict'

class FilesService {
    constructor (provider = require('../providers/cloudinary')) {
        this.provider = provider
    }

    async uploadFile (path) {
        try {
            const result = await this.provider.uploadFile(path)
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

module.exports = FilesService