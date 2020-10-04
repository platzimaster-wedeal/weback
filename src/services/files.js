'use strict'
const fs = require('fs-extra')
class FilesService {
  constructor (provider = require('../providers/cloudinary')) {
    this.provider = provider
  }

  // async uploadFile (paths) {
  //     const resolvePromise = async (path) => {
  //       const newPath = await this.provider.uploadFile(path)
  //       if (newPath) {
  //         await fs.unlink(path)
  //       }
  //       return newPath || ''
  //     }
  //     const arrayOfPromises = paths.map(path => resolvePromise(path));

  //     try {
  //       const paths = await Promise
  //         .all(arrayOfPromises)

  //       console.log('Valor de paths desde el servicio', paths)
  //         if(typeof paths === 'object') {
  //           console.log('secure_url', paths.secure_url[0])
  //           return paths.secure_url[0]
  //         } else {
  //           return {
  //             myAvatar: !paths[0] ? '' : paths[0].secure_url,
  //             myFile: !paths[1] ? '' : paths[1].secure_url
  //           }
  //         }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

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
      console.log(file)
      const result = await this.uploadFile(file.path)
      results.push(result)
    }

    return results
  }
}

module.exports = FilesService
