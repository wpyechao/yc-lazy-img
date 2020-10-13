import * as React from 'react'

export interface ILazyImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  offset?: number
}

const Subscribers = new Set<() => any>()

function handleScroll() {
  for (const callback of Subscribers) {
    callback()
  }
}

const LazyImg: React.FC<ILazyImgProps> = (props) => {
  const { src, offset = 100, ...restProps } = props

  const domRef = React.useRef<HTMLImageElement>(null)

  const [show, setShow] = React.useState<boolean>(false)

  React.useLayoutEffect(() => {
    function handleLazyLoad() {
      if(domRef.current) {
        const clientHeight = document.body.clientHeight || window.innerHeight
        const { top: imgTop } = domRef.current.getBoundingClientRect()
        if (imgTop <= clientHeight + offset) {
          setShow(true)
        }
      }
    }

    if(Subscribers.size === 0) {
      // 注册eventListener
      document.addEventListener('scroll', handleScroll)
    }

    Subscribers.add(handleLazyLoad)
    handleScroll()

    return () => {
      Subscribers.delete(handleLazyLoad)
      if(Subscribers.size === 0) {
        document.removeEventListener('scroll', handleScroll)
      }
    }
  }, [offset])

  return <img ref={domRef} src={show ? src : ''} alt="" {...restProps} />
}

export default LazyImg
