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

// Get Current Block Data

const getCurrentBlock = async () => {
    const currentBlock = await web3.eth.getBlock("latest");
    let result = null;
    if (currentBlock.number !== null) { //only when block is mined not pending
      const previousBlock = await web3.eth.getBlock(currentBlock.parentHash);
      if(previousBlock.number !== null)
      {
        const currentBlockTime = currentBlock.timestamp;
        result = {currentBlockTime}
      }
    }
    return result;
  }

var currentBlockTime = getCurrentBlock;
// Rare

const rareButtonEnable = document.querySelector('#rare-btn-enable');
const rareCollect = document.querySelector('#rare-collect');
const rareStakingConfirm = document.querySelector('#rare-staking-confirm');
const rareUnstakingConfirm = document.querySelector('#rare-unstaking-confirm');

function clearRareInput() {
    $('#rare-input-stake').val(0);
    $('#rare-input-unstake').val(0);
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
                    $("#rare-api").text(res.apy);
                    $("rare-staked").text(res.tokensStaked);
                    }
                );
    
                masterChefRare.methods.balanceOf(currentAddr).call().then(
                    res=>{
                        rarestaked = res
                        $("#rare-staked").text(res);
                    }
                )
                //$Ando-BNB, id = 1 - 30 days ----------------------------------/
                masterChefRare.methods.getAllRewards(currentAddr).call().then(
                    res => {
                        $("#rare-earn").text((res / 1e18).toFixed(2));
                        if ((res / 1e18).toFixed(0) > 0) {
                            $("#rare-collect").addClass("enable");
                        }
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


// Mythic

const mythicButtonEnable = document.querySelector('#mythic-btn-enable');
const mythicCollect = document.querySelector('#mythic-collect');
const mythicStakingConfirm = document.querySelector('#mythic-staking-confirm');
const mythicUnstakingConfirm = document.querySelector('#mythic-unstaking-confirm');

function clearMythicInput() {
    $('#mythic-input-stake').val(0);
    $('#mythic-input-unstake').val(0);
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
                    $("#mythic-api").text(res.apy);
                    }
                );
    
                masterChefMythic.methods.balanceOf(currentAddr).call().then(
                    res=>{
                        mythicstaked = res
                        $("#mythic-staked").text(res);
                    }
                )
                




                
                //$Ando-BNB, id = 1 - 30 days ----------------------------------/
                masterChefMythic.methods.getAllRewards(currentAddr).call().then(
                    res => {
                        $("#mythic-earn").text((res / 1e18 + (currentBlockTime - timeOfLastUpdate) * ($("#mythic-staked") * 100) / 3600));
                        if ((res / 1e18).toFixed(0) > 0) {
                            $("#mythic-collect").addClass("enable");
                        }
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

function clearLegendaryInput() {
    $('#legendary-input-stake').val(0);
    $('#legendary-input-unstake').val(0);
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
                    $("#legendary-api").text(res.apy);
                    }
                );
    
                masterChefLegendary.methods.balanceOf(currentAddr).call().then(
                    res=>{
                        legendarystaked = res
                        $("#legendary-staked").text(res);
                    }
                )

                //$Ando-BNB, id = 1 - 30 days ----------------------------------/
                masterChefLegendary.methods.getAllRewards(currentAddr).call().then(
                    res => {
                        $("#legendary-earn").text((res / 1e18).toFixed(2));
                        if ((res / 1e18).toFixed(0) > 0) {
                            $("#legendary-collect").addClass("enable");
                        }
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


