import { ImageResponse } from 'next/server'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 8,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          lineHeight: '20%',
          letterSpacing: '-0.1px',
        }}
      >
        <p style={{ color: 'yellow', fontStyle: 'cursive' }}>lordksix</p>
        <p>F1Mania</p>
      </div>
    ),
    {
      ...size,
    }
  )
}