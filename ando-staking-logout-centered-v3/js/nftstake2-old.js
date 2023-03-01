var currentAddr;
var networkID = 0;
var masterChefMythic = null;
var masterChefLegendary = null;
var masterChefRare = null;
var AirNFT = null;
var web3 = null;
var tempWeb3 = null;


var tokenAndo = null;


var tokenPerBlock = 119;

window.addEventListener('load', () => {

    //Reset
    currentAddr = null;
    AirNFT = null;
    tokenAndo = null;
    masterChefMythic = null;
    masterChefLegendary = null;
    masterChefRare = null;
    web3 = null;
    tempWeb3 = null;

    mainContractInfo();
    Connect();
})



function update() {
    console.log("Update");
    updateParameters();
    setInterval(update,150000);
}

function updatePools() {
    console.log("Pool Data Updated");
    setInterval(updatePools,5000);
}

async function mainContractInfo() {
    if (NETID == 56) {
        web3 = new Web3('https://bsc-dataseed1.binance.org:443');
    } else {
        web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    }
    tokenAndo = await new web3.eth.Contract(ABI_TOKEN, ADDRESS_Token);
    AirNFT = await new web3.eth.Contract(ABI_AirNFT, ADDRESS_AirNFT);
    masterChefRare = await new web3.eth.Contract(ABI_NFT_Rare_MASTERCHEF, ADDRESS_NFT_Rare_MASTERCHEF);
    masterChefLegendary = await new web3.eth.Contract(ABI_NFT_Legendary_MASTERCHEF, ADDRESS_NFT_Legendary_MASTERCHEF);
    masterChefMythic = await new web3.eth.Contract(ABI_NFT_Mythic_MASTERCHEF, ADDRESS_NFT_Mythic_MASTERCHEF);

    
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
    tokenAndo = await new web3.eth.Contract(ABI_TOKEN, ADDRESS_Token);
    AirNFT = await new web3.eth.Contract(ABI_AirNFT, ADDRESS_AirNFT);
    masterChefRare = await new web3.eth.Contract(ABI_NFT_Rare_MASTERCHEF, ADDRESS_NFT_Rare_MASTERCHEF);
    masterChefLegendary = await new web3.eth.Contract(ABI_NFT_Legendary_MASTERCHEF, ADDRESS_NFT_Legendary_MASTERCHEF);
    masterChefMythic = await new web3.eth.Contract(ABI_NFT_Mythic_MASTERCHEF, ADDRESS_NFT_Mythic_MASTERCHEF);

        getCurrentWallet();
        update();

        //rare
        $("#rare-connect").css("display", "none");
        $("#rare-enable").css("display", "block");
        $("#rare-staking").css("display", "none");

        //legendary
        $("#legendary-connect").css("display", "none");
        $("#legendary-enable").css("display", "block");
        $("#legendary-staking").css("display", "none");

        //mythic
        $("#mythic-connect").css("display", "none");
        $("#mythic-enable").css("display", "block");
        $("#mythic-staking").css("display", "none");

        
        
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
                rpcUrls: ['https://bsc-dataseed.binance.org/'], //https://data-seed-prebsc-1-s1.binance.org:8545 testnet //https://bsc-dataseed.binance.org/
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
            56: 'https://bsc-dataseed.binance.org/' //https://data-seed-prebsc-1-s1.binance.org:8545 97 for testnet //mainnet https://bsc-dataseed.binance.org/ 56
        },
        chainId: 56,
        network: 'binance smart chain',
    });
    await walletConnectProvider.enable();

    tempWeb3 = new Web3(walletConnectProvider);
    var accounts = await tempWeb3.eth.getAccounts();
    currentAddr = accounts[0];
    var connectedAddr = currentAddr[0] + currentAddr[1] + currentAddr[2] + currentAddr[3] + currentAddr[4] + currentAddr[5] + '...' + currentAddr[currentAddr.length - 6] + currentAddr[currentAddr.length - 5] + currentAddr[currentAddr.length - 4] + currentAddr[currentAddr.length - 3] + currentAddr[currentAddr.length - 2] + currentAddr[currentAddr.length - 1]
    $("#btn-connect").text(connectedAddr)
    $("#btn-connect").prop("disabled", true);

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
        }
    }
}




