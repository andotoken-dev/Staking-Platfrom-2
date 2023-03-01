// Variables

var currentAddr;
var tlv = 0;
var networkID = 0;
var tokenPerBlock = 119;
var web3 = null;
var tokenAndo = null;
var AirNFT = null;
var masterChefMythic = null;
var masterChefLegendary = null;
var masterChefRare = null;

var tlv1 = 0;
var TotalTreasureRarePrice = 0;
var yourRare = 0;
var rewardPerBlockFarm15 = 0;
var totalRare = 0;

var tlv2 =0;
var TotalTreasureMythicPrice =0;
var yourMythic = 0;
var rewardPerBlockFarm60 = 0;
var totalMythic = 0;

var tlv3 =0;
var TotalTreasureLegendaryPrice =0;
var yourLegendary = 0;
var rewardPerBlockFarm30 = 0;
var totalLegendary = 0;


// Initialize

async function initializing() {
    tokenAndo = await new web3.eth.Contract(ABI_TOKEN, ADDRESS_Token);
    AirNFT = await new web3.eth.Contract(ABI_AirNFT, ADDRESS_AirNFT);
    masterChefRare = await new web3.eth.Contract(ABI_NFT_Rare_MASTERCHEF, ADDRESS_NFT_Rare_MASTERCHEF);
    masterChefLegendary = await new web3.eth.Contract(ABI_NFT_Legendary_MASTERCHEF, ADDRESS_NFT_Legendary_MASTERCHEF);
    masterChefMythic = await new web3.eth.Contract(ABI_NFT_Mythic_MASTERCHEF, ADDRESS_NFT_Mythic_MASTERCHEF);

    networkID = await web3.eth.net.getId()

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

   //logo out
   $("#btn-disconnect").css("display", "block");
   
    updateRare();
    updateMythic();
    updateLegendary();
    setInterval(updateRewards,1000);//testing an update of rewards data
    //getCurrentBlock();

    tlv = tlv1 + tlv2 + tlv3;
    //$("#tvl").text("$ " + tlv.toFixed(2));
}




// Wallet Connect

const chainID = "0x38"
const metamaskButton = document.querySelector('#btn-connect-metamask');
const trustWalletButton = document.querySelector('#btn-connect-trust');
const walletConnectButton = document.querySelector('#btn-connect-wlconnect');
const metamaskDisconnect = document.querySelector('#btn-disconnect');

async function getAccount() {
    web3 = new Web3(ethereum);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
 
    var connectedAddr;
    if (accounts.length > 0) {
        currentAddr = accounts[0];
        connectedAddr = currentAddr[0] + currentAddr[1] + currentAddr[2] + currentAddr[3] + currentAddr[4] + currentAddr[5] + '...' + currentAddr[currentAddr.length - 6] + currentAddr[currentAddr.length - 5] + currentAddr[currentAddr.length - 4] + currentAddr[currentAddr.length - 3] + currentAddr[currentAddr.length - 2] + currentAddr[currentAddr.length - 1];
        $("#btn-connect").text(connectedAddr);
        $("#btn-connect").prop("disabled", true);
    }
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainID }],
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                        chainId: chainID,
                        chainName: 'Binance Smart Chain',
                        nativeCurrency: {
                            name: 'BNB',
                            symbol: 'BNB',
                            decimals: 18
                        },
                        rpcUrls: ['https://bsc-dataseed.binance.org/'] /* ... */,
                        blockExplorerUrls: ['https://bscscan.com/'],
                        },
                    ],
                });
            } catch (addError) {
                alert('Your are on the wrong network!')
            }
        }
        // handle other "switch" errors
    }
    
    await ethereum.request({ method: 'eth_accounts' });
    ethereum.on('accountsChanged', (accounts) => {
        currentAddr = accounts[0];
        connectedAddr = currentAddr[0] + currentAddr[1] + currentAddr[2] + currentAddr[3] + currentAddr[4] + currentAddr[5] + '...' + currentAddr[currentAddr.length - 6] + currentAddr[currentAddr.length - 5] + currentAddr[currentAddr.length - 4] + currentAddr[currentAddr.length - 3] + currentAddr[currentAddr.length - 2] + currentAddr[currentAddr.length - 1];
        $("#btn-connect").text(connectedAddr);
        $("#btn-connect").prop("disabled", true);
    });

    await ethereum.on('chainChanged', async (chainId) => {
        if (chainId !== chainID) {
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: chainID }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    try {
                        await ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                chainId: chainID,
                                chainName: 'Binance Smart Chain',
                                nativeCurrency: {
                                    name: 'BNB',
                                    symbol: 'BNB',
                                    decimals: 18
                                },
                                rpcUrls: ['https://bsc-dataseed.binance.org/'] /* ... */,
                                blockExplorerUrls: ['https://bscscan.com/'],
                                },
                            ],
                        });
                    } catch (addError) {
                        alert('Your are on the wrong network!')
                    }
                }
                // handle other "switch" errors
            }

        }
    });
}
async function walletDisconnect(){

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
    
        //rare
        $("#rare-connect").css("display", "block");
        $("#rare-enable").css("display", "none");
        $("#rare-staking").css("display", "none");
    
        //mythic
        $("#mythic-connect").css("display", "block");
        $("#mythic-enable").css("display", "none");
        $("#mythic-staking").css("display", "none");
    
    
    
}

