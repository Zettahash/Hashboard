 const encodeStr = (data) => {
  return Buffer.from(data).toString('base64');
}
 const decodeStr = (data) => {
  return Buffer.from(data, 'base64').toString('ascii');
 }

const walletShortName = function (address) {
  if(!address || address.length<10){return 'no address'}
   return address.substring(0,4) + '...' + address.substring(address.length-5)
 }

 export {encodeStr, decodeStr, walletShortName}