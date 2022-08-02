const IpfsStorage = require('./IpfsPinataStorage')

/***
 *
 * @param pdfBuffer
 * @param mime
 * @returns {Promise<(string & {tag?: CID})|undefined>}
 */
 async function uploadFileToIPFS(pdfBuffer, mime) {
  const storage = new IpfsStorage()
  await storage.prepare(pdfBuffer, mime)
  return storage.store()
}

module.exports = {
  uploadFileToIPFS
}