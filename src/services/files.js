'use strict'
const fs = require('fs-extra')
class FilesService {
  constructor (provider = require('../providers/cloudinary')) {
    this.provider = provider
  }

  async uploadFile (path) {
    const result = await this.provider.uploadFile(path)

    if (result) {
      await fs.unlink(path)
    }

    return result || {}
  }

  async uploadFiles (files) {
    const results = []
    for (const file of files) {
      const result = await this.uploadFile(file.path)
      results.push(result)
    }

    return results
  }
}

module.exports = FilesService