async function walletConnect() {
    var provider = new WalletConnectProvider.default(
        { 
            rpc: {
                56: "https://bsc-dataseed.binance.org/"
            }
        }
    );
    web3 = new Web3(provider);
    provider.chainId = 56;
    provider.network = 'Binance Smart Chain';    
    provider.enable().then(
        async function(res) {
            let web = new Web3(provider);
            var accounts = await web.eth.getAccounts();
            currentAddr = accounts[0];
            var connectedAddr = currentAddr[0] + currentAddr[1] + currentAddr[2] + currentAddr[3] + currentAddr[4] + currentAddr[5] + '...' + currentAddr[currentAddr.length - 6] + currentAddr[currentAddr.length - 5] + currentAddr[currentAddr.length - 4] + currentAddr[currentAddr.length - 3] + currentAddr[currentAddr.length - 2] + currentAddr[currentAddr.length - 1];
            $("#btn-connect").text(connectedAddr);
            $("#btn-connect").prop("disabled", true);

            provider.on('accountsChanged', (accounts) => {
                currentAddr = accounts[0];
                connectedAddr = currentAddr[0] + currentAddr[1] + currentAddr[2] + currentAddr[3] + currentAddr[4] + currentAddr[5] + '...' + currentAddr[currentAddr.length - 6] + currentAddr[currentAddr.length - 5] + currentAddr[currentAddr.length - 4] + currentAddr[currentAddr.length - 3] + currentAddr[currentAddr.length - 2] + currentAddr[currentAddr.length - 1];
                $("#btn-connect").text(connectedAddr);
                $("#btn-connect").prop("disabled", true);
            });

            provider.on('chainChanged', async (chainId) => {
                if (chainId !== chainID) {
                    try {
                        await provider.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: chainID }],
                        });
                    } catch (switchError) {
                        // This error code indicates that the chain has not been added to MetaMask.
                        if (switchError.code === 4902) {
                            try {
                                await provider.request({
                                    method: 'wallet_addEthereumChain',
                                    params: [
                                        {
                                        chainId: chainID,
                                        chainName: 'Binance Smart Chain',
                                        nativeCurrency: {
                                            name: 'BNB',
                                            symbol: 'BNB',
                                            decimals: 18
                                        },
                                        rpcUrls: ['https://bsc-dataseed.binance.org/'] /* ... */,
                                        blockExplorerUrls: ['https://bscscan.com/'],
                                        },
                                    ],
                                });
                            } catch (addError) {
                                // handle "add"" errors        
                            }
                        }
                        // handle other "switch" errors
                    }
        
                }
            });
            
        }
    );

}

metamaskButton.addEventListener('click', async () => {
    await getAccount();
    await initializing();
});

