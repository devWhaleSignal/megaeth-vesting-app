import { ConnectButton } from '@/components/connect-button'
import { VestingDashboard } from '@/components/vesting-dashboard'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold">
              M
            </div>
            <span className="text-xl font-bold">MegaETH Vesting</span>
          </div>
          <ConnectButton />
        </div>
      </header>

      {/* Main content */}
      <div className="px-4 py-8">
        <VestingDashboard />
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>MegaETH Token Vesting • Built with ❤️</p>
          <p className="mt-1">
            <a 
              href="https://github.com/devWhaleSignal/megaeth-vesting" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
