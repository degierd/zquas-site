(() => {
  'use strict';
  const mark = document.querySelector('body > nav .nav-logo span');
  if (!mark || !Element.prototype.animate) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const diameter = 14, radius = diameter / 2;
  let flights = [], particles = [], running = false, startTimer;
  const originalVisibility = mark.style.visibility;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const ease = t => t * t * (3 - 2 * t);
  const lerp = (a, b, t) => a + (b - a) * t;

  function home() {
    const r = mark.getBoundingClientRect(), style = getComputedStyle(mark);
    const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
    ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const m = ctx.measureText('.'), font = parseFloat(style.fontSize);
    const ascent = m.fontBoundingBoxAscent ?? font * .8;
    const descent = m.fontBoundingBoxDescent ?? font * .2;
    const baseline = r.top + (r.height - ascent - descent) / 2 + ascent;
    return {
      x: r.left + (m.actualBoundingBoxRight - m.actualBoundingBoxLeft) / 2,
      y: baseline - (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2,
      scale: clamp((m.actualBoundingBoxLeft + m.actualBoundingBoxRight) / diameter, .14, .36),
    };
  }
  function stop() {
    clearTimeout(startTimer);
    flights.forEach(a => a.cancel()); flights = [];
    particles.forEach(p => p.remove()); particles = [];
    mark.style.visibility = originalVisibility;
    running = false;
  }
  function trajectory(origin) {
    const width = document.documentElement.clientWidth, height = innerHeight;
    const frames = [], dt = 1 / 90, airborne = 4.2, returning = 1.5, settling = .3;
    const flightTime = airborne + returning + settling;
    const bounds = { left: radius + 3, right: width - radius - 3, top: radius + 3, bottom: height - radius - 3 };
    let x = origin.x, y = origin.y;
    let vx = width * 1.06, vy = height * .24;
    const gravity = height * 1.24;
    let lastImpact = -10, axis = 'y';
    for (let i = 0; i <= Math.round(airborne / dt); i++) {
      const t = i * dt;
      if (i) {
        vy += gravity * dt; x += vx * dt; y += vy * dt;
        if (x > bounds.right || x < bounds.left) {
          x = clamp(x, bounds.left, bounds.right); vx *= -.92; lastImpact = t; axis = 'x';
        }
        if (y > bounds.bottom || y < bounds.top) {
          y = clamp(y, bounds.top, bounds.bottom); vy *= -.8; lastImpact = t; axis = 'y';
        }
      }
      const grow = ease(clamp(t / .24, 0, 1));
      const scale = lerp(origin.scale, 1, grow);
      const squash = Math.max(0, 1 - (t - lastImpact) / .105) * .26;
      frames.push({ t, x, y, sx: scale * (axis === 'x' ? 1 - squash : 1 + squash), sy: scale * (axis === 'y' ? 1 - squash : 1 + squash), opacity: 1 });
    }
    // A continuous return arc catches the ball and docks it back in the wordmark.
    const from = frames.at(-1);
    const c1 = { x: clamp(from.x + vx * .12, bounds.left, bounds.right), y: clamp(from.y + vy * .12, bounds.top, bounds.bottom) };
    const c2 = { x: origin.x + Math.min(width * .1, 120), y: origin.y + 80 };
    for (let i = 1; i <= Math.round(returning / dt); i++) {
      const u = i / Math.round(returning / dt), v = 1 - u;
      const bx = v ** 3 * from.x + 3 * v * v * u * c1.x + 3 * v * u * u * c2.x + u ** 3 * origin.x;
      const by = v ** 3 * from.y + 3 * v * v * u * c1.y + 3 * v * u * u * c2.y + u ** 3 * origin.y;
      const scale = lerp(1, origin.scale, ease(clamp((u - .35) / .65, 0, 1)));
      frames.push({ t: airborne + u * returning, x: bx, y: by, sx: scale, sy: scale, opacity: 1 });
    }
    // The tiny landing compresses the dot without moving the surrounding letters.
    const landing = airborne + returning;
    for (const [t, sx, sy] of [[0, 1, 1], [.06, 1.25, .7], [.13, .92, 1.12], [.22, 1, 1], [settling, 1, 1]]) {
      frames.push({ t: landing + t, x: origin.x, y: origin.y, sx: origin.scale * sx, sy: origin.scale * sy, opacity: 1 });
    }
    return { frames, duration: flightTime * 1000, total: flightTime };
  }
  function keyframes(frames, total, trail) {
    return frames.map(p => ({
      offset: clamp(p.t / total, 0, 1),
      transform: `translate3d(${p.x - radius}px, ${p.y - radius}px, 0) scale(${p.sx * (trail ? .8 : 1)}, ${p.sy * (trail ? .8 : 1)})`,
      opacity: trail ? (p.t < .1 || p.t > total - .5 ? 0 : .13 / trail) : p.opacity,
    }));
  }
  async function play() {
    stop();
    if (reduced.matches) return;
    if (document.hidden) return;
    const track = trajectory(home());
    running = true; mark.style.visibility = 'hidden';
    for (const trail of [2, 1, 0]) {
      const ball = document.createElement('span');
      ball.className = 'brand-dot-flight' + (trail ? ' is-trail' : '');
      ball.setAttribute('aria-hidden', 'true'); document.body.append(ball); particles.push(ball);
      const animation = ball.animate(keyframes(track.frames, track.total, trail), {
        duration: track.duration,
        delay: trail * 22,
        easing: 'linear',
        fill: 'both',
      });
      flights.push(animation);
    }
    const main = flights.at(-1);
    try { await main.finished; if (flights.includes(main)) stop(); }
    catch { /* Resize and scrolling return ownership to the real logo. */ }
  }
  addEventListener('resize', () => stop());
  addEventListener('scroll', () => { if (running) stop(); }, { passive: true });
  addEventListener('keydown', event => { if (event.key === 'Escape') stop(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  reduced.addEventListener('change', () => stop());
  // Play once after the wordmark font settles. Ordinary scrolling stays in control.
  Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 1200))]).then(() => {
    if (!reduced.matches) startTimer = setTimeout(play, 850);
  });
})();
