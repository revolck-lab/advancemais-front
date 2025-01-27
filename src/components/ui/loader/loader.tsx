import Styles from './loader.module.css'

export function Loader() {
  return (
    <div className={Styles['loader-container']}>
      <div className={Styles.loader}></div>
    </div>
  )
}
