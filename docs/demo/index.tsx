import LazyImg from 'yc-lazy-img';
import * as React from 'react';

const imgs = [
  '/static/1.png',
  '/static/2.png',
  '/static/3.png',
  '/static/4.png',
  '/static/5.png',
  '/static/6.png',
  '/static/7.png',
  '/static/8.png',
]

export default () => {

  return (
    <div>
      {imgs.map((i, id) => (
        (
          <div key={id} style={{height: 500, overflow: 'hidden'}}>
            <LazyImg style={{width: '100%', height: '100%'}} src={i} />
          </div>
        )
      ))}
    </div>
  )
}