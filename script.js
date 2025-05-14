// --- Animated Hero Waves (unchanged) ---
const canvas = document.getElementById('heroWaves');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);

const lines = [
  { amp: 18, freq: 0.003, phase: 0, speed: 0.12, y: 0.25 },
  { amp: 28, freq: 0.002, phase: 1.2, speed: 0.09, y: 0.38 },
  { amp: 22, freq: 0.0025, phase: 2.4, speed: 0.07, y: 0.52 },
  { amp: 16, freq: 0.0032, phase: 3.1, speed: 0.10, y: 0.65 }
];

function drawWaves(time) {
  ctx.clearRect(0, 0, width, height);
  lines.forEach((line, i) => {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = 'rgba(166,161,255,0.10)';
    for (let x = 0; x <= width; x += 2) {
      let y = height * line.y +
        Math.sin((x * line.freq) + (time * 0.00025) + line.phase) * line.amp;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.shadowColor = 'rgba(166,161,255,0.13)';
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();

    // Gradient sweep (15–20s per cycle, very soft)
    const sweepWidth = 220;
    const sweepX = ((time * 0.00006) + i * 120) % (width + sweepWidth) - sweepWidth;
    ctx.save();
    ctx.globalAlpha = 0.13;
    ctx.beginPath();
    for (let x = 0; x <= width; x += 2) {
      let y = height * line.y +
        Math.sin((x * line.freq) + (time * 0.00025) + line.phase) * line.amp;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    let grad = ctx.createLinearGradient(sweepX, 0, sweepX + sweepWidth, 0);
    grad.addColorStop(0, 'rgba(166,161,255,0)');
    grad.addColorStop(0.5, 'rgba(166,161,255,0.7)');
    grad.addColorStop(1, 'rgba(166,161,255,0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();
  });
}

function animateWaves(time) {
  drawWaves(time);
  requestAnimationFrame(animateWaves);
}
animateWaves(0);

// --- Status Update Animation with Bar Sweep ---
const statusUpdates = [
  "Cap Table Updated", "Runway Calculated", "Investor Monthly Update Sent", "Dataroom Synced",
  "Board Deck Prepared", "Equity Granted", "Time Off Logged", "Benefits Confirmed", "Payroll Run",
  "New Hire Docs Filed", "Contractor Signed", "Compliance Reminder Sent", "Delaware Franchise Filed",
  "Operating Agreement Saved", "W-9 Collected", "1099 Sent", "NDA Signed", "Offer Letter Sent",
  "SAFE Logged", "Bank Reconciled"
];
let statusIdx = 0;
const statusDiv = document.getElementById('statusUpdate');
const barSweep = document.getElementById('statusBarSweep');

function showStatusUpdate(idx) {
  // Animate bar sweep
  if (barSweep) {
    barSweep.classList.remove('animate');
    void barSweep.offsetWidth; // force reflow
    barSweep.classList.add('animate');
  }
  // Fade out text, then update and fade in
  statusDiv.classList.remove('visible');
  setTimeout(() => {
    statusDiv.textContent = statusUpdates[idx];
    statusDiv.classList.add('visible');
  }, 400); // fade out, then fade in
}

function statusUpdateLoop() {
  showStatusUpdate(statusIdx);
  statusIdx = (statusIdx + 1) % statusUpdates.length;
  setTimeout(statusUpdateLoop, 4000); // 3.5s visible, 0.5s fade/bar
}
setTimeout(statusUpdateLoop, 200); // initial delay

// --- Waitlist Form (optional: prevent default for demo) ---
document.querySelector('.waitlist-form').addEventListener('submit', e => {
  e.preventDefault();
  statusDiv.classList.remove('visible');
  setTimeout(() => {
    statusDiv.textContent = "You're on the list!";
    statusDiv.classList.add('visible');
  }, 400);
  if (barSweep) {
    barSweep.classList.remove('animate');
    void barSweep.offsetWidth;
    barSweep.classList.add('animate');
  }
});
