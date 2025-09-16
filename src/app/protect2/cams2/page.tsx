'use client'

import { useRef, useState } from "react"
import Image from "next/image"

export default function Click() {
  const vdoStream = useRef<MediaStream | null>(null)
  const actualVdo = useRef<HTMLVideoElement | null>(null)
  const imgCanvas = useRef<HTMLCanvasElement | null>(null)
  const [imgUrl, setImgUrl] = useState<string>('')

  //startVdo
  const startVdo = async () => {
    const camera = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    vdoStream.current = camera
    if (actualVdo.current) {
      actualVdo.current.srcObject = camera
    }
  }


  const clickPic = () => {
    if (!imgCanvas.current || !actualVdo.current) return 
    
    // Fix 1: canvas is the context, not a ref - remove .current
    const canvas = imgCanvas.current.getContext('2d')!
    
    // Fix 2: Set canvas dimensions
    imgCanvas.current.width = actualVdo.current.videoWidth
    imgCanvas.current.height = actualVdo.current.videoHeight
    
    // Draw the video frame
    canvas.drawImage(actualVdo.current, 0, 0)
    
    // Convert to blob and create URL
    imgCanvas.current.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        setImgUrl(url)
      }
    })
  }

  //stopVdo
  const stop = () => {
    if (vdoStream.current) {
      vdoStream.current.getTracks().forEach((track) => track.stop())
    }
  }

  return (
    <div>
      <button onClick={startVdo}>Start</button>
      <button onClick={clickPic}>Capture</button>
      <button onClick={stop}>Stop</button>
      
      <video ref={actualVdo} playsInline autoPlay muted className="w-48 h-36 border-4" />
      <canvas ref={imgCanvas} style={{ display: 'none' }} />
      
      {imgUrl && <Image src={imgUrl} alt="captured" width={100} height={100} />}
<p className="bg-teal-400">{imgUrl}</p>

    </div>
  )
}