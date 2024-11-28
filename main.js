let localStream;
let remoteStream;
let peerConnection;

const servers = {
	iceServers: [
		{
			urls: [
				'stun:stun.l.google.com:3478',
				'stun:stun.l.google.com:19302',
				'stun:stun.l.google.com:5349',
				'stun:stun1.l.google.com:3478',
				'stun:stun1.l.google.com:5349',
				'stun:stun2.l.google.com:19302',
				'stun:stun2.l.google.com:5349',
				'stun:stun3.l.google.com:3478',
				'stun:stun3.l.google.com:5349',
				'stun:stun4.l.google.com:19302',
				'stun:stun4.l.google.com:5349',
			],
		},
	],
};

const init = async () => {
	localStream = await navigator.mediaDevices.getUserMedia({
		audio: false, // set to true if you want audio
		video: true,
	});
	document.getElementById('user-1').srcObject = localStream;

	createOffer();
};

const createOffer = async () => {
	peerConnection = new RTCPeerConnection(servers);

	remoteStream = new MediaStream();
	document.getElementById('user-2').srcObject = remoteStream;

	localStream.getTracks().forEach((track) => {
		peerConnection.addTrack(track, localStream);
	});

	peerConnection.ontrack = (event) => {
		event.streams[0].getTracks().forEach((track) => {
			remoteStream.addTrack(track);
		});
	};

	peerConnection.onicecandidate = async (event) => {
		if (event.candidate) {
			console.log('Candidate:', event.candidate);
		}
	};

	const offer = await peerConnection.createOffer();
	await peerConnection.setLocalDescription(offer);

	console.log('Offer:', offer);
};
init();
