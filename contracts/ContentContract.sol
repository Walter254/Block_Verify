// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContentContract {
    struct Content {
        address uploader;
        bytes32 hash;
        uint256 timestamp;
    }

    mapping(bytes32 => Content) public contents;
    mapping(bytes32 => bytes32[]) public editHistories;

    event ContentRegistered(bytes32 contentHash, address uploader);
    event ContentEdited(bytes32 originalContentHash, bytes32 newContentHash, address editor);

    // Ensure that the content is being registered for the first time
    function registerContent(bytes32 _hash) public {
        require(contents[_hash].timestamp == 0, "Content already registered.");
        contents[_hash] = Content(msg.sender, _hash, block.timestamp);
        emit ContentRegistered(_hash, msg.sender);
    }

    // Log edits and ensure that only the original uploader can edit the content
    function logEdit(bytes32 _originalHash, bytes32 _newHash) public {
        require(contents[_originalHash].timestamp != 0, "Original content not registered.");
        require(contents[_newHash].timestamp == 0, "New content already registered as original.");
        require(contents[_originalHash].uploader == msg.sender, "Only the original uploader can edit this content.");
        contents[_newHash] = Content(msg.sender, _newHash, block.timestamp);
        editHistories[_originalHash].push(_newHash);
        emit ContentEdited(_originalHash, _newHash, msg.sender);
    }
}
