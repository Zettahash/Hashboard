 const encodeStr = (data) => {
  return Buffer.from(data).toString('base64');
}
 const decodeStr = (data) => {
  return Buffer.from(data, 'base64').toString('ascii');
 }

 export {encodeStr, decodeStr}