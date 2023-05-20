// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract JACKPOT is Ownable {
    address public BAT;  //write the batman token contract address there
    address public mainContract;
    uint256 public moment;
    address public lastUser;
    uint256 public amountPerHour;
    //using SafeERC20 for IERC20;

    event GetReward(address _winner, uint256 _reward);
    event UserUpdated(address _newUser, uint256 _timestamp);
    event PoolUpdated(address _lastUser, uint256 _timestamp);

    IERC20 token = IERC20(BAT);

    fallback() external {}

    receive() external payable {}

    modifier onlyContract() {
        require(msg.sender == mainContract);
        _;
    }

    constructor(address _bat) {
        BAT = _bat;
    }

    function update(
        uint256 _amount,
        uint256 _time,
        address _user
    ) public onlyContract {
        amountPerHour += _amount;

        if (moment == 0) {
            moment = _time;
            if (_amount > 5 * 10**17) {
                lastUser = _user;
                emit UserUpdated(lastUser, moment);
            }
            return;
        }

        if (_time - moment < 3600) {
            if (amountPerHour >= 5 * 10**17) {
                moment = _time;
                amountPerHour = 0;
                if (_amount >= 5 * 10**17) {
                    lastUser = _user;
                    emit UserUpdated(lastUser, moment);
                }
                emit PoolUpdated(lastUser, moment);
            }
        } else {
            getReward(lastUser);
        }
    }

    function setContractAddress(address _contractAddress) external onlyOwner {
        require(mainContract == address(0), "Contract address can change only once");
        mainContract = _contractAddress;
    }

    function getReward(address _user) private {
        if (_user == address(0)) {
            _user = mainContract;
        }
        emit GetReward(_user, poolSize());
        token.transfer(_user, poolSize());
        lastUser = address(0);
        moment = 0;
        amountPerHour = 0;
    }

    function poolSize() public view returns (uint256) {
     return token.balanceOf(address(this));
    }

}