trustWalletButton.addEventListener('click', () => {
    getAccount();
    initializing();
});

walletConnectButton.addEventListener('click', () => {
    walletConnect();
    initializing();
});
//Update Price

metamaskDisconnect.addEventListener('click',() => {
    walletDisconnect();
    initializing();

})
//Rewards function
function getReward(lastTimeUpdated,amountStaked,rewardAmountPerHour){
    var currentTime = new Date();
    
    return parseFloat((Math.floor((currentTime - lastTimeUpdated) / 3600) * rewardAmountPerHour) + amountStaked); 
   }
//update rewards only if staker data is available
function updateRewards(){
    //Check Rare First
    try {
        masterChefRare.methods.stakers(currentAddr).call().then(
            res => {
                isStaker = res.amountStaked;
                var lasttimeupate = res.timeOfLastUpdate;
                var validStaker;
                if (isStaker === 0 || isStaker === "0"){
                    validStaker = 0;
                } else {
                    validStaker = 1;
                }
            
                console.log("isStaker Rare: " + res.amountStaked);
                console.log("Valid Staker Rare Data = " + validStaker);
                
                if (validStaker === 0) {
                    console.log ("It does not have valid rare data.")

                } else {
                    console.log ("It has valid Rare data lets update")

                    //stakers[_staker].timeOfLastUpdate) *
                //stakers[msg.sender].amountStaked)
                //) * rewardsPerHour) / 3600);
                    masterChefRare.methods.rewardsPerHour().call().then(
                        response => {
                            
                           const rewardsXhour = response;

                            console.log ("Total Estimated Rare Rewards" + rewardsXhour)
                        }
                    
                    
                    )
                    masterChefRare.methods.stakers(currentAddr).call().then(
                            res => {
                                var lastUp = res.timeOfLastUpdate; 
                                var amountStaked = res.amountStaked;
                                var currentTime = new Date();
                                var totalRW = (currentTime - lastUp * amountStaked * rewardsPerHour / 3600);
                                console.lo ("Total" + togalRW)

                            }
                        )
                }
            }
        
        )
    } catch (error) {
        console.log ("there was an error during rare data update" + error);
                        // Break the function if user has no token staked.
                       // if (error.data.code === 3) {
                        //    alert(error.data.message);
                         //   return;
                        //}
    }
    //end of rare check
    //Check Legendary
        try {
            masterChefLegendary.methods.stakers(currentAddr).call().then(
                res => {
                    isStaker = res.amountStaked;
                    var validStaker;
                    if (isStaker === 0 || isStaker === "0"){
                        validStaker = 1;
                    } else {
                        validStaker = 0;
                    }
                
                    console.log("isStaker Legendary: " + res.amountStaked);
                    console.log("Valid Staker Legendary Data = " + validStaker);
                    
                    if (validStaker === 0) {
                        console.log ("It does not have valid data for Legendary Collection.")
    
                    } else {
                        console.log ("It has valid Legendary data lets update")
                        masterChefLegendary.methods.getAllRewards(currentAddr).call().then(
                            response => {
                                $("#legendary-earn").text((response / 1e18).toFixed(2));
                            }
                        )
                    }
                }
            
            )
        } catch (error) {
            console.log ("there was an error during legendary data update" + error);
                            // Break the function if user has no token staked.
                           // if (error.data.code === 3) {
                            //    alert(error.data.message);
                             //   return;
                            //}
        }
        //end of legendary check
            //Check Mythic
            try {
                masterChefMythic.methods.stakers(currentAddr).call().then(
                    res => {
                        isStaker = res.amountStaked;
                        var validStaker;
                        if (isStaker === 0 || isStaker === "0"){
                            validStaker = 1;
                        } else {
                            validStaker = 0;
                        }
                    
                        console.log("isStaker Mythic: " + res.amountStaked);
                        console.log("Valid Staker Mythic Data = " + validStaker);
                        
                        if (validStaker === 0) {
                            console.log ("It does not have valid data for Mythic Collection.")
        
                        } else {
                            console.log ("It has valid Mythic data lets update")
                            masterChefMythic.methods.getAllRewards(currentAddr).call().then(
                                response => {
                                    $("#mythic-earn").text((response / 1e18).toFixed(2));
                                }
                            )
                        }
                    }
                
                )
            } catch (error) {
                console.log ("there was an error during Mythic data update" + error);
                                // Break the function if user has no token staked.
                               // if (error.data.code === 3) {
                                //    alert(error.data.message);
                                 //   return;
                                //}
            }
            //end of Mythic check

}
//end of updateRewards Function
// Rare

