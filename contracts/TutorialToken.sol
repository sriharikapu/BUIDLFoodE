pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract TutorialToken is ERC20 {
    string public name = "FoodEEth";
    string public symbol = "FFET";
    uint public decimals = 2;
    uint public INITIAL_SUPPLY = 100000;

    constructor() public {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
