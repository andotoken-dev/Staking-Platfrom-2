var currentAddr;
var networkID = 0;
var masterChef = null;
var masterChefNFTL = null;
var web3 = null;
var tempWeb3 = null;

var tokenAndo = null;

var tokenNFT = null;
var tokenNFTL = null;

var tokenPerBlock = 119;

window.addEventListener('load', () => {

    //Reset
    currentAddr = null;
    tokenAndo = null;
    tokenNFT = null;
    tokenNFTL = null;
    masterChef = null;
    masterChefNFTL = null;
    web3 = null;
    tempWeb3 = null;

    mainContractInfo();
    if(localStorage.getItem("logout") != "true"){
        Connect();
    }
})



async function mainContractInfo() {
    if (NETID == 56) {
        web3 = new Web3('https://bsc-dataseed1.binance.org:443');
    } else {
        web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    }
    tokenAndo = await new web3.eth.Contract(ABI_TOKEN, ADDRESS_Token); //Tres Leches Cake
    tokenNFT = await new web3.eth.Contract(ABI_AirNFT, ADDRESS_AirNFT); //NFT Owners
    masterChef = await new web3.eth.Contract(ABI_NFT_Legendary_MASTERCHEF, ADDRESS_NFT_Legendary_MASTERCHEF); //NFT Staking platform
    tokenNFTL = await new web3.eth.Contract(ABI_AirNFT, ADDRESS_AirNFT); //NFT Limited
    masterChefNFTL = await new web3.eth.Contract(ABI_NFT_Legendary_MASTERCHEF, ADDRESS_NFT_Legendary_MASTERCHEF); //NFT Limited Staking platform


    masterChef.methods.rewardsPerHour().call().then(res => {
        tokenPerBlock = res / 1e18;
        console.log("tokenPerBlock: " + tokenPerBlock);
    })

    update();
}

async function Connect() {
    if (window.ethereum) {
        tempWeb3 = new Web3(window.ethereum)
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" })
            let accounts = await window.ethereum.request({ method: 'eth_accounts' })
            currentAddr = accounts[0]
            window.ethereum.on('chainChanged', (chainId) => {
                window.location.reload();
            });
            window.ethereum.on('accountsChanged', function(accounts) {
                window.location.reload();
            })
            runAPP()
            return
        } catch (error) {
            console.error(error)
        }
    }
}


async function runAPP() {
    networkID = await tempWeb3.eth.net.getId()
    if (networkID == NETID) {

        web3 = tempWeb3;
        tokenAndo = await new web3.eth.Contract(ABI_TOKEN, ADDRESS_Token); //Tres Leches Cake
        tokenNFT = await new web3.eth.Contract(ABI_AirNFT, ADDRESS_AirNFT); //NFT Owners
        masterChef = await new web3.eth.Contract(ABI_NFT_Legendary_MASTERCHEF, ADDRESS_NFT_Legendary_MASTERCHEF); //NFT Staking platform
        tokenNFTL = await new web3.eth.Contract(ABI_AirNFT, ADDRESS_AirNFT); //NFT Limited
        masterChefNFTL = await new web3.eth.Contract(ABI_NFT_Legendary_MASTERCHEF, ADDRESS_NFT_Legendary_MASTERCHEF); //NFT Limited Staking platform

        getCurrentWallet();
        localStorage.setItem("logout", "false");

        masterChef.methods.rewardsPerHour().call().then(res => {
            tokenPerBlock = res / 1e18;
            console.log("tokenPerBlock: " + tokenPerBlock);
        })

        //legendary
        $("#legendary-connect").css("display", "none");
        $("#legendary-enable").css("display", "block");
        $("#legendary-staking").css("display", "none");

        //legendary
        $("#legendary-connect").css("display", "none");
        $("#legendary-enable").css("display", "block");
        $("#legendary-staking").css("display", "none");

        //legendary
        $("#legendary-connect").css("display", "none");
        $("#legendary-enable").css("display", "block");
        $("#legendary-staking").css("display", "none");


        update();
    } else {
        $("#btn-connect-txt").text("Wrong network!");

        if (window.ethereum) {
            const data = [{
                chainId: '0x38', //Mainnet
                //chainId: '0x61', //Testnet
                chainName: 'Binance Smart Chain',
                nativeCurrency: {
                    name: 'BNB',
                    symbol: 'BNB',
                    decimals: 18
                },
                rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'], //https://data-seed-prebsc-1-s1.binance.org:8545 testnet //https://bsc-dataseed.binance.org/
                blockExplorerUrls: ['https://bscscan.com/'],
            }]
            /* eslint-disable */
            const tx = await window.ethereum.request({ method: 'wallet_addEthereumChain', params: data }).catch()
            if (tx) {
                console.log(tx)
            }
        }
    }
}

