"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, CameraOff, Video } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

interface Analytics {
  current_faces: number
  total_detected: number
  avg_faces_per_minute: number
  session_duration: string
  face_details: Array<{
    position: string
    size: string
  }>
}

export default function LiveFeedPage() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [facesDetected, setFacesDetected] = useState(0)
  const [analytics, setAnalytics] = useState<Analytics>({
    current_faces: 0,
    total_detected: 0,
    avg_faces_per_minute: 0,
    session_duration: "0s",
    face_details: []
  })
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
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'frame') {
          if (videoRef.current) {
            videoRef.current.src = `data:image/jpeg;base64,${data.data}`
          }
          setFacesDetected(data.faces_detected)
          if (data.analytics) {
            setAnalytics(data.analytics)
          }
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error)
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
    setAnalytics({
      current_faces: 0,
      total_detected: 0,
      avg_faces_per_minute: 0,
      session_duration: "0s",
      face_details: []
    })
  }

  return (
    <div className="space-y-4">
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
          <div className="relative aspect-square max-w-2xl mx-auto bg-muted rounded-lg overflow-hidden">
            {isStreaming ? (
              <img
                ref={videoRef}
                className="w-full h-full object-cover"
                alt="Live feed"
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <img
                  src="/images/camera-placeholder.png"
                  alt="Camera placeholder"
                  className="h-100 w-100 opacity-100 mb-4"
                />
                <p className="text-muted-foreground text-sm">
                  {wsRef.current ? "Camera Stopped" : "Click 'Start Camera' to begin streaming"}
                </p>
              </div>
            )}
            {isStreaming && (
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded">
                Faces detected: {facesDetected}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {isStreaming && analytics && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Current Session</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.session_duration || "0s"}</div>
              <p className="text-xs text-muted-foreground">Active time</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Detections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.total_detected || 0}</div>
              <p className="text-xs text-muted-foreground">Faces detected this session</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.avg_faces_per_minute || 0}</div>
              <p className="text-xs text-muted-foreground">Faces per minute</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Current Faces</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.current_faces || 0}</div>
              <p className="text-xs text-muted-foreground">Currently in frame</p>
            </CardContent>
          </Card>
        </div>
      )}

      {isStreaming && analytics.face_details.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Face Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics.face_details.map((face, index) => (
                <div key={index} className="flex items-center justify-between border-b py-2">
                  <span>Face {index + 1}</span>
                  <span className="text-muted-foreground">Position: {face.position}</span>
                  <span className="text-muted-foreground">Size: {face.size}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <CardFooter className="flex justify-start">
        <Button asChild>
          <Link href="/">Return to Dashboard</Link>
        </Button>
      </CardFooter>
    </div>
  )
}

