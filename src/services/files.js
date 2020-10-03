'use strict'
const fs = require('fs-extra')
class FilesService {
    constructor (provider = require('../providers/cloudinary')) {
        this.provider = provider
    }

    async uploadFile (paths) {
        const path_urls = []
        console.log(paths)
        for(const path of paths) {
            const newPath = await this.provider.uploadFile(path)
            path_urls.push(newPath)
            if(!path) {
                return false
            } else {
                await fs.unlink(path)
            }
        }
        return {
            myFile: !path_urls[0] ? '' : path_urls[0].secure_url,
            myAvatar:!path_urls[1] ? '' : path_urls[1].secure_url
        }

        
    }
}

module.exports = FilesService