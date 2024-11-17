'use client'

import { useState } from 'react'
import { Button } from "@nextui-org/react"
import { useEthersSigner } from "@/app/features/web3/wagmi/hooks/useEthersSigner"
import { withdrawPrize } from '@/app/lib/chainlink/contracts/hackathon-crowd-funding'

interface WithdrawPrizeButtonProps {
  disabled?: boolean
  totalPrize: number
  onWithdrawSuccess?: () => void
}

export default function WithdrawPrizeButton({ disabled, totalPrize, onWithdrawSuccess }: WithdrawPrizeButtonProps) {
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const signer = useEthersSigner()

  const handleWithdraw = async () => {
    if (!signer) {
      console.error("No signer available")
      return
    }

    setIsWithdrawing(true)
    try {
      const success = await withdrawPrize(signer)
      if (success && onWithdrawSuccess) {
        onWithdrawSuccess()
      }
    } finally {
      setIsWithdrawing(false)
    }
  }

  return (
    <Button
      size="sm"
      className={`shadow-md bg-white ${
        disabled ? "table-button-text-disabled" : "table-button-text"
      }`}
      disabled={disabled || isWithdrawing}
      onClick={handleWithdraw}
    >
      {isWithdrawing ? "Withdrawing..." : "Withdraw Prize"}
    </Button>
  )
}