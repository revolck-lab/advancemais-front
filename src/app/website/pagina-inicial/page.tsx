import Slider from '@/components/website/slider/slider'
import CourseCarrousel from '@/components/website/courses/coursesCarousel'
import Blog from '@/components/website/blog/blog'
import BusinessInformation from '@/components/website/informations/businessInformation'
import BannersGroup from '@/components/website/bannersGroup/bannersGroup'
import CounterInformation from '@/components/website/counter/counterInformation'
import BusinessGroupInformation from '@/components/website/informations/businessGroupInformation'
import LogoCarousel from '@/components/website/logocarousel/logocarousel'

export default function HomePage(): JSX.Element {
  return (
    <>
      <Slider />
      <BusinessInformation />
      <BannersGroup />
      <CounterInformation />
      <BusinessGroupInformation />
      <CourseCarrousel />
      <Blog />
      <LogoCarousel />
    </>
  )
}