const rareButtonEnable = document.querySelector('#rare-btn-enable');
const rareCollect = document.querySelector('#rare-collect');
const rareStakingConfirm = document.querySelector('#rare-staking-confirm');
const rareUnstakingConfirm = document.querySelector('#rare-unstaking-confirm');
const rewardsCheckRare = document.querySelector('#rewards-rare-staking-check')

function clearRareInput() {
    $('#rare-input-stake').val(0);
    $('#rare-input-unstake').val(0);
    $('#rewards-rare-input-nftid').val(0);
}

async function updateRare() {
    if (AirNFT && currentAddr !== null && currentAddr !== undefined && currentAddr !== "") {
        try {
            AirNFT.methods.balanceOf(currentAddr).call().then(
                res => {
                    var your_balance = (res);
                    $("#rare-balance").text("Balance: " + your_balance + " $AndoNFT");
                }
            )
        } catch (error) {
            console.log (error)
        }

        try {
            AirNFT.methods.isApprovedForAll(currentAddr, ADDRESS_NFT_Rare_MASTERCHEF).call().then(
                res => {
                    isApproved = res;
                    var ApproveThis;
                    if (isApproved === true || isApproved === "true"){
                        ApproveThis = 1;
                    } else {
                        ApproveThis = 0;
                    }
                
                    console.log("isApprovedForAll NFT Rare: " + res);
                    console.log("ApproveThis NFT Rare = " + ApproveThis);
                    
                    if (ApproveThis === 0) {
                        $("#rare-connect").css("display", "none");
                        $("#rare-enable").css("display", "block");
                        $("#rare-staking").css("display", "none");
                    } else {
                        $("#rare-connect").css("display", "none");
                        $("#rare-enable").css("display", "none");
                        $("#rare-staking").css("display", "block");
                    }
                }
            )
        } catch (error) {
            console.log (error);
        }    

        masterChefRare.methods.rewardsPerHour().call().then(
            res => {
                $("#rare-api").text((res / 1e18));
            }
        )

        masterChefRare.methods.treasure().call().then(
            response => {
                var TotalTreasureRare = response;
                var TotalTreasureRarePrice = TotalTreasureRare / 1e18 * priceAndoToken;
                tlv1 = TotalTreasureRarePrice;
                console.log ("Total Rare Treasure Value = " + TotalTreasureRarePrice)
            }
        )

        if (masterChefRare  && currentAddr !== null && currentAddr !== undefined && currentAddr !== "") {
            try{
                masterChefRare.methods.userStakeInfo(currentAddr).call().then(
                    res => {
                    // Calculate total in USD in this pool
                    totalRare = 2 * (res._availableRewards / 1e18)  * priceAndoToken;  //* amount$AndoPerLP
                    $("#rare-total").text(totalRare.toFixed(0) + " USD");
                    //$("#rare-api").text(res.apy);
                    //$("rare-staked").text(res.tokensStaked);
                    $("#rare-earn").text((res._availableRewards / 1e18).toFixed(2));
                    if ((res._availableRewards / 1e18).toFixed(0) > 0) {
                        $("#rare-collect").addClass("enable");
                    }
                    }
                );
    
                masterChefRare.methods.balanceOf(currentAddr).call().then(
                    res=>{
                        rarestaked = res
                        $("#rare-staked").text(res);
                    }
                )
                //$Ando-BNB, id = 1 - 30 days ----------------------------------/
                masterChefRare.methods.stakers(currentAddr).call().then(
                    res => {
                        $("#rare-unclaim").text((res.unclaimedRewards / 1e18).toFixed(2));
                    }
                    
                );
            } catch (error) {
                // Break the function if user has no token staked.
                if (error.data.code === 3) {
                    alert(error.data.message);
                    return;
                }
            }
        }
    }
}

