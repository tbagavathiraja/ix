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

function getContract(){
    var  root_instance = web3.eth.contract([
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_adr",
                    "type": "address"
                }
            ],
            "name": "getAllowance",
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
            "name": "totalSupply",
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
            "inputs": [
                {
                    "name": "_from",
                    "type": "address"
                },
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "burn",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "adr",
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
            "name": "getMessageSender",
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
            "constant": false,
            "inputs": [
                {
                    "name": "_from",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "burnFrom",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_from",
                    "type": "address"
                },
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "returnAmount",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getOwner",
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
            "name": "owner",
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
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "app",
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
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                },
                {
                    "name": "_extraData",
                    "type": "bytes"
                }
            ],
            "name": "approveAndCall",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allowance",
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
            "inputs": [
                {
                    "name": "initialSupply",
                    "type": "uint256"
                },
                {
                    "name": "tokenName",
                    "type": "string"
                },
                {
                    "name": "tokenSymbol",
                    "type": "string"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "tokenOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "tokens",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "farom",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Burn",
            "type": "event"
        }
    ]);
    var contract_instance = root_instance.at("0x8c4d51c2de9435cd457013c2f36ddd556c334765");
    return contract_instance;
}

var contract = getContract();
var transferEvent = contract.Transfer();
var burnEvent = contract.Burn();

transferEvent.watch(function (error,respone) {
   console.log(respone);
});

burnEvent.watch(function (error,response) {
    console.log(response);
});


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

    var initialsupply = 100000000000;
    var name = "INX-TECH";
    var symbol = "IXC";
    var voting = tmpContract.new(
        initialsupply,name,symbol,
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


function transfer() {
    var toaddress = document.getElementById('to').value;
    var value = document.getElementById('value').value;
    var contract_instance = getContract();
    contract_instance.transfer(toaddress,value,checkGoalReached);
}

function transferFrom() {
    var from = document.getElementById('transfer_from').value;
    var to = document.getElementById('transfer_to').value;
    var value = document.getElementById('transfer_value').value;
    var contract_instance = getContract();
    contract_instance.transferFrom(from,to,value,{from:defalutAccount,gas:3000000},function (error,response) {
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}

//remove
function returnAmount() {
    var from = document.getElementById('return_from').value;
    var to = document.getElementById('return_to').value;
    var value = document.getElementById('return_value').value;
    var contract_instance = getContract();
    contract_instance.returnAmount(from,to,value,{from:defalutAccount,gas:3000000},function (error,response) {
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}

//remove
function balanceOf() {
    var address = document.getElementById('address').value;
    var contract_instance = getContract();
    contract_instance.balanceOf(address,{from:defalutAccount,gas:3000000},function (error,response) {
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}

//remove
function getAllowance() {
    var owner = document.getElementById('allowance_owner').value;
    var to = document.getElementById('allowance_to').value;
    var contract_instance = getContract();
    contract_instance.getAllowance(owner,to,{from:defalutAccount,gas:3000000},function (error,response) {
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}

//remove
function getOwner(){
    var owner = document.getElementById('owner').value;
    var contract_instance = getContract();
    contract_instance.getOwner(owner,{from:defalutAccount,gas:3000000},function (error,response) {
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}


function approve() {
    var spender = document.getElementById('spender').value;
    var value = document.getElementById('appr_value').value;
    var contract = getContract();
    contract.approve(spender,value,{from:defalutAccount,gas:3000000},function (error,response) {
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}


function approveAndCall(){
    var spender = document.getElementById('approve_spender').value;
    var value = document.getElementById('approve_value').value;
    var data = document.getElementById('approve_data').value;
    var contract = getContract();
    contract.approveAndCall(spender,value,data,{from:defalutAccount,gas:3000000},function (error,response) {
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}


function burn(){
    var value = document.getElementById('burn_value').value;
    var contract = getContract();
    contract.burn(value,{from:defalutAccount,gas:3000000},function (error,response) {
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}


function burnFrom(){
    var from = document.getElementById('burnfrom').value;
    var value = document.getElementById('burnvalue').value;
    var contract = getContract();
    contract.burnFrom(from,value,{from:defalutAccount,gas:3000000},function (error,response) {
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}


function mintToken(){
    var target = "";
    var amount = 1;
    var contract = getContract();
    contract.mintToken(target,amount,{from:defalutAccount,gas:3000000},function (error,response) {
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}


function setPrice() {
    var buyprice = 1;
    var sellprice = 1;
    var contract = getContract();
    contract.setPrices(sellprice,buyprice,{from:defalutAccount,gas:3000000},function (error,response) {
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}


function buy(){
    var amount = 1;
    var contract = getContract();
    contract.buy({from:defalutAccount,gas:3000000,value:amount},function (error,response) {
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}

function sell(){
    var amount = 1;
    var contract = getContract();
    contract.sell(amount,{from:defalutAccount,gas:3000000},function (error,response) {
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}

function refund(){
    var from = "";
    var to = "";
    var amount = 1;
    var contract = getContract();
    contract.refundAmount(from,to,amount,{from:defalutAccount,gas:3000000},function (error,response) {
        if(error != null){
            console.log(error);
        }
        else{
            console.log(response);
        }
    });
}