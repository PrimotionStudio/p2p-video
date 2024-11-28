let localStream;
let remoteStream;

const init = async () => {
	localStream = await navigator.mediaDevices.getUserMedia({
		audio: false, // set to true if you want audio
		video: true,
	});
	document.getElementById('user-1').srcObject = localStream;
};
init();
