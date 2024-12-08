'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Card } from '@nextui-org/react'

// Carregue ReactPlayer dinamicamente (apenas no cliente)
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

interface PlayerProps {
  url: string
  width?: string
  height?: string
  controls?: boolean
  loop?: boolean
  autoplay?: boolean
}

export const Player: React.FC<PlayerProps> = ({
  url,
  width = '100%',
  height = '500px',
  controls = true,
  loop = false,
  autoplay = false,
}) => {
  return (
    <Card
      className="flex justify-center items-center"
      style={{
        borderRadius: '16px',
      }}
    >
      <div style={{ width, height, overflow: 'hidden', borderRadius: '16px' }}>
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls={controls}
          playing={autoplay}
          loop={loop}
          style={{ borderRadius: '16px' }}
        />
      </div>
    </Card>
  )
}

export default Player