rareButtonEnable.addEventListener('click', () => {
    if (AirNFT && currentAddr !== null && currentAddr !== undefined && currentAddr !== "") {
        try {
            AirNFT.methods.setApprovalForAll(ADDRESS_NFT_Rare_MASTERCHEF, true).send({
                value: 0,
                from: currentAddr,
            }).once("error", (err) => {
                console.log(err)
                updateRare();
            }).then((Response)=>{
                console.log(Response);
                updateRare();
            })
        } catch (error) {
            console.log ("Rare Enable Error" + error)
        }
    }
    updateRare();
});

rareCollect.addEventListener('click', () => {
    try {
        if (masterChefRare && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            masterChefRare.methods.claimRewards().send({
                value: 0,
                from: currentAddr,
            }).once("error", (err) => {
                console.log(err);
                updateRare();
            }).then((Response)=>{
                console.log(Response);
                updateRare();
            })
        }
    } catch (error) {

    }
})

rewardsCheckRare.addEventListener('click', () => {
    try {
        if (masterChefRare && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            var tokenid = $("#rewards-rare-input-nftid").val();
            var NFTID = tokenid;
                masterChefRare.methods.getRewardsByTokenId(NFTID).call().then(
                    res=>{
                        rewardsTotal = res / 1e18 / 86400;
                        $("#rare-rewards-balance").text(rewardsTotal);
                        $("#rare-earn").text((rewardsTotal).toFixed(2));
                        console.log ("Total Rewards" + rewardsTotal);
                    }
                )
        }
    } catch (error) {

    }
    clearRareInput();
    updateRare();
})

rareUnstakingConfirm.addEventListener('click', () => {
    try {
        if (masterChefRare && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            var tokenid = $("#rare-input-unstake").val();
            var NFTID = [tokenid]
            masterChefRare.methods.withdraw(NFTID).send({
                value: 0,
                from: currentAddr,
            }).once("error", (err) => {
                console.log(err);
                updateRare();
                
            }).then((Response)=>{
                console.log(Response);
                updateRare();        
            })
        }
    } catch (error) {

    };
    clearRareInput();
    updateRare();
})

//rewards check
rareStakingConfirm.addEventListener('click', () => {
    try {
        if (masterChefRare && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            var tokenid = $("#rare-input-stake").val();
            var NFTID = [tokenid]
            masterChefRare.methods.stake(NFTID).send({
                value: 0,
                from: currentAddr,
            }).once("error", (err) => {
                console.log(err);
                updateRare();
                
            }).then((Response)=>{
                console.log(Response);
                updateRare();
                
            })
        }
    } catch (error) {

    }
    clearRareInput();
    updateRare();
})
// Mythic

const mythicButtonEnable = document.querySelector('#mythic-btn-enable');
const mythicCollect = document.querySelector('#mythic-collect');
const mythicStakingConfirm = document.querySelector('#mythic-staking-confirm');
const mythicUnstakingConfirm = document.querySelector('#mythic-unstaking-confirm');
const rewardsCheckmythic = document.querySelector('#rewards-mythic-staking-check')

function clearMythicInput() {
    $('#mythic-input-stake').val(0);
    $('#mythic-input-unstake').val(0);
    $('#rewards-mythic-input-nftid').val(0);
}

