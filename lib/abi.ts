export const TOKEN_VESTING_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ArrayLengthMismatch",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CliffNotReached",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientAllowance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidAmount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidCliffTime",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidSchedule",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidStepConfig",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidTimeRange",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NothingToClaim",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotStreamRecipient",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotStreamSender",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "StreamNotActive",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "StreamNotCancelable",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "StreamNotFound",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "StreamNotPaused",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "StreamNotTransferable",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "streamId", "type": "uint256" },
      { "indexed": true, "name": "oldRecipient", "type": "address" },
      { "indexed": true, "name": "newRecipient", "type": "address" }
    ],
    "name": "RecipientTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "streamId", "type": "uint256" },
      { "indexed": true, "name": "sender", "type": "address" },
      { "indexed": false, "name": "recipientAmount", "type": "uint256" },
      { "indexed": false, "name": "senderRefund", "type": "uint256" }
    ],
    "name": "StreamCancelled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "streamId", "type": "uint256" },
      { "indexed": true, "name": "sender", "type": "address" },
      { "indexed": true, "name": "recipient", "type": "address" },
      { "indexed": false, "name": "token", "type": "address" },
      { "indexed": false, "name": "totalAmount", "type": "uint256" },
      { "indexed": false, "name": "startTime", "type": "uint256" },
      { "indexed": false, "name": "endTime", "type": "uint256" },
      { "indexed": false, "name": "vestingType", "type": "uint8" }
    ],
    "name": "StreamCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "streamId", "type": "uint256" },
      { "indexed": false, "name": "pausedAt", "type": "uint256" }
    ],
    "name": "StreamPaused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "streamId", "type": "uint256" },
      { "indexed": false, "name": "resumedAt", "type": "uint256" }
    ],
    "name": "StreamResumed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "streamId", "type": "uint256" },
      { "indexed": false, "name": "addedAmount", "type": "uint256" },
      { "indexed": false, "name": "newTotalAmount", "type": "uint256" }
    ],
    "name": "StreamToppedUp",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "streamId", "type": "uint256" },
      { "indexed": true, "name": "recipient", "type": "address" },
      { "indexed": false, "name": "amount", "type": "uint256" }
    ],
    "name": "TokensClaimed",
    "type": "event"
  },
  {
    "inputs": [{ "name": "streamId", "type": "uint256" }],
    "name": "cancel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "streamId", "type": "uint256" }],
    "name": "claim",
    "outputs": [{ "name": "amount", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "streamIds", "type": "uint256[]" }],
    "name": "claimMultiple",
    "outputs": [{ "name": "totalAmount", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          { "name": "token", "type": "address" },
          { "name": "recipients", "type": "address[]" },
          { "name": "amounts", "type": "uint256[]" },
          { "name": "startTime", "type": "uint256" },
          { "name": "endTime", "type": "uint256" },
          { "name": "cliffTime", "type": "uint256" },
          { "name": "cliffAmount", "type": "uint256" },
          { "name": "vestingType", "type": "uint8" },
          { "name": "cancelable", "type": "bool" },
          { "name": "transferable", "type": "bool" }
        ],
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "createBatchStreams",
    "outputs": [{ "name": "streamIds", "type": "uint256[]" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          { "name": "token", "type": "address" },
          { "name": "recipient", "type": "address" },
          { "name": "totalAmount", "type": "uint256" },
          { "name": "startTime", "type": "uint256" },
          { "name": "endTime", "type": "uint256" },
          { "name": "cliffTime", "type": "uint256" },
          { "name": "cliffAmount", "type": "uint256" },
          { "name": "vestingType", "type": "uint8" },
          { "name": "cancelable", "type": "bool" },
          { "name": "transferable", "type": "bool" }
        ],
        "name": "params",
        "type": "tuple"
      },
      {
        "components": [
          { "name": "timestamp", "type": "uint256" },
          { "name": "amount", "type": "uint256" }
        ],
        "name": "schedule",
        "type": "tuple[]"
      }
    ],
    "name": "createCustomStream",
    "outputs": [{ "name": "streamId", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          { "name": "token", "type": "address" },
          { "name": "recipient", "type": "address" },
          { "name": "totalAmount", "type": "uint256" },
          { "name": "startTime", "type": "uint256" },
          { "name": "endTime", "type": "uint256" },
          { "name": "cliffTime", "type": "uint256" },
          { "name": "cliffAmount", "type": "uint256" },
          { "name": "vestingType", "type": "uint8" },
          { "name": "cancelable", "type": "bool" },
          { "name": "transferable", "type": "bool" }
        ],
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "createStream",
    "outputs": [{ "name": "streamId", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          { "name": "token", "type": "address" },
          { "name": "recipient", "type": "address" },
          { "name": "totalAmount", "type": "uint256" },
          { "name": "startTime", "type": "uint256" },
          { "name": "endTime", "type": "uint256" },
          { "name": "cliffTime", "type": "uint256" },
          { "name": "cliffAmount", "type": "uint256" },
          { "name": "vestingType", "type": "uint8" },
          { "name": "cancelable", "type": "bool" },
          { "name": "transferable", "type": "bool" }
        ],
        "name": "params",
        "type": "tuple"
      },
      {
        "components": [
          { "name": "stepDuration", "type": "uint256" },
          { "name": "stepAmount", "type": "uint256" },
          { "name": "numberOfSteps", "type": "uint256" }
        ],
        "name": "stepConfig",
        "type": "tuple"
      }
    ],
    "name": "createStepStream",
    "outputs": [{ "name": "streamId", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "streamId", "type": "uint256" }],
    "name": "getClaimableAmount",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "streamId", "type": "uint256" }],
    "name": "getCustomSchedule",
    "outputs": [
      {
        "components": [
          { "name": "timestamp", "type": "uint256" },
          { "name": "amount", "type": "uint256" }
        ],
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "streamId", "type": "uint256" }],
    "name": "getStepConfig",
    "outputs": [
      {
        "components": [
          { "name": "stepDuration", "type": "uint256" },
          { "name": "stepAmount", "type": "uint256" },
          { "name": "numberOfSteps", "type": "uint256" }
        ],
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "streamId", "type": "uint256" }],
    "name": "getStream",
    "outputs": [
      {
        "components": [
          { "name": "token", "type": "address" },
          { "name": "sender", "type": "address" },
          { "name": "recipient", "type": "address" },
          { "name": "totalAmount", "type": "uint256" },
          { "name": "claimedAmount", "type": "uint256" },
          { "name": "startTime", "type": "uint256" },
          { "name": "endTime", "type": "uint256" },
          { "name": "cliffTime", "type": "uint256" },
          { "name": "cliffAmount", "type": "uint256" },
          { "name": "vestingType", "type": "uint8" },
          { "name": "status", "type": "uint8" },
          { "name": "cancelable", "type": "bool" },
          { "name": "transferable", "type": "bool" },
          { "name": "pausedAt", "type": "uint256" },
          { "name": "totalPausedDuration", "type": "uint256" }
        ],
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "recipient", "type": "address" }],
    "name": "getStreamsByRecipient",
    "outputs": [{ "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "sender", "type": "address" }],
    "name": "getStreamsBySender",
    "outputs": [{ "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "streamId", "type": "uint256" }],
    "name": "getVestedAmount",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextStreamId",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "streamId", "type": "uint256" }],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "streamId", "type": "uint256" }],
    "name": "resume",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "streamId", "type": "uint256" },
      { "name": "amount", "type": "uint256" }
    ],
    "name": "topUp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "streamId", "type": "uint256" },
      { "name": "newRecipient", "type": "address" }
    ],
    "name": "transferRecipient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

export const ERC20_ABI = [
  {
    "inputs": [{ "name": "spender", "type": "address" }, { "name": "amount", "type": "uint256" }],
    "name": "approve",
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }],
    "name": "allowance",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const
