'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { TOKEN_VESTING_ABI, ERC20_ABI } from '@/lib/abi'
import { VESTING_CONTRACT_ADDRESS } from '@/lib/wagmi'

const VESTING_TYPES = ['Instant', 'Linear', 'Cliff + Linear', 'Step', 'Custom']
const STATUS_LABELS = ['Active', 'Paused', 'Cancelled', 'Completed']

type Stream = {
  token: `0x${string}`
  sender: `0x${string}`
  recipient: `0x${string}`
  totalAmount: bigint
  claimedAmount: bigint
  startTime: bigint
  endTime: bigint
  cliffTime: bigint
  cliffAmount: bigint
  vestingType: number
  status: number
  cancelable: boolean
  transferable: boolean
  pausedAt: bigint
  totalPausedDuration: bigint
}

export function VestingDashboard() {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<'received' | 'sent' | 'create'>('received')

  if (!isConnected) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Welcome to MegaETH Vesting</h2>
        <p className="text-gray-400">Connect your wallet to get started</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('received')}
          className={`pb-4 px-2 font-medium transition ${
            activeTab === 'received'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Received Streams
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`pb-4 px-2 font-medium transition ${
            activeTab === 'sent'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Sent Streams
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`pb-4 px-2 font-medium transition ${
            activeTab === 'create'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Create Stream
        </button>
      </div>

      {/* Content */}
      {activeTab === 'received' && <ReceivedStreams address={address!} />}
      {activeTab === 'sent' && <SentStreams address={address!} />}
      {activeTab === 'create' && <CreateStream />}
    </div>
  )
}

function ReceivedStreams({ address }: { address: `0x${string}` }) {
  const { data: streamIds } = useReadContract({
    address: VESTING_CONTRACT_ADDRESS,
    abi: TOKEN_VESTING_ABI,
    functionName: 'getStreamsByRecipient',
    args: [address],
  })

  if (!streamIds || streamIds.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No streams received yet
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {streamIds.map((id) => (
        <StreamCard key={id.toString()} streamId={id} isRecipient={true} />
      ))}
    </div>
  )
}

function SentStreams({ address }: { address: `0x${string}` }) {
  const { data: streamIds } = useReadContract({
    address: VESTING_CONTRACT_ADDRESS,
    abi: TOKEN_VESTING_ABI,
    functionName: 'getStreamsBySender',
    args: [address],
  })

  if (!streamIds || streamIds.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No streams sent yet
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {streamIds.map((id) => (
        <StreamCard key={id.toString()} streamId={id} isRecipient={false} />
      ))}
    </div>
  )
}

function StreamCard({ streamId, isRecipient }: { streamId: bigint; isRecipient: boolean }) {
  const { data: stream } = useReadContract({
    address: VESTING_CONTRACT_ADDRESS,
    abi: TOKEN_VESTING_ABI,
    functionName: 'getStream',
    args: [streamId],
  }) as { data: Stream | undefined }

  const { data: claimable } = useReadContract({
    address: VESTING_CONTRACT_ADDRESS,
    abi: TOKEN_VESTING_ABI,
    functionName: 'getClaimableAmount',
    args: [streamId],
  })

  const { writeContract, data: hash } = useWriteContract()
  const { isLoading } = useWaitForTransactionReceipt({ hash })

  if (!stream) return null

  const progress = Number(stream.claimedAmount * 100n / stream.totalAmount)
  const now = BigInt(Math.floor(Date.now() / 1000))
  const timeProgress = stream.endTime > stream.startTime
    ? Number((now - stream.startTime) * 100n / (stream.endTime - stream.startTime))
    : 0

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-sm text-gray-400">Stream #{streamId.toString()}</span>
          <div className="flex items-center gap-2 mt-1">
            <span className={`px-2 py-1 rounded text-xs ${
              stream.status === 0 ? 'bg-green-900 text-green-300' :
              stream.status === 1 ? 'bg-yellow-900 text-yellow-300' :
              stream.status === 2 ? 'bg-red-900 text-red-300' :
              'bg-blue-900 text-blue-300'
            }`}>
              {STATUS_LABELS[stream.status]}
            </span>
            <span className="text-xs text-gray-500">
              {VESTING_TYPES[stream.vestingType]}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">
            {formatEther(stream.totalAmount)} tokens
          </div>
          <div className="text-sm text-gray-400">
            Claimed: {formatEther(stream.claimedAmount)}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Progress</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* Time info */}
      <div className="flex justify-between text-sm text-gray-400 mb-4">
        <span>Start: {new Date(Number(stream.startTime) * 1000).toLocaleDateString()}</span>
        <span>End: {new Date(Number(stream.endTime) * 1000).toLocaleDateString()}</span>
      </div>

      {/* Claimable */}
      {isRecipient && claimable && claimable > 0n && (
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-400">Available to claim</div>
              <div className="text-xl font-bold text-green-400">
                {formatEther(claimable)} tokens
              </div>
            </div>
            <button
              onClick={() => writeContract({
                address: VESTING_CONTRACT_ADDRESS,
                abi: TOKEN_VESTING_ABI,
                functionName: 'claim',
                args: [streamId],
              })}
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-medium transition"
            >
              {isLoading ? 'Claiming...' : 'Claim'}
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {!isRecipient && stream.status === 0 && stream.cancelable && (
          <button
            onClick={() => writeContract({
              address: VESTING_CONTRACT_ADDRESS,
              abi: TOKEN_VESTING_ABI,
              functionName: 'cancel',
              args: [streamId],
            })}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-lg text-sm transition"
          >
            Cancel
          </button>
        )}
        {!isRecipient && stream.status === 0 && (
          <button
            onClick={() => writeContract({
              address: VESTING_CONTRACT_ADDRESS,
              abi: TOKEN_VESTING_ABI,
              functionName: 'pause',
              args: [streamId],
            })}
            disabled={isLoading}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 rounded-lg text-sm transition"
          >
            Pause
          </button>
        )}
        {!isRecipient && stream.status === 1 && (
          <button
            onClick={() => writeContract({
              address: VESTING_CONTRACT_ADDRESS,
              abi: TOKEN_VESTING_ABI,
              functionName: 'resume',
              args: [streamId],
            })}
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg text-sm transition"
          >
            Resume
          </button>
        )}
      </div>
    </div>
  )
}

function CreateStream() {
  const [token, setToken] = useState('')
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [vestingType, setVestingType] = useState(1) // Linear by default
  const [duration, setDuration] = useState('30') // days
  const [cancelable, setCancelable] = useState(true)
  const [transferable, setTransferable] = useState(true)

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleApprove = () => {
    if (!token || !amount) return
    writeContract({
      address: token as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [VESTING_CONTRACT_ADDRESS, parseEther(amount)],
    })
  }

  const handleCreate = () => {
    if (!token || !recipient || !amount || !duration) return
    
    const startTime = BigInt(Math.floor(Date.now() / 1000) + 60) // Start in 1 minute
    const endTime = startTime + BigInt(parseInt(duration) * 24 * 60 * 60)

    writeContract({
      address: VESTING_CONTRACT_ADDRESS,
      abi: TOKEN_VESTING_ABI,
      functionName: 'createStream',
      args: [{
        token: token as `0x${string}`,
        recipient: recipient as `0x${string}`,
        totalAmount: parseEther(amount),
        startTime,
        endTime,
        cliffTime: 0n,
        cliffAmount: 0n,
        vestingType,
        cancelable,
        transferable,
      }],
    })
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold mb-6">Create New Stream</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Token Address</label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Recipient Address</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1000"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Vesting Type</label>
            <select
              value={vestingType}
              onChange={(e) => setVestingType(parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
            >
              {VESTING_TYPES.map((type, i) => (
                <option key={i} value={i}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Duration (days)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="30"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={cancelable}
                onChange={(e) => setCancelable(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Cancelable</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={transferable}
                onChange={(e) => setTransferable(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Transferable</span>
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleApprove}
              disabled={isPending || isConfirming || !token || !amount}
              className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 rounded-lg font-medium transition"
            >
              1. Approve Token
            </button>
            <button
              onClick={handleCreate}
              disabled={isPending || isConfirming || !token || !recipient || !amount}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 rounded-lg font-medium transition"
            >
              2. Create Stream
            </button>
          </div>

          {isSuccess && (
            <div className="mt-4 p-4 bg-green-900/50 border border-green-700 rounded-lg text-green-300 text-center">
              Transaction successful!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
