pragma solidity ^0.4.20;

interface token {
    function transfer(address _to, uint256 _value) public;
    function balanceOf(address tokenOwner) public constant returns (uint256 balance);
}

contract Crowdsale {
    address public beneficiary;
    uint public fundingGoal;
    uint256 public maxToken;
    uint256 public supplyToken;
    uint public amountRaised;
    uint public endTime;
    uint public priceOfEachToken;
    token public tokenReward;
    bool setup=false;
    bool fundingGoalReached = false;
    bool crowdsaleClosed = false;
    event GoalReached(address recipient, uint totalAmountRaised);
    event FundTransfer(address backer, uint amount, bool isContribution);

    /**
     * Constrctor function
     *
     * Setup the owner
     */
    function Crowdsale(
        address ifSuccessfulSendTo,
        uint fundingGoalInEthers,
        uint durationInMinutes,
        uint256 _maxToken,
        address addressOfTokenUsedAsReward
    ) payable {
        beneficiary = ifSuccessfulSendTo;
        fundingGoal = fundingGoalInEthers * 1 ether;
        endTime = now + durationInMinutes * 1 minutes;
        priceOfEachToken = 1 * 1 ether ;
        supplyToken=0;
        maxToken=_maxToken;
        tokenReward = token(addressOfTokenUsedAsReward);
    }

    /**
     * Fallback function
     *
     * The function without name is the default function that is called whenever anyone sends funds to a contract
     */
    function () payable {
        require(now <= endTime && msg.value>0);
        require(!crowdsaleClosed);
        uint amount = msg.value;
        require((supplyToken+amount/priceOfEachToken)<=maxToken);
        amountRaised += amount;
        supplyToken+=amount/priceOfEachToken;
        checkGoalReached();
       tokenReward.transfer(msg.sender,amount/priceOfEachToken);
        FundTransfer(msg.sender, amount, true);
    }
    modifier afterDeadlineORGoalReached() { if (now >= endTime||amountRaised >= fundingGoal||supplyToken>=maxToken) _; }

    /**
     * Check if goal was reached
     *
     * Checks if the goal or time limit has been reached and ends the campaign
     */
    function checkGoalReached() afterDeadlineORGoalReached {
        if (amountRaised >= fundingGoal||supplyToken>=maxToken){
            fundingGoalReached = true;
            crowdsaleClosed = true;
            safeWithdrawal();
            GoalReached(beneficiary, amountRaised);
        }
        crowdsaleClosed = true;
    }

    /**
     * Withdraw the funds
     *
     * Checks to see if goal or time limit has been reached, and if so, and the funding goal was reached,
     * sends the entire amount to the beneficiary. If goal was not reached, each contributor can withdraw
     * the amount they contributed.
     */
    function safeWithdrawal() afterDeadlineORGoalReached {
        if (!fundingGoalReached) {
            uint amount = tokenReward.balanceOf(msg.sender);
            if (amount > 0) {
                if (msg.sender.send(amount*1 ether)) {
                    FundTransfer(msg.sender, amount, false);
                }
            }
        }else {
            if (beneficiary.send(amountRaised)) {
                FundTransfer(beneficiary, amountRaised, false);
            } else {
                //If we fail to send the funds to beneficiary, unlock funders balance
                fundingGoalReached = false;
            }
        }
    }
    function getBalance(address adr)public constant returns(uint256){
        return (tokenReward.balanceOf(adr));
    }
    function getSender()public constant returns(address){
        return(msg.sender);
    }
}



