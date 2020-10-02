'use strict'
const fs = require('fs-extra')
class FilesService {
    constructor (provider = require('../providers/cloudinary')) {
        this.provider = provider
    }

    async uploadFile (paths) {
            try {
                const result = await this.provider.uploadFile(paths[0])
                const result1 = await this.provider.uploadFile(paths[1])
                await fs.unlink(paths[0])
                await fs.unlink(paths[1])
                return {
                    myFile: result,
                    myAvatar: result1
                }
            } catch (error) {
                console.log(error)
                return false
            }
        
    }
}

module.exports = FilesService