$("#btn-disconnect").click(() => {
    localStorage.setItem("logout", "true");
    //Reset
    currentAddr = null;
    tokenAndo = null;
    tokenNFT = null;
    tokenNFTL = null;
    masterChef = null;
    masterChefNFTL = null;
    web3 = null;
    tempWeb3 = null;

    $("#btn-connect").text("Connect Wallet");
    $("#btn-connect").prop("disabled", false);
    $("#btn-disconnect").css("display", "none");

    //legendary
    $("#legendary-connect").css("display", "block");
    $("#legendary-enable").css("display", "none");
    $("#legendary-staking").css("display", "none");

    //legendary
    $("#legendary-connect").css("display", "block");
    $("#legendary-enable").css("display", "none");
    $("#legendary-staking").css("display", "none");


    $("#legendary-earn").text("0.0");
})

$("#btn-connect-metamask").click(() => {
    if (window.ethereum) {
        Connect();
    } else {
        alert("Please install Metamask first");
    }
})

$("#btn-connect-trust").click(() => {
    if (window.ethereum) {
        Connect();
    } else {
        alert("Please install Trust wallet and open the website on Trust/DApps");
    }
})


$("#btn-connect-wlconnect").click(async() => {
    var WalletConnectProvider = window.WalletConnectProvider.default;
    var walletConnectProvider = new WalletConnectProvider({
        rpc: {
            56: 'https://bsc-dataseed.binance.org/'
        },
        chainId: 56,
        network: 'binance',
    });
    await walletConnectProvider.enable();

    tempWeb3 = new Web3(walletConnectProvider);
    var accounts = await tempWeb3.eth.getAccounts();
    currentAddr = accounts[0];
    var connectedAddr = currentAddr[0] + currentAddr[1] + currentAddr[2] + currentAddr[3] + currentAddr[4] + currentAddr[5] + '...' + currentAddr[currentAddr.length - 6] + currentAddr[currentAddr.length - 5] + currentAddr[currentAddr.length - 4] + currentAddr[currentAddr.length - 3] + currentAddr[currentAddr.length - 2] + currentAddr[currentAddr.length - 1]
    $("#btn-connect").text(connectedAddr)
    $("#btn-connect").prop("disabled", true);
    $("#btn-disconnect").css("display", "flex");

    walletConnectProvider.on("chainChanged", (chainId) => {
        window.location.reload();
    });
    walletConnectProvider.on("disconnect", (code, reason) => {
        console.log(code, reason);
        window.location.reload();
    });

    runAPP()
})

async function getCurrentWallet() {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
            currentAddr = accounts[0]
            var connectedAddr = currentAddr[0] + currentAddr[1] + currentAddr[2] + currentAddr[3] + currentAddr[4] + currentAddr[5] + '...' + currentAddr[currentAddr.length - 6] + currentAddr[currentAddr.length - 5] + currentAddr[currentAddr.length - 4] + currentAddr[currentAddr.length - 3] + currentAddr[currentAddr.length - 2] + currentAddr[currentAddr.length - 1]
            $("#btn-connect").text(connectedAddr);
            $("#btn-connect").prop("disabled", true);
            $("#btn-disconnect").css("display", "flex");

        }
    }
}


