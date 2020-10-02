'use strict'

class FilesService {
  constructor (provider = require('../providers/cloudinary')) {
    this.provider = provider
  }

  uploadFile({ file }) {
    return await this.provider.uploadFile({ file });
  }
}

module.exports = FilesService
