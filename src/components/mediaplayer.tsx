import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isCameraOnAtom, isMicOnAtom } from "../atom";

function MediaPlayer() {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [isCameraOn, setisCameraOn] = useRecoilState(isCameraOnAtom);
    const [isMicOn, setisMicOn] = useRecoilState(isMicOnAtom);

    function toggleCamera() {
        setisCameraOn(prev => !prev);
    }

    function toggleMic() {
        setisMicOn(prev => !prev);
    }

    useEffect(() => {
        const stopTracksAndReleaseStream = () => {
            localStream?.getTracks().forEach(track => track.stop());
            const videoElement = document.getElementById("video") as HTMLVideoElement;
            if (videoElement) {
                videoElement.srcObject = null;
            }
            setLocalStream(null);
        };
    
        if (!isCameraOn && localStream) {
            stopTracksAndReleaseStream();
        }
    
        if (isCameraOn || isMicOn) {
            navigator.mediaDevices.getUserMedia({
                video: isCameraOn
                    ? {
                        width: { ideal: 1920 }, 
                        height: { ideal: 1080 }, 
                        frameRate: { ideal: 30, max: 60 } 
                    }
                    : false,
                audio: isMicOn
            }).then((stream) => {
                setLocalStream(stream);
                const videoElement = document.getElementById("video") as HTMLVideoElement;
                if (videoElement) {
                    videoElement.srcObject = stream;
                }
            }).catch((error) => {
                console.error("Error accessing media devices:", error);
            });
        }
    
        return stopTracksAndReleaseStream;
    }, [isCameraOn, isMicOn]);
    
    return (
        <div className="relative h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
    <video
        id="video"
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
    ></video>

    {!isCameraOn && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 text-3xl text-gray-400 font-semibold">
            Video Off
        </div>
    )}

    <div className="absolute inset-x-0 bottom-8 flex justify-center space-x-8 z-10">
        <button
            onClick={toggleCamera}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform transform hover:scale-105 active:scale-95 focus:outline-none ${
                isCameraOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-500"
            }`}
        >
            {isCameraOn ? (
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>

            )}
        </button>

        <button
            onClick={toggleMic}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform transform hover:scale-105 active:scale-95 focus:outline-none ${
                isMicOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-500"
            }`}
        >
            {isMicOn ? (
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            )}
        </button>
    </div>
</div>

    );
}

export default MediaPlayer;
