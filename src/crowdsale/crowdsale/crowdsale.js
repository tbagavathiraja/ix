 if (typeof web3 !== 'undefined') {
     web3 = new Web3(web3.currentProvider);
 } else {
 // set the provider you want from Web3.providers
     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
 }

 web3.eth.getAccounts(function(err, accounts){
     if(accounts.length > 0){
 accountList = accounts;
        defalutAccount = accountList[0];
        console.log(accountList);
    }
    else if(err){
         console.log(err);
     }
 });

web3.eth.getAccounts(function(err, accounts){
    if (err != null) console.error("An error occurred: "+ err);
    else if (accounts.length == 0) {
      alert("User is not logged in to MetaMask");
    }
    else console.log("User is logged in to MetaMask");

    switch (web3.version.network) {
        case "1":
            console.log('This is mainnet')
            break;
        case "3":
            console.log('This is the ropsten test network.')
            break;
        case "4":
            console.log('This is the Rinkeby test network.')
            break;
        case "42":
            console.log('This is the Kovan test network.')
            break;
        default:
            console.log('This is a private network.')
    }
});


function getContract() {
    var root_instance = web3.eth.contract([
        {
            "constant": false,
            "inputs": [],
            "name": "checkGoalReached",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "deadline",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "beneficiary",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "tokenReward",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "fundingGoal",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "amountRaised",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "price",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "safeWithdrawal",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "ifSuccessfulSendTo",
                    "type": "address"
                },
                {
                    "name": "fundingGoalInEthers",
                    "type": "uint256"
                },
                {
                    "name": "durationInMinutes",
                    "type": "uint256"
                },
                {
                    "name": "etherCostOfEachToken",
                    "type": "uint256"
                },
                {
                    "name": "addressOfTokenUsedAsReward",
                    "type": "address"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "constructor"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "totalAmountRaised",
                    "type": "uint256"
                }
            ],
            "name": "GoalReached",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "backer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "isContribution",
                    "type": "bool"
                }
            ],
            "name": "FundTransfer",
            "type": "event"
        }
    ]);
    var instance = root_instance.at("0x090a094b76305b810a087960cd0398e9185396ea");
    return instance;
}
function hello () {
  return ' i am working'
}

function createNewContract() {

    var bytecode = document.getElementById("bytecode").value ;
    var interface = document.getElementById("interface").value ;

    if (bytecode == '' || interface == ''){
        alert("Check");
        return;
    }

    var sender = accountList[0];

    var api = JSON.parse(interface);

    var data = '0x' + bytecode;
    var tmpContract = web3.eth.contract(api);

    var ifSuccessfulSendTo = "0xe339106b781b83201a727ed02036b9281437fd17";
    var fundingGoalInEthers = 20;
    var durationInMinutes = 5000000;
    var maxtoken = 1000000000;
    var addressOfTokenUsedAsReward = "0x8c4d51c2de9435cd457013c2f36ddd556c334765";
    var voting = tmpContract.new(
        ifSuccessfulSendTo,fundingGoalInEthers,durationInMinutes,maxtoken,addressOfTokenUsedAsReward,
        {
            from: sender,
            data: data,
            gas: 4000000
        }, function(e, contract){
            console.log(e, contract);
            if (typeof contract.address != 'undefined') {
                document.getElementById("hashcode").innerText =  contract.transactionHash;

                var  transactionHashCode = contract.transactionHash;
                document.getElementById("hashcode").innerText =  transactionHashCode;
                var contractCode = contract.address;
                document.getElementById("contract").innerText =  contractCode;
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
            }
        });
}

function checkGoalReached() {
    var contract = getContract();
    contract.checkGoalReached({from:defalutAccount,gas:3000000},function (error,response) {
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}


function safeWithdrawal() {
    var contract = getContract();
    contract.safeWithdrawal({from:defalutAccount,gas:3000000},function (error,response) {
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}

function fallback() {
    var contract = getContract();
    var ether = document.getElementById('ether').value;
    web3.eth.sendTransaction({from: defalutAccount,to: "0x090a094b76305b810a087960cd0398e9185396ea",gas: 3000000,value: web3.toWei(ether, "ether")
    },function (error,response){
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}

function getBalance(){
    var address = "";
    var contract = getContract();
    contract.getBalance(address,{from: defalutAccount,to: "0x090a094b76305b810a087960cd0398e9185396ea",gas: 3000000,value: web3.toWei(ether, "ether")
    },function (error,response){
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}


var contract = getContract();
var GoalReachedEvent = contract.GoalReached();
var FundTransferEvent = contract.FundTransfer();
GoalReachedEvent.watch(function (error,response) {
   console.log(response);
});

FundTransferEvent.watch(function(error,response){
   console.log(response);
});

