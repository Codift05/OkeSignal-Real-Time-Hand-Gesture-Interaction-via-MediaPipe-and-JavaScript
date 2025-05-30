const videoElement = document.getElementById('video');
const loveText = document.getElementById('loveText');

// Setup camera
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 640,
  height: 480
});
camera.start();

// Setup MediaPipe Hands
const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.5
});

// Fungsi saat tangan terdeteksi
hands.onResults(results => {
  if (results.multiHandLandmarks.length > 0) {
    const landmarks = results.multiHandLandmarks[0];

    // Contoh logika sederhana: jempol & telunjuk dekat (seakan bentuk love)
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];

    const dx = thumbTip.x - indexTip.x;
    const dy = thumbTip.y - indexTip.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 0.05) {
      loveText.style.display = 'block';
      if (!document.querySelector('.bubble')) {
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerHTML = ' ';
  document.body.appendChild(bubble);

  anime({
    targets: bubble,
    translateY: -500,
    scale: [1, 1.5],
    opacity: [1, 0],
    duration: 3000,
    easing: 'easeOutQuad',
    complete: () => bubble.remove()
  });
}
    } else {
      loveText.style.display = 'none';
    }
  }
});
