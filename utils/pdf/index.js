const { format } = require('date-fns')

var Module = require('module')
var fs = require('fs')

Module._extensions['.png'] = function (module, fn) {
  var base64 = fs.readFileSync(fn).toString('base64')
  module._compile('module.exports="data:Logo/jpg;base64,' + base64 + '"', fn)
}

var Logo = require('./assets/logo-light.png')

const puppeteer = require('puppeteer')
const path = require('path')

async function createPDF(html, filePath) {
  // launch a new chrome instance
  const browser = await puppeteer.launch({
    //
    // Descomentar esta línea antes de mergear
    //
    // executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox'],
  })

  // create a new page
  const page = await browser.newPage()
  // set your html as the pages content

  await page.setContent(html, {
    waitUntil: 'domcontentloaded',
  })

  // create a pdf buffer
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  })

  // or a .pdf file
  // await page.pdf({
  //   format: 'A4',
  //   path: path.join('public/uploads', filePath),
  // })

  // close the browser
  await browser.close()

  return pdfBuffer
}

/***
 *
 * @param txnId {string}
 * @param ipfsCids
 * @param nfts
 * @param burnReceipt
 * @returns {string}
 */
const generateCompensationPDF = (txnId, ipfsCids, nfts, burnReceipt) => {
  console.log(txnId, ipfsCids, nfts, burnReceipt)

  function renderHeader() {
    return nfts.map(
      (nft) => `
      <div style="width: 100%; padding: 60px; display: grid; grid-template-rows: 1fr 1fr 1fr; background-color: #364237; grid-auto-rows: min-content;">
      <div style="width: 100%; height: min-content;  display: grid; grid-template-rows: 1fr;">
      <img src="${Logo}" alt="Climatecoin logo"  style="width: 180px; grid-row: 1/2"/>
      <div style="font-size: 18px; text-align:right; grid-row: 1/2">
      <p style="color: #fcfcfd">${format(new Date(nft.createdAt), 'dd/MM/yyyy')}</p>
      <p style="color: #b1b5c3;">#${nft.id}</p>
      </div>
          <hr style="width: 100%; grid-column: 1/3;"/>
    </div>
      <h1 style="max-width: 40%; height: min-content; font-size: 60px; color: #00db7d; grid-row: 2/3; margin:0px; padding:20px 0px;">
      ${nft.metadata.properties.title} compensation certificate
      </h1>
      <p style="max-width: 80%; height: min-content; font-size: 16px; color: #fcfcfd; grid-row: 3/3; margin-bottom:0px;">
      You have compensate <strong>543.12 t</strong> of <strong>CO2</strong> 
      for this project from ClimateCoin.
      This certificate is official, created and validated by Climatecoin.
      </p>
    </div>
    `,
    )
  }

  function renderNftCard() {
    return nfts.map(
      (nft) => `
      <div style="width: 100%; padding: 60px;">
      <div style="width: 100%; display: grid; grid-template-columns: 1fr 1fr ; grid-template-rows: 1fr; gap: 36px;">
      <dl style="grid-column: 1 / 4; grid-row: 1 ; border: 1px #e6e8ec solid; border-radius: 15px; padding: 20px; margin:0px;">
        <dt style="margin-bottom: 5px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">
          Project
        </dt>
        <dd style="margin-bottom: 5px; margin-left:0px">${nft.metadata.properties.title}</dd>
        <hr />
        <div style=" display: grid; grid-template-columns: 1fr 1fr ; grid-template-rows: 1fr 1fr">
          <div>
            <dt style="margin-bottom:5px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">
              Standard
            </dt>
            <dd style="margin-bottom: 5px; margin-left:0px">${nft.metadata.standard}</dd>
          </div>
          <div>
            <dt style="margin-bottom:5px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">
              Serial Number
            </dt>
            <dd style="margin-bottom: 5px; margin-left:0px">${nft.metadata.properties.serial_number}</dd>
          </div>
          <div>
            <dt style="margin-bottom:5px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">
              Total Climatecoins
            </dt>
            <dd style="font-weight: 500; line-height: 1.71; margin-inline-start: 0px; text-align: left; color: #00db7d;">
              ${nft.metadata.properties.credits}
            </dd>
          </div>
          <div>
            <dt style="margin-bottom:5px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">
              In Euros
            </dt>
            <dd style="margin-bottom: 5px; margin-left:0px">${nft.metadata.properties.credits}</dd>
          </div>
        </div>
        <hr />
        <div style=" display: grid; grid-template-columns: 1fr 1fr ; grid-template-rows: 1fr">
          <div>
            <dt style="margin-bottom:5px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">
              ID project
            </dt>
            <dd style="margin-bottom: 5px; margin-left:0px">${nft.metadata.properties.id}</dd>
          </div>
          <div>
            <dt style="margin-bottom:5px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">
              External Url
            </dt>
            <dd style="margin-bottom: 5px; margin-left:0px">${nft.metadata.external_url}</dd>
          </div>
        </div>
        <hr />
        <div style=" display: grid; grid-template-columns: 1fr 1fr ; grid-template-rows: 1fr ">
          <div>
            <dt style="margin-bottom:5px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">
              ID Transaction
            </dt>
            <dd style="margin-bottom: 5px; margin-left:0px">${nft.asa_txn_id}</dd>
          </div>
          <div>
            <dt style="margin-bottom:5px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">
              Network
            </dt>
            <dd style="margin-bottom: 5px; margin-left:0px">Algorand</dd>
          </div>
        </div>
      </dl>
    </div>
    `,
    )
  }

  function renderSign() {
    return nfts.map(
      (nft) => `
          <div style="width: 100%; display: grid; grid-template-columns: 1fr 1fr 1fr ; margin-top: 15px;">
          <div>
            <p>firma</p>
          </div>
          <div style="text-align:right; grid-column-start: 3;"> 
            <p style="color:#777e90">If you have any questions or suggestions about this certificate, please write to us at:</p>
            <p style="color:#00db7d">certificates@climatecoin.io</p>
          </div>
         </div>
      </div>
    </div>
    `,
    )
  }

  return `
  <html>
  <body style="max-width: 780px; max-height: 1123px; margin:0px; top: 0; left:0">
    ${renderHeader().join('')}
    ${renderNftCard().join('')}
    ${renderSign().join('')}      
   </body>
</html>
`
}
module.exports = {
  createPDF,
  generateCompensationPDF,
}
