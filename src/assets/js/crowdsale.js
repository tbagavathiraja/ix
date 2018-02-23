


var crowdsale = {
    func1: function() {
      alert('function 1 called');
    },
    showAcc:function () {
      console.log('showing acc list')
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

    }
  }
