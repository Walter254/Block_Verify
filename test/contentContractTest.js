const ContentContract = artifacts.require("ContentContract");

contract("ContentContract", (accounts) => {
  it("should register content correctly", async () => {
    const instance = await ContentContract.deployed();
    const contentHash = "hash1";
    await instance.registerContent(contentHash, { from: accounts[0] });
    const registeredContent = await instance.contents(contentHash);
    assert.equal(registeredContent.uploader, accounts[0], "Content was not registered correctly.");
    console.log("Content registration test passed.");
  });

  it("should log edits correctly", async () => {
    const instance = await ContentContract.deployed();
    const originalContentHash = "hash1";
    const newContentHash = "hash2";
    await instance.logEdit(originalContentHash, newContentHash, { from: accounts[0] });
    const editHistory = await instance.editHistories(originalContentHash);
    assert.equal(editHistory[0], newContentHash, "Edit was not logged correctly.");
    console.log("Content edit logging test passed.");
  });

  it("should not allow registering the same content hash twice", async () => {
    const instance = await ContentContract.deployed();
    const contentHash = "hash3";
    await instance.registerContent(contentHash, { from: accounts[1] });
    try {
      await instance.registerContent(contentHash, { from: accounts[1] });
      assert.fail("Should not have allowed registering the same content hash twice");
    } catch (error) {
      assert(error.message.indexOf("revert") >= 0, "Expected revert not received");
      console.error("Error caught in test for duplicate content registration:", error);
    }
    console.log("Duplicate content registration test passed.");
  });
});