const ContentContract = artifacts.require('.../contracts/ContentContract');

module.exports = async function (deployer) {
  await deployer.deploy(ContentContract);
  const contentContract = await ContentContract.deployed();

  console.log('Deployed ContentContract address:', contentContract.address);
};