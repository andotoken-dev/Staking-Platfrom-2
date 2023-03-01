

1. Set up the contract
    + Go to token, "approve" the StakingContract address
		- go to https://bscscan.com/address/0xc091377110acfb780dfb9f6c200b2ef81d8ce4ab#writeContract
		- Connect Web3 wallet ( address that you going to use to add reward to staking)
    	- function 1 "approve": spender- address of Staking 0x63698A31d846C1473F107180e0d30247Ed1f6C31
    							amount: 1500000000000000000000000000 

    + Go to writeContract of StakigContract
    	- "addRewardTreasure" transfer reward to contract
    		amount: amount of reward, (include decimal), for example 1 token: 1000000000000000000 ( 18 decimals included)

