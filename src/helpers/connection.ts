const servers = {
    iceServers: [
        {
            urls: [
                'stun:stun.l.google.com:19302', 
                'stun:stun1.l.google.com:19302'
            ]
        }
    ]
};

async function createOffer() {
    const peerConnection = new RTCPeerConnection(servers);
    const remote = new MediaStream();
    
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remote.addTrack(track);
        });
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            console.log("New Ice Candidate", event.candidate);
        }
    };

    console.log("offer", offer); 
    return remote;
}

export default createOffer;
