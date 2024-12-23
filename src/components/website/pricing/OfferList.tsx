import React from 'react'
import { Check, X } from 'lucide-react'

const OfferList = ({
  text,
  status,
}: {
  text: string
  status: 'active' | 'inactive'
}): JSX.Element => {
  return (
    <div className="mb-3 flex items-center">
      <span className="mr-3 flex h-[25px] w-full max-w-[25px] items-center justify-center rounded-full bg-primary bg-opacity-10 text-primary">
        {status === 'active' ? <Check size={14} /> : <X size={14} />}
      </span>
      <p className="m-0 text-base font-medium text-body-color">{text}</p>
    </div>
  )
}

export default OfferList