function update() {
    console.log("Update");
    updateParameters();
}
setInterval(update, 5000);


var yourLpBalance = 0;

var yourTokenInFarm15 = 0;
var rewardPerBlockFarm15 = 0;
var totalTokenInFarm15 = 0;

var amount3LechesCakePerLP = 0;
var tvl1 = 0;

async function updateParameters() {
    
    if (tokenNFT) {
        //
        if (currentAddr != null && currentAddr != undefined && currentAddr != "") {
            try {
            tokenNFT.methods.balanceOf(currentAddr).call().then(res => {
                yourLpBalance = (res);
                var your_balance = (res);
                $("#legendary-balance").text("Balance: " + your_balance + " AndoNFT");
            })
        } catch (error) {
            console.log (error)
        } 
        try {
            tokenNFT.methods.isApprovedForAll(currentAddr, ADDRESS_NFT_Legendary_MASTERCHEF).call().then(res => {
                
                isApproved = res;
                var ApproveThis;
                if (isApproved == true || isApproved =="true"){
                    ApproveThis = 1;
                }
            
                else {
                    ApproveThis = 0;
                }
            
          
                console.log("isApprovedForAll NFT Owners: " + res);
                console.log("ApproveThis NFT Owners = " + ApproveThis);
                if (ApproveThis == 0) {
                    $("#legendary-connect").css("display", "none");
                    $("#legendary-enable").css("display", "block");
                    $("#legendary-staking").css("display", "none");


                } else {
                    $("#legendary-connect").css("display", "none");
                    $("#legendary-enable").css("display", "none");
                    $("#legendary-staking").css("display", "block");


                }
            })
        } catch (error) {
            console.log (error)
            //updateParameters();
        } 
        }
    }
        
    if (tokenNFTL) {
        //
        if (currentAddr != null && currentAddr != undefined && currentAddr != "") {

        }
        
    }

    if (masterChef) {
        try {
        masterChef.methods.rewardsPerHour().call().then(res => {
            tokenPerBlock = res / 1e18;
            console.log("tokenPerBlock: " + tokenPerBlock);
        })
    }catch (error){
        console.log (error)
       
    }
    
        masterChef.methods.totalAllocPoint().call().then(res => {
            var totalAlloc = res;
    if (currentAddr != null && currentAddr != undefined && currentAddr != "") {
            try {

            masterChef.methods.userStakeInfo(currentAddr).call().then(res => {
                // Calculate total in USD in this pool
                totalTokenInFarm15 = (res._availableRewards / 1e18) * priceAndoToken;
                $("#legendary-total").text(totalTokenInFarm15 + " USD");
                $("#legendary-api").text(tokenPerBlock + "");
            })
        }catch (error) {
            console.log (error)          
}
masterChef.methods.getAllRewards(currentAddr).call().then(res => {                  
    var your_balance = (res);
      if (balance >= 0){
     var balance = your_balance / 1e18;
     console.log ("Available Rewards" + balance)
     $("#legendary-earn").text((balance));
      if ((balance) > 0) {
        $("#legendary-collect").addClass("enable");
     }
  }
  });
    
  }
  
      })
  

       if (currentAddr != null && currentAddr != undefined && currentAddr != "") {
           try {

              // id = 0 - 15 days ----------------------------------/
              
                masterChef.methods.getAllRewards(currentAddr).call().then(response => {                  
                var your_balance = (response);
                if (your_balance >= 0){
                 var balance = your_balance / 1e18;
                 console.log ("Available Rewards==" + balance)
                 $("#legendary-earn").text((balance));
                  if ((balance) > 0) {
                    $("#legendary-collect").addClass("enable");
                 }
              }
              });
         }catch (error) {
         console.log (error)
         } 
          try {
          masterChef.methods.balanceOf(currentAddr).call().then(res => {
              yourTokenInFarm15 = res / 10 ** 0;
              $("#legendary-staked").text((res));
              $("#legendary-staked1").text((res));

              var lastDeposit = res.timeOfLastUpdate;
              masterChef.methods.stakers(currentAddr).call().then(r => {
                 $("#legendary-locking-time").text((r.timeOfLastUpdate  / 60 / 60 / 24).toFixed(0) + " days");
                  if(lastDeposit == 0){
                      $("#legendary-unstake-warning").css("display", "none");
                  }else{
                      var unlockTimeStamp = parseFloat(lastDeposit) //+ parseFloat(r.withdrawLockPeriod);
                      if(Date.now()/1000 >= unlockTimeStamp){
                          $("#legendary-unstake-warning").css("display", "none");
                      }else {
                          var unlockDate = new Date(unlockTimeStamp * 1000);
                          var hour = unlockDate.getHours();
                          var min = unlockDate.getMinutes();
                          var date = unlockDate.getDate();
                          var month = unlockDate.getMonth() + 1;
                          var year = unlockDate.getFullYear();
                          $("#legendary-unstake-date").text(date + "/" + month + "/" + year + " - " + hour + ":" + min);
                          $("#legendary-unstake-warning").css("display", "block");
                      }
                  }
              })

          })
      }catch (error) {
          console.log (error)
      } 
      

      }else{


          masterChef.methods.stakers(currentAddr).call().then(r => {
              $("#legendary-locking-time").text((r.timeOfLastUpdate  / 60 / 60 / 24).toFixed(0) + " days");
          });
      }
  }
  masterChef.methods.treasure().call().then(response =>{
    var TotalTreasure = response;
    var TotalTreasurePrice = TotalTreasure / 1e18 * priceAndoToken;
 var tlv = TotalTreasurePrice;
 console.log ("Total Treasure Value =" + TotalTreasurePrice)
  $("#tvl").text("$ " + tlv.toFixed(9));
  })

}



