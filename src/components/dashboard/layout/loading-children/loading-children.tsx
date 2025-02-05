import Styles from './loading-children.module.css'

export default function LoadingChildren() {
  return (
    <div className={Styles.loaderContainer}>
      <div className={Styles.loader}></div>
    </div>
  )
}
