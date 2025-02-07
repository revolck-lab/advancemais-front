// src/components/dashboard/layout/loading-children/loading-children.tsx
import React from 'react'
import styles from './loading-children.module.css'

interface LoadingChildrenProps {
  fullScreen?: boolean
}

export default function LoadingChildren({
  fullScreen = false,
}: LoadingChildrenProps) {
  return (
    <div
      className={
        fullScreen ? styles.fullScreenLoaderContainer : styles.loaderContainer
      }
    >
      <div className={styles.loader}></div>
    </div>
  )
}