/********* 15days ACTION *******/
$("#legendary-btn-enable").click(() => {
    try {
        if (tokenNFT && currentAddr != null && currentAddr != undefined && currentAddr != "") {
           // tokenNFT.methods.setApprovalForAll(currentAddr, true).send({
            //    value: 0,
            //    from: currentAddr,
    

            //})
            tokenNFT.methods.setApprovalForAll(ADDRESS_NFT_Legendary_MASTERCHEF, true).send({
                value: 0,
                from: currentAddr,
    

            })

        }
        
    } catch (error) {}
})

$("#legendary-collect").click(() => {
    try {
        if (masterChef && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            masterChef.methods.claimRewards().send({
                value: 0,
                from: currentAddr,
            })
        }
    } catch (error) {}
})

$("#legendary-staking-confirm").click(() => {
    try {
        if (masterChef && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            var amount = $("#legendary-input-stake").val();
            var tokenid = $("#legendary-input-stake").val();
            var tokens = amount * 10**9;
            var NFTID = [tokenid]
            //var tokens = web3.utils.toWei(amount, 'ether');
            masterChef.methods.stake(NFTID).send({
                value: 0,
                from: currentAddr,
            })
        }
    } catch (error) {}
    clearlegendaryInput();
})

$("#legendary-unstaking-confirm").click(() => {
    try {
        if (masterChef && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            var tokenid = $("#legendary-input-unstake").val();
            var NFTID = [tokenid]
            masterChef.methods.withdraw(NFTID).send({
                value: 0,
                from: currentAddr,
            })
        }
    } catch (error) {};
    clearlegendaryInput();
})

$("#legendary-unstake-max").click(() => {
    $('#legendary-input-unstake').val(yourTokenInFarm15);
});

function clearlegendaryInput() {
    $('#legendary-input-stake').val(0);
    $('#legendary-input-unstake').val(0);
}

$("#legendary-stake-max").click(() => {
    $('#legendary-input-stake').val(yourLpBalance.toFixed(0));
});
