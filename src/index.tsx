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

    Subscribers.add(handleLazyLoad)
    handleScroll()

    if (Subscribers.size !== 0) {
      return () => {
        Subscribers.delete(handleLazyLoad)
      }
    } else {
      // 注册eventListener，并添加订阅
      document.addEventListener('scroll', handleScroll)

      return () => {
        document.removeEventListener('scroll', handleScroll)
        Subscribers.delete(handleLazyLoad)
      }
    }
  }, [offset])

  return <img ref={domRef} src={show ? src : ''} alt="" {...restProps} />
}

export default LazyImg
