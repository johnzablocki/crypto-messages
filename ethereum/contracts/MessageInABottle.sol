pragma solidity ^0.4.24;

contract MessageInABottle {

    address private _owner;
    string public message;

    constructor(string initialMessage) public {
        _owner = msg.sender;
        message = initialMessage;
    }

    function setMessage(string newMessage) public payable requireMinimumWei {
        message = newMessage;
        _owner.transfer(msg.value);
    }

    modifier requireMinimumWei() {
        require(msg.value > 100, "At least 100 wei requried");
        _;
    }
}
