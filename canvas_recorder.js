
const canvas = document.querySelector('#webglCanvas')
const ctx = canvas.getContext('2d');
var x = 0;
startRecording();

function startRecording() {
  const chunks = []
  const stream = canvas.captureStream()
  const rec = new MediaRecorder(stream)
  
  rec.ondataavailable = e => chunks.push(e.data)
  
  rec.onstop = e => exportVid(new Blob(chunks, {type: 'video/webm'}))
  
  rec.start();
  setTimeout(()=>rec.stop(), 13000); // Seconds to stop recording
}

function exportVid(blob) {
  const vid = document.createElement('video');
  vid.src = URL.createObjectURL(blob);
  vid.controls = true;
  document.body.appendChild(vid);
  const a = document.createElement('a');
  a.download = 'myvid.webm';
  a.href = vid.src;
  a.textContent = 'download the video';
  document.body.appendChild(a);
}
