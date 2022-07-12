import Logo from '../../admin/src/assets/images/logo-light.png'

const puppeteer = require('puppeteer')
const path = require('path')

async function createPDF(html, filePath) {
  // launch a new chrome instance
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
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
  return `
  <html>
  <body style="max-width: 100% ">
      <div style="width: 100%; padding: 72px; display: grid; grid-template-rows: 1fr 1fr 1fr; background-color: #364237">
        <div style="width: 100%; height: max-content;  display: grid; grid-template-rows: 1fr;">
             <img src="url(${Logo})" style="width: 220px; font-size: 26px; color: #f4f5f6; grid-row: 1/2"/>
        <div style="font-size: 18px; text-align:right; grid-row: 1/2">
             <p style="color: #fcfcfd">14 julio 2022</p>
             <p style="color: #b1b5c3;">#443-765-998</p>
        </div>
            <hr style="width: 100%; grid-column: 1/3;"/>
      </div>
        <h2 style="max-width: 40%; height: max-content; font-size: 78px; color: #00db7d; grid-row: 2/4">title compensation certificate</h2>
        <p style="max-width: 80%; height: max-content; font-size: 26px; color: #fcfcfd; grid-row: 4/4">You have compensate <strong>543.12 t</strong> of <strong>CO2</strong> for this project from ClimateCoin.
            This certificate is official, created and validated by Climatecoin.
        </p>
      </div>
      <div style="width: 100%; padding: 72px;">
         <div style="width: 100%; display: grid; grid-template-columns: 1fr 1fr 1fr  1fr; grid-template-rows: 1fr; gap: 36px;">
            <dl style="grid-column: 1 / 4; grid-row: 1 ; border: 1px #e6e8ec
               solid; border-radius: 8px; padding: 24px; margin:0px;">
               <dt style="margin:10px 0px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;" >Project'</dt>
               <dd style="margin-bottom: 16px; margin-left:0px">${nft.metadata.properties.title} </dd>
               <hr/>
               <div style=" display: grid; grid-template-columns: 1fr 1fr ; grid-template-rows: 1fr 1fr">
                  <div>
                     <dt style="margin:10px 0px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">standard'</dt>
                     <dd style="margin-bottom: 16px; margin-left:0px">${nft.metadata.properties.standard} </dd>
                  </div>
                  <div>
                     <dt style="margin:10px 0px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">Serial Number'</dt>
                     <dd style="margin-bottom: 16px; margin-left:0px">${nft.metadata.properties.serial_number} </dd>
                  </div>
                  <div>
                     <dt style="margin:10px 0px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">Total Climatecoins</dt>
                     <dd style="font-weight: 500; line-height: 1.71; margin-inline-start: 0px; text-align: left; color: #00db7d;">${nft.metadata.properties.supply}</dd>
                  </div>
                  <div>
                     <dt style="margin:10px 0px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">In Euros'</dt>
                     <dd style="margin-bottom: 16px; margin-left:0px">${nft.metadata.properties.supply}</dd>
                  </div>
               </div>
               <hr/>
               <div style=" display: grid; grid-template-columns: 1fr 1fr ; grid-template-rows: 1fr">
                  <div>
                     <dt style="margin:10px 0px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">ID project'</dt>
                     <dd style="margin-bottom: 16px; margin-left:0px">${nft.metadata.properties.asa_id}</dd>
                  </div>
                  <div>
                     <dt style="margin:10px 0px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">Registry</dt>
                     <dd style="margin-bottom: 16px; margin-left:0px">${nft.metadata.properties.registry}</dd>
                  </div>
               </div>
               <hr/>
               <div style=" display: grid; grid-template-columns: 1fr 1fr ; grid-template-rows: 1fr ">
                  <div>
                     <dt style="margin:10px 0px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">ID Transaction</dt>
                     <dd style="margin-bottom: 16px; margin-left:0px">${nft.metadata.properties.txnId}</dd>
                  </div>
                  <div>
                     <dt style="margin:10px 0px; font-size: 14px; line-height: 1.71; text-align: left; color: #777e90;">Network</dt>
                     <dd style="margin-bottom: 16px; margin-left:0px">Algorand</dd>
                  </div>
               </div>
            </dl>
            <div style="grid-column: 4; justify-content:center; justify-self: center; padding: 54px 40px 22px 40px ;border-radius: 12px;
               border: solid 1px #e6e8ec;">
               <img style="background-color:red;  width: 270px;
                  height: 270px;"/>
               <p style='padding-top:20px; width: 247px;
                  '>Scan the code to view the transaction on the blockchain network</p>
            </div>
         </div>
         <div style="width: 100%; display: grid; grid-template-columns: 1fr  1fr 1fr 1fr;">
            <div>
               <p>firma</p>
            </div>
            <div style="text-align:right; grid-column-start: 4;">
               <p style="color:#777e90">If you have any questions or suggestions about this certificate, please write to us at:</p>
               <p style="color:#00db7d">
                  certificates@climatecoin.io
               </p>
            </div>
         </div>
      </div>
      </div>
   </body>
</html>
`
}
module.exports = {
  createPDF,
  generateCompensationPDF,
}
