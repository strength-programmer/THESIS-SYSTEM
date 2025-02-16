import asyncio
import websockets
import cv2
import base64
import json
import numpy as np
from datetime import datetime

class FaceDetectionServer:
    def __init__(self):
        self.face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        self.camera = None
        self.total_faces_detected = 0
        self.start_time = None

    async def process_frame(self, websocket):
        try:
            self.camera = cv2.VideoCapture(0)
            self.start_time = datetime.now()
            self.total_faces_detected = 0
            
            while True:
                ret, frame = self.camera.read()
                if not ret:
                    break

                # Face detection
                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                faces = self.face_cascade.detectMultiScale(gray, 1.1, 4)
                
                # Update analytics
                current_faces = len(faces)
                self.total_faces_detected += current_faces
                duration = (datetime.now() - self.start_time).total_seconds()
                
                # Draw rectangles and labels for each face
                face_details = []
                for (x, y, w, h) in faces:
                    cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
                    # Calculate face position
                    frame_h, frame_w = frame.shape[:2]
                    position = "center"
                    if x < frame_w/3:
                        position = "left"
                    elif x > 2*frame_w/3:
                        position = "right"
                    
                    face_details.append({
                        "position": position,
                        "size": f"{w}x{h}px"
                    })

                # Convert frame to base64
                _, buffer = cv2.imencode('.jpg', frame)
                frame_base64 = base64.b64encode(buffer).decode('utf-8')

                # Create analytics message
                analytics = {
                    "current_faces": current_faces,
                    "total_detected": self.total_faces_detected,
                    "avg_faces_per_minute": round(self.total_faces_detected / (duration/60), 2) if duration > 0 else 0,
                    "session_duration": f"{int(duration)}s",
                    "face_details": face_details
                }

                message = {
                    'type': 'frame',
                    'data': frame_base64,
                    'timestamp': datetime.now().isoformat(),
                    'faces_detected': current_faces,
                    'analytics': analytics
                }

                await websocket.send(json.dumps(message))
                await asyncio.sleep(0.033)  # ~30 FPS

        except websockets.exceptions.ConnectionClosed:
            print("Client disconnected")
        finally:
            if self.camera:
                self.camera.release()

    async def handler(self, websocket):
        try:
            async for message in websocket:
                data = json.loads(message)
                if data['type'] == 'start_stream':
                    await self.process_frame(websocket)
                elif data['type'] == 'stop_stream':
                    if self.camera:
                        self.camera.release()
                        self.camera = None
        except Exception as e:
            print(f"Error: {e}")

async def main():
    server = FaceDetectionServer()
    async with websockets.serve(server.handler, "localhost", 8765):
        print("WebSocket server started on ws://localhost:8765")
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main()) 