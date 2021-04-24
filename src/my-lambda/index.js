/* eslint-disable @typescript-eslint/require-await */
async function main(event) {
  return {
    body: JSON.stringify({message: 'Lambda response'}),
    statusCode: 200,
  };
}

module.exports = {main};