async function updateMythic() {
    if (AirNFT && currentAddr !== null && currentAddr !== undefined && currentAddr !== "") {
        try {
            AirNFT.methods.balanceOf(currentAddr).call().then(
                res => {
                    var your_balance = (res);
                    $("#mythic-balance").text("Balance: " + your_balance + " $AndoNFT");
                }
            )
        } catch (error) {
            console.log (error)
        }

        try {
            AirNFT.methods.isApprovedForAll(currentAddr, ADDRESS_NFT_Mythic_MASTERCHEF).call().then(
                res => {
                    isApproved = res;
                    var ApproveThis;
                    if (isApproved === true || isApproved === "true"){
                        ApproveThis = 1;
                    } else {
                        ApproveThis = 0;
                    }
                
                    console.log("isApprovedForAll NFT Mythic: " + res);
                    console.log("ApproveThis NFT Mythic = " + ApproveThis);
                    
                    if (ApproveThis === 0) {
                        $("#mythic-connect").css("display", "none");
                        $("#mythic-enable").css("display", "block");
                        $("#mythic-staking").css("display", "none");
                    } else {
                        $("#mythic-connect").css("display", "none");
                        $("#mythic-enable").css("display", "none");
                        $("#mythic-staking").css("display", "block");
                    }
                }
            )
        } catch (error) {
            console.log (error);
        }    

        masterChefMythic.methods.rewardsPerHour().call().then(
            res => {
                $("#mythic-api").text((res / 1e18));
            }
        )

        masterChefMythic.methods.treasure().call().then(
            response => {
                var TotalTreasureMythic = response;
                var TotalTreasureMythicPrice = TotalTreasureMythic / 1e18 * priceAndoToken;
                tlv1 = TotalTreasureMythicPrice;
                console.log ("Total Mythic Treasure Value = " + TotalTreasureMythicPrice)
            }
        )

        if (masterChefMythic  && currentAddr !== null && currentAddr !== undefined && currentAddr !== "") {
            try{
                masterChefMythic.methods.userStakeInfo(currentAddr).call().then(
                    res => {
                    // Calculate total in USD in this pool
                    totalMythic = 2 * (res._availableRewards / 1e18)  * priceAndoToken;  //* amount$AndoPerLP
                    $("#mythic-total").text(totalMythic.toFixed(0) + " USD");
                    //$("#mythic-api").text(res.apy);
                    //$("#mythic-staked").text(res.tokensStaked);
                    $("#mythic-earn").text((res._availableRewards / 1e18).toFixed(2));
                    if ((res._availableRewards / 1e18).toFixed(0) > 0) {
                        $("#mythic-collect").addClass("enable");
                    }
                    }
                );
    
                masterChefMythic.methods.balanceOf(currentAddr).call().then(
                    res=>{
                        mythicstaked = res
                        $("#mythic-staked").text(res);
                    }
                )
                //$Ando-BNB, id = 1 - 30 days ----------------------------------/
                masterChefMythic.methods.stakers(currentAddr).call().then(
                    res => {
                        $("#mythic-unclaim").text((res.unclaimedRewards / 1e18).toFixed(2));
                    }
                    
                );
            } catch (error) {
                // Break the function if user has no token staked.
                if (error.data.code === 3) {
                    alert(error.data.message);
                    return;
                }
            }
        }
    }
}

mythicButtonEnable.addEventListener('click', () => {
    if (AirNFT && currentAddr !== null && currentAddr !== undefined && currentAddr !== "") {
        try {
            AirNFT.methods.setApprovalForAll(ADDRESS_NFT_Mythic_MASTERCHEF, true).send({
                value: 0,
                from: currentAddr,
            }).once("error", (err) => {
                console.log(err)
                updateMythic();
            }).then((Response)=>{
                console.log(Response);
                updateMythic();
            })
        } catch (error) {
            console.log ("Mythic Enable Error" + error)
        }
    }
    updateMythic();
});