var TotalTreasureRarePrice = 0;
var TotalTreasureMythicPrice =0;
var TotalTreasureLegendaryPrice =0;
var tlv1 = 0;
var tlv2 =0;
var tlv3 =0;

var yourRare = 0;
var rewardPerBlockFarm15 = 0;
var totalRare = 0;

var yourLegendary = 0;
var rewardPerBlockFarm30 = 0;
var totalLegendary = 0;

var yourMythic = 0;
var rewardPerBlockFarm60 = 0;
var totalMythic = 0;

//var amount$AndoPerLP = 0;

async function updatePools(){
        updateLegendary();
        updateRare();
        updateMythic();
        
    }

async function updateParameters() {
    if (AirNFT) {
        if (currentAddr != null && currentAddr != undefined && currentAddr != "") {
            try {
            AirNFT.methods.balanceOf(currentAddr).call().then(res => {
                var your_balance = (res);
                $("#legendary-balance").text("Balance: " + your_balance);
                $("#rare-balance").text("Balance: " + your_balance);
                $("#mythic-balance").text("Balance: " + your_balance);
            })
            //rare
        } catch (error){
            console.log (error)
        }
        
                    //rare
                    try {
                        AirNFT.methods.isApprovedForAll(currentAddr, ADDRESS_NFT_Rare_MASTERCHEF).call().then(res => {
                            
                            isApproved = res;
                            var ApproveThis;
                            if (isApproved == true || isApproved =="true"){
                                ApproveThis = 1;
                            }
                        
                            else {
                                ApproveThis = 0;ssssssssssssss
                            }
                        
                      
                            console.log("isApprovedForAll NFT Rare: " + res);
                            console.log("ApproveThis NFT Rare = " + ApproveThis);
                            if (ApproveThis == 0) {
                                $("#rare-connect").css("display", "none");
                                $("#rare-enable").css("display", "block");
                                $("#rare-staking").css("display", "none");
            
            
                            } else {
                                $("#rare-connect").css("display", "none");
                                $("#rare-enable").css("display", "none");
                                $("#rare-staking").css("display", "block");
            
            
                            }
                        })}
                        catch (error){
                            console.log (error);
                            
                        }    
        //legendary
            try {
            AirNFT.methods.isApprovedForAll(currentAddr, ADDRESS_NFT_Legendary_MASTERCHEF).call().then(res => {
                
                isApproved = res;
                var ApproveThis;
                if (isApproved == true || isApproved =="true"){
                    ApproveThis = 1;
                }
            
                else {
                    ApproveThis = 0;
                }
            

          
                console.log("isApprovedForAll NFT Legendary: " + res);
                console.log("ApproveThis NFT Legendary = " + ApproveThis);
                if (ApproveThis == 0) {
                    $("#legendary-connect").css("display", "none");
                    $("#legendary-enable").css("display", "block");
                    $("#legendary-staking").css("display", "none");


                } else {
                    $("#legendary-connect").css("display", "none");
                    $("#legendary-enable").css("display", "none");
                    $("#legendary-staking").css("display", "block");


                }
            })}
            catch (error){
                console.log (error);
                
            }
            
            //mythic
            try {
            AirNFT.methods.isApprovedForAll(currentAddr, ADDRESS_NFT_Mythic_MASTERCHEF).call().then(res => {
                
                isApproved = res;
                var ApproveThis;
                if (isApproved == true || isApproved =="true"){
                    ApproveThis = 1;
                }
            
                else {
                    ApproveThis = 0;
                }
            
          
                console.log("isApprovedForAll NFT Mythic: " + res);
                console.log("ApproveThis NFT Mythic = " + ApproveThis);
                if (ApproveThis == 0) {
                    $("#mythic-connect").css("display", "none");
                    $("#mythic-enable").css("display", "block");
                    $("#mythic-staking").css("display", "none");


                } else {
                    $("#mythic-connect").css("display", "none");
                    $("#mythic-enable").css("display", "none");
                    $("#mythic-staking").css("display", "block");


                }
            })
        } catch (error) {
            console.log (error);
            
        }}
//Change for Total Supply from NFT Contract Instead
        //tokenLP.methods.totalSupply().call().then(res => {
          //  var totalLP = res / 1e18;
           // tokenAndo.methods.balanceOf(ADDRESS_Token).call().then(res => {
            //    if(totalLP == 0){
              //      amount$AndoPerLP = 0;
               // }else
                 //   amount$AndoPerLP = (res / 1e18 / totalLP);
            //})
        //})
    
//User Stake Updates
masterChefLegendary.methods.rewardsPerHour().call().then(res => {
    //tokenPerBlock = res / 1e18;
    //console.log("tokenPerBlock: " + tokenPerBlock);
    $("#legendary-api").text((res / 1e18));
})
masterChefRare.methods.rewardsPerHour().call().then(res => {
    //tokenPerBlock = res / 1e18;
    //console.log("tokenPerBlock: " + tokenPerBlock);
    $("#rare-api").text((res / 1e18));
})
masterChefMythic.methods.rewardsPerHour().call().then(res => {
    //tokenPerBlock = res / 1e18;
    //console.log("tokenPerBlock: " + tokenPerBlock);
    $("#mythic-api").text((res / 1e18));
})
//End of Rewards x Hour
               

        }
    masterChefRare.methods.treasure().call().then(response =>{
        var TotalTreasureRare = response;
        var TotalTreasureRarePrice = TotalTreasureRare / 1e18 * priceAndoToken;
     var tlv1 = TotalTreasureRarePrice;
     console.log ("Total Rare Treasure Value =" + TotalTreasureRarePrice)
     // $("#tvl").text("$ " + tlv.toFixed(9));
      })
      masterChefMythic.methods.treasure().call().then(response =>{
        var TotalTreasureMythic= response;
        var TotalTreasureMythicPrice = TotalTreasureMythic / 1e18 * priceAndoToken;
     var tlv2 = TotalTreasureMythicPrice;
     console.log ("Total Mythic Treasure Value =" + TotalTreasureMythicPrice)
     // $("#tvl").text("$ " + tlv.toFixed(9));
      })
      masterChefLegendary.methods.treasure().call().then(response =>{
        var TotalTreasureLegendary= response;
        var TotalTreasureLegendaryPrice = TotalTreasureLegendary / 1e18 * priceAndoToken;
     var tlv3 = TotalTreasureLegendaryPrice;
     console.log ("Total Legendary Treasure Value =" + TotalTreasureLegendaryPrice)
     // $("#tvl").text("$ " + tlv.toFixed(9));
      })
    var tlv = tlv1 + tlv2 +tlv3;
    $("#tvl").text("$ " + tlv.toFixed(2));

    

/********* Legendary NFT Actions ACTION *******/
$("#legendary-btn-enable").click(() => {
    
        if (AirNFT && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            try {AirNFT.methods.setApprovalForAll(ADDRESS_NFT_Legendary_MASTERCHEF, true).send({
                value: 0,
                from: currentAddr,

            })
            
        } catch (error) {
            console.log ("Enable Error" + error)
        }
        }
        update();

})

$("#legendary-collect").click(() => {
    try {
        if (masterChefLegendary && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            masterChefLegendary.methods.claimRewards().send({
                value: 0,
                from: currentAddr,
            })
        }
    } catch (error) {}
})

$("#legendary-staking-confirm").click(() => {
    try {
        if (masterChefLegendary && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            //var amount = $("#legendary-input-stake").val();
            var tokenid = $("#legendary-input-stake").val();
            //var tokens = amount * 10**9;
            var NFTID = [tokenid]
            //var tokens = web3.utils.toWei(amount, 'ether');
            masterChefLegendary.methods.stake(NFTID).send({
                value: 0,
                from: currentAddr,
            })
        }
    } catch (error) {}
    clearlegendaryInput();

})

$("#legendary-unstaking-confirm").click(() => {
    try {
        if (masterChefLegendary && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            //var amount = $("#legendary-input-unstake").val();
            //var tokens = web3.utils.toWei(amount, 'ether');
            var tokenid = $("#legendary-input-unstake").val();
            var NFTID = [tokenid]
            masterChefLegendary.methods.withdraw(NFTID).send({
                value: 0,
                from: currentAddr,
            })
            //update legendary
            updateLegendary();
            //end of update
            
        }
    } catch (error) {};
    clearlegendaryInput();
})

//$("#legendary-unstake-max").click(() => {
//    $('#legendary-input-unstake').val(yourRare);
//});

function clearlegendaryInput() {
    $('#legendary-input-stake').val(0);
    $('#legendary-input-unstake').val(0);
    update();
}

//$("#legendary-stake-max").click(() => {
//    $('#legendary-input-stake').val(yourLpBalance.toFixed(9) - 0.000000001);
//});
//Update Values for Legendary
function updateLegendary(){
    if (masterChefLegendary  && currentAddr != null && currentAddr != undefined && currentAddr != "") {
                
        try{
        //$Ando-BNB
        masterChefLegendary.methods.userStakeInfo(currentAddr).call().then(res => {
            // Calculate total in USD in this pool
            totalLegendary = 2 * (res._availableRewards)  * priceAndoToken;   //* amount$AndoPerLP
            $("#legendary-total").text(totalLegendary + " USD");
            //$("#legendary-api").text(res.apy + "%");
        })

                    //$Ando-BNB, id = 0 - 15 days ----------------------------------/
            masterChefLegendary.methods.getAllRewards(currentAddr).call().then(res => {
                $("#legendary-earn").text((res / 1e18).toFixed(2));
                if ((res / 1e18).toFixed(0) > 0) {
                    $("#legendary-collect").addClass("enable");
                }
            });

//            masterChefLegendary.methods.userStakeInfo(currentAddr).call().then(res => {
//               yourLegendary = res._tokensStaked;
//                $("#legendary-staked").text((res._tokensStaked));
//                $("#legendary-staked1").text((res._tokensStaked));
//            })

}
          catch(error){
            console.log ("Legendary Stake Errors" + error);
            
        }}

}

//End of Values for Legendary

/********* Rare NFT Stake *******/
$("#rare-btn-enable").click(() => {
   
        if (AirNFT && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            try {AirNFT.methods.setApprovalForAll(ADDRESS_NFT_Rare_MASTERCHEF, true).send({
                value: 0,
                from: currentAddr,
    

            })
        } catch (error) {
            console.log ("Rare Enable Error" + error)
        }
        }

})

$("#rare-collect").click(() => {
    try {
        if (masterChefRare && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            masterChefRare.methods.claimRewards().send({
                value: 0,
                from: currentAddr,
            })
        }
    } catch (error) {}
})

$("#rare-staking-confirm").click(() => {
    try {
        if (masterChefRare && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            //var amount = $("#rare-input-stake").val() * 1e18;
            //var amount = $("#rare-input-stake").val();
            var tokenid = $("#rare-input-stake").val();
            //var tokens = amount * 10**9;
            var NFTID = [tokenid]
            //var tokens = web3.utils.toWei(amount, 'ether');
            masterChefRare.methods.stake(NFTID).send({
                value: 0,
                from: currentAddr,
            })
            //update rare data
            //updateRare();
            //end of update
        }
    } catch (error) {}
    clearrareInput();
})

$("#rare-unstaking-confirm").click(() => {
    try {
        if (masterChefRare && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            //var amount = $("#rare-input-unstake").val();
            //var tokens = web3.utils.toWei(amount, 'ether');
            var tokenid = $("#rare-input-unstake").val();
            var NFTID = [tokenid]
            masterChefRare.methods.withdraw(NFTID).send({
                value: 0,
                from: currentAddr,
            })
            //Update rare
            updateRare();
            //end of update
        }
    } catch (error) {};
    clearrareInput();
})

//$("#rare-unstake-max").click(() => {
//    $('#rare-input-unstake').val(yourRare);
//});

function clearrareInput() {
    $('#rare-input-stake').val(0);
    $('#rare-input-unstake').val(0);
}

//$("#rare-stake-max").click(() => {
//    $('#rare-input-stake').val(yourLpBalance.toFixed(9) - 0.0000000001);
//});
//Update Rare Data
async function updateRare(){
    if (masterChefRare  && currentAddr != null && currentAddr != undefined && currentAddr != "") {
        try{
        masterChefRare.methods.userStakeInfo(currentAddr).call().then(res => {
            // Calculate total in USD in this pool
            totalRare = 2 * (res._availableRewards / 1e18)  * priceAndoToken;  //* amount$AndoPerLP
            $("#rare-total").text(totalRare.toFixed(0) + " USD");
            $("#rare-api").text(res.apy);
        });

//$Ando-BNB, id = 1 - 30 days ----------------------------------/
masterChefRare.methods.getAllRewards(currentAddr).call().then(res => {
$("#rare-earn").text((res / 1e18).toFixed(2));
if ((res / 1e18).toFixed(0) > 0) {
$("#rare-collect").addClass("enable");
            }
});

//masterChefRare.methods.userStakeInfo(currentAddr).call().then(res => {
//yourRare = res._tokensStaked;
//$("#rare-staked").text((res._tokensStaked).toFixed(0));
//$("#rare-staked1").text((res._tokensStaked).toFixed(0));
//})

}catch (error){
console.log ("Stake Rare Error:"+error);

}
    }
}

//End of Update Rare Data

/********* Mythic Actions *******/
$("#mythic-btn-enable").click(() => {
 
        if (AirNFT && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            try {AirNFT.methods.setApprovalForAll(ADDRESS_NFT_Mythic_MASTERCHEF, true).send({
                value: 0,
                from: currentAddr,
    

            })
        } catch (error) {
            console.log ("Enable Mythic Error" + error)
        }
        }

})

$("#mythic-collect").click(() => {
    try {
        if (masterChefMythic && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            masterChefMythic.methods.claimRewards().send({
                value: 0,
                from: currentAddr,
            })
        }
    } catch (error) {}
})

$("#mythic-staking-confirm").click(() => {
    try {
        if (masterChefMythic && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            //var amount = $("#mythic-input-stake").val();
            var tokenid = $("#mythic-input-stake").val();
            //var tokens = amount * 10**9;
            var NFTID = [tokenid]
            //var tokens = web3.utils.toWei(amount, 'ether');
            masterChefMythic.methods.stake(NFTID).send({
                value: 0,
                from: currentAddr,
            })
        }
    } catch (error) {}
    
})

$("#mythic-unstaking-confirm").click(() => {
    try {
        if (masterChefMythic && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            //var amount = $("#mythic-input-unstake").val();
            var tokenid = $("#mythic-input-unstake").val();
            var NFTID = [tokenid]
            masterChefMythic.methods.withdraw(NFTID).send({
                value: 0,
                from: currentAddr,
            })
            //Update Mythic
            updateMythic();
            //end of update Mythic
        }
    } catch (error) {};
    
    update();
})

//$("#mythic-unstake-max").click(() => {
//    $('#mythic-input-unstake').val(yourMythic);
//});


//Update Mythic Data
function updateMythic(){
    if (masterChefMythic  && currentAddr != null && currentAddr != undefined && currentAddr != "") {
        //$Ando-BNB
        try{
        masterChefMythic.methods.userStakeInfo(currentAddr).call().then(res => {
            // Calculate total in USD in this pool
            totalMythic = 2 * (res._availableRewards / 1e18) * priceAndoToken; //* amount$AndoPerLP
            $("#mythic-total").text(totalMythic.toFixed(0) + " USD");
            $("#mythic-api").text(res.apy);
            yourMythic = res._tokensStaked;
            $("#mythic-staked").text((res._tokensStaked));
            
        });
        

        
                    //$Ando-BNB, id = 2 - 60 days ----------------------------------/
                    masterChefMythic.methods.getAllRewards(currentAddr).call().then(res => {
                        $("#mythic-earn").text((res / 1e18).toFixed(0));
                        if ((res / 1e18).toFixed(0) > 0) {
                            $("#mythic-collect").addClass("enable");
                        }
                       
                    });

//                    masterChefMythic.methods.userStakeInfo(currentAddr).call().then(res => {
//                        yourMythic = res._tokensStaked;
//                        $("#mythic-staked").text((res._tokensStaked));
//                        $("#mythic-staked1").text((res._tokensStaked));
//            });

  
}

         catch (error){
        console.log ("Stake Mythic Error:"+ error)
        //updateParamenters();
       }}
}

//end of update Mythic Data
//$("#mythic-stake-max").click(() => {
//    $('#mythic-input-stake').val(yourLpBalance.toFixed(9) - 0.0000000001);
//});
}