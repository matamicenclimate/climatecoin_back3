const pinataSDK = require('@pinata/sdk')
const { Readable } = require('stream')

class IpfsPinataStorage {
  constructor() {
    try {
      const apiKey = process.env.PINATA_KEY
      const apiSecret = process.env.PINATA_SECRET
      this.storage = pinataSDK(apiKey, apiSecret)
    } catch (error) {
      const message = `Instanciate 'IpfsPinataStorage' class error: ${error.message}`
      throw new Error(message)
    }
  }

  prepare(file, mime) {
    try {
      this.readableStreamForFile = Readable.from(file.buffer)
      this.readableStreamForFile.path = file.originalname
      this.options = this.options = {
        pinataMetadata: {
          ...mime,
        },
        pinataOptions: { cidVersion: 0 },
      }
    } catch (error) {
      const message = `Instanciate IpfsPinataStorage 'File' class error: ${error}`
      throw new Error(message)
    }
  }

  async store() {
    try {
      const result = await this.storage.pinFileToIPFS(
        this.readableStreamForFile,
        this.options
      )
      console.log('....', result)
      return result
    } catch (error) {
      const message = `Calling store of 'IpfsPinataStorage' error: ${error}`
      throw new Error(message)
    }
  }
}

module.exports = IpfsPinataStorage