mythicCollect.addEventListener('click', () => {
    try {
        if (masterChefMythic && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            masterChefMythic.methods.claimRewards().send({
                value: 0,
                from: currentAddr,
            }).once("error", (err) => {
                console.log(err);
                updateMythic();
            }).then((Response)=>{
                console.log(Response);
                updateMythic();
            })
        }
    } catch (error) {

    }
})
rewardsCheckmythic.addEventListener('click', () => {
    try {
        if (masterChefMythic && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            var tokenid = $("#rewards-mythic-input-nftid").val();
            var NFTID = tokenid
                masterChefMythic.methods.getRewardsByTokenId(NFTID).call().then(
                    res=>{
                        rewardsTotal = res / 1e18;
                        $("#mythic-rewards-balance").text(rewardsTotal);
                    }
                )
        }
    } catch (error) {

    }
    clearMythicInput();
    updateMythic();
})
mythicStakingConfirm.addEventListener('click', () => {
    try {
        if (masterChefMythic && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            var tokenid = $("#mythic-input-stake").val();
            var NFTID = [tokenid]
            masterChefMythic.methods.stake(NFTID).send({
                value: 0,
                from: currentAddr,
            }).once("error", (err) => {
                console.log(err);
                updateMythic();
                
            }).then((Response)=>{
                console.log(Response);
                updateMythic();
                
            })
        }
    } catch (error) {

    }
    clearMythicInput();
    updateMythic();
})

mythicUnstakingConfirm.addEventListener('click', () => {
    try {
        if (masterChefMythic && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            var tokenid = $("#mythic-input-unstake").val();
            var NFTID = [tokenid]
            masterChefMythic.methods.withdraw(NFTID).send({
                value: 0,
                from: currentAddr,
            }).once("error", (err) => {
                console.log(err);
                updateMythic();
                
            }).then((Response)=>{
                console.log(Response);
                updateMythic();        
            })
        }
    } catch (error) {

    };
    clearMythicInput();
    updateMythic();
})


// Legendary

const legendaryButtonEnable = document.querySelector('#legendary-btn-enable');
const legendaryCollect = document.querySelector('#legendary-collect');
const legendaryStakingConfirm = document.querySelector('#legendary-staking-confirm');
const legendaryUnstakingConfirm = document.querySelector('#legendary-unstaking-confirm');
const rewardsChecklegendary = document.querySelector('#rewards-legendary-staking-check')

function clearLegendaryInput() {
    $('#legendary-input-stake').val(0);
    $('#legendary-input-unstake').val(0);
    $('#rewards-legendary-input-nftid').val(0);
}

async function updateLegendary() {
    if (AirNFT && currentAddr !== null && currentAddr !== undefined && currentAddr !== "") {
        try {
            AirNFT.methods.balanceOf(currentAddr).call().then(
                res => {
                    var your_balance = (res);
                    $("#legendary-balance").text("Balance: " + your_balance + " $AndoNFT");
                }
            )
        } catch (error) {
            console.log (error)
        }

        try {
            AirNFT.methods.isApprovedForAll(currentAddr, ADDRESS_NFT_Legendary_MASTERCHEF).call().then(
                res => {
                    isApproved = res;
                    var ApproveThis;
                    if (isApproved === true || isApproved === "true"){
                        ApproveThis = 1;
                    } else {
                        ApproveThis = 0;
                    }
                
                    console.log("isApprovedForAll NFT Legendary: " + res);
                    console.log("ApproveThis NFT Legendary = " + ApproveThis);
                    
                    if (ApproveThis === 0) {
                        $("#legendary-connect").css("display", "none");
                        $("#legendary-enable").css("display", "block");
                        $("#legendary-staking").css("display", "none");
                    } else {
                        $("#legendary-connect").css("display", "none");
                        $("#legendary-enable").css("display", "none");
                        $("#legendary-staking").css("display", "block");
                    }
                }
            )
        } catch (error) {
            console.log (error);
        }    

        masterChefLegendary.methods.rewardsPerHour().call().then(
            res => {
                $("#legendary-api").text((res / 1e18));
            }
        )

        masterChefLegendary.methods.treasure().call().then(
            response => {
                var TotalTreasureLegendary = response;
                var TotalTreasureLegendaryPrice = TotalTreasureLegendary / 1e18 * priceAndoToken;
                tlv1 = TotalTreasureLegendaryPrice;
                console.log ("Total Legendary Treasure Value = " + TotalTreasureLegendaryPrice)
            }
        )

        if (masterChefLegendary  && currentAddr !== null && currentAddr !== undefined && currentAddr !== "") {
            try{
                masterChefLegendary.methods.userStakeInfo(currentAddr).call().then(
                    res => {
                    // Calculate total in USD in this pool
                    totalLegendary = 2 * (res._availableRewards / 1e18)  * priceAndoToken;  //* amount$AndoPerLP
                    $("#legendary-total").text(totalLegendary.toFixed(0) + " USD");
                    //$("#legendary-api").text(res.apy);
                    $("#legendary-earn").text((res._availableRewards / 1e18).toFixed(2));
                    if ((res._availableRewards / 1e18).toFixed(0) > 0) {
                        $("#legendary-collect").addClass("enable");
                    }
                    }
                );
    
                masterChefLegendary.methods.balanceOf(currentAddr).call().then(
                    res=>{
                        legendarystaked = res
                        $("#legendary-staked").text(res);
                    }
                )

                //$Ando-BNB, id = 1 - 30 days ----------------------------------/
                masterChefLegendary.methods.stakers(currentAddr).call().then(
                    res => {
                        $("#legendary-unclaim").text((res.unclaimedRewards / 1e18).toFixed(2));
                    }
                    
                );
            } catch (error) {
                // Break the function if user has no token staked.
                if (error.data.code === 3) {
                    alert(error.data.message);
                    return;
                }
            }
        }
    }
}

legendaryButtonEnable.addEventListener('click', () => {
    if (AirNFT && currentAddr !== null && currentAddr !== undefined && currentAddr !== "") {
        try {
            AirNFT.methods.setApprovalForAll(ADDRESS_NFT_Legendary_MASTERCHEF, true).send({
                value: 0,
                from: currentAddr,
            }).once("error", (err) => {
                console.log(err)
                updateLegendary();
            }).then((Response)=>{
                console.log(Response);
                updateLegendary();
            })
        } catch (error) {
            console.log ("Legendary Enable Error" + error)
        }
    }
    updateLegendary();
});

legendaryCollect.addEventListener('click', () => {
    try {
        if (masterChefLegendary && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            masterChefLegendary.methods.claimRewards().send({
                value: 0,
                from: currentAddr,
            }).once("error", (err) => {
                console.log(err);
                updateLegendary();
            }).then((Response)=>{
                console.log(Response);
                updateLegendary();
            })
        }
    } catch (error) {

    }
})
rewardsChecklegendary.addEventListener('click', () => {
    try {
        if (masterChefLegendary && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            var tokenid = $("#rewards-legendary-input-nftid").val();
            var NFTID = tokenid
                masterChefLegendary.methods.getRewardsByTokenId(NFTID).call().then(
                    res=>{
                        rewardsTotal = res / 1e18;
                        $("#legendary-rewards-balance").text(rewardsTotal);
                    }
                )
        }
    } catch (error) {

    }
    clearLegendaryInput();
    updateRare();
})
legendaryStakingConfirm.addEventListener('click', () => {
    try {
        if (masterChefLegendary && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            var tokenid = $("#legendary-input-stake").val();
            var NFTID = [tokenid]
            masterChefLegendary.methods.stake(NFTID).send({
                value: 0,
                from: currentAddr,
            }).once("error", (err) => {
                console.log(err);
                updateLegendary();
                
            }).then((Response)=>{
                console.log(Response);
                updateLegendary();
                
            })
        }
    } catch (error) {

    }
    clearLegendaryInput();
    updateLegendary();
})

legendaryUnstakingConfirm.addEventListener('click', () => {
    try {
        if (masterChefLegendary && currentAddr != null && currentAddr != undefined && currentAddr != "") {
            var tokenid = $("#legendary-input-unstake").val();
            var NFTID = [tokenid]
            masterChefLegendary.methods.withdraw(NFTID).send({
                value: 0,
                from: currentAddr,
            }).once("error", (err) => {
                console.log(err);
                updateLegendary();
                
            }).then((Response)=>{
                console.log(Response);
                updateLegendary();        
            })
        }
    } catch (error) {

    };
    clearLegendaryInput();
    updateLegendary();
})


