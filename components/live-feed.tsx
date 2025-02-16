"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, CameraOff } from "lucide-react"

export function LiveFeed() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [facesDetected, setFacesDetected] = useState(0)
  const wsRef = useRef<WebSocket | null>(null)
  const videoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  const toggleStream = () => {
    if (isStreaming) {
      stopStream()
    } else {
      startStream()
    }
  }

  const startStream = () => {
    wsRef.current = new WebSocket('ws://localhost:8765')
    
    wsRef.current.onopen = () => {
      setIsStreaming(true)
      wsRef.current?.send(JSON.stringify({ type: 'start_stream' }))
    }

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'frame') {
        if (videoRef.current) {
          videoRef.current.src = `data:image/jpeg;base64,${data.data}`
        }
        setFacesDetected(data.faces_detected)
      }
    }

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error)
      stopStream()
    }
  }

  const stopStream = () => {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({ type: 'stop_stream' }))
      wsRef.current.close()
      wsRef.current = null
    }
    setIsStreaming(false)
    setFacesDetected(0)
  }

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Live Feed</CardTitle>
        <Button 
          onClick={toggleStream}
          variant={isStreaming ? "destructive" : "default"}
        >
          {isStreaming ? (
            <>
              <CameraOff className="mr-2 h-4 w-4" /> Stop Camera
            </>
          ) : (
            <>
              <Camera className="mr-2 h-4 w-4" /> Start Camera
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
          <img
            ref={videoRef}
            className="w-full h-full object-cover"
            alt="Live feed"
          />
          {isStreaming && (
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded">
              Faces detected: {facesDetected}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

