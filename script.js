const projectCopy = {
  launch: {
    kicker: "01 / Software Engineering Internship · Summer 2025",
    title: "KIDZHACK",
    body:
      "Contributed to an elementary student check-in platform using AWS, Python, JavaScript, Angular, and Git. I developed role-based authentication with custom AWS Lambda Authorizers and refactored the desktop-only interface for clean mobile use.",
    actions: [],
  },
  system: {
    kicker: "04 / Full-Stack Project · Summer 2024",
    title: "Weekly Cleaning Quotes",
    body:
      "A mobile-friendly estimating app for a residential cleaning business. I built the Python and Flask backend, integrated housing-data API requests, designed the branded Bootstrap interface, and deployed the HTTPS site on DigitalOcean.",
    actions: [
      { label: "view project", href: "https://weeklycleaningquotes.com/" },
      { label: "view bitbucket", href: "https://bitbucket.org/reidcastillo/workspace/projects/CLEAN" },
    ],
  },
  tool: {
    kicker: "02 / Limelyte · Product + Full Stack",
    title: "Limelyte",
    body:
      "Specs: React and JavaScript interface work, Node-style application structure, database-minded flows, responsive design, and deployment awareness. For employers, Limelyte is a compact proof of full-stack judgment: I can shape a product idea, make the interface understandable, connect the technical pieces, and explain why the build matters.",
    actions: [
      { label: "view site", href: "https://limelyte.vercel.app/" },
      { label: "inquire about repository", href: "#contact" },
    ],
  },
  archive: {
    kicker: "03 / A.I. Backed Academic Productivity Tool · Jan 2026 - May 2026",
    title: "FlowState",
    body:
      "Solely responsible for frontend development and user experience design, building 10+ production-ready pages and workflows with the Mantine React component library. I collaborated on LLM integrations for textbook summarization, concept explanations, contextual question answering, and dynamic study material generation from uploaded course content. FlowState turns textbook chapters into structured summaries, 5+ flashcards per chapter, and repeatable 10-question quizzes so students can create personalized study materials in seconds.",
    actions: [{ label: "view project", href: "https://bitbucket.org/reidcastillo/workspace/projects/SP26" }],
  },
};

function playCrumpleSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const now = context.currentTime;
  const duration = 0.42;
  const sampleRate = context.sampleRate;
  const buffer = context.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i += 1) {
    const t = i / data.length;
    const crackle = Math.random() * 2 - 1;
    const envelope = Math.pow(1 - t, 2.6) * (0.28 + Math.random() * 0.72);
    data[i] = crackle * envelope;
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1800, now);
  filter.frequency.exponentialRampToValueAtTime(4800, now + duration * 0.45);
  filter.Q.setValueAtTime(1.8, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.22, now + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  source.buffer = buffer;
  source.connect(filter).connect(gain).connect(context.destination);
  source.start(now);
  source.stop(now + duration);
  source.addEventListener("ended", () => context.close());
}

function playImpactSound(kind = "floor") {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const now = context.currentTime;
  const gain = context.createGain();
  const tone = context.createOscillator();
  const noise = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const duration = kind === "rim" ? 0.22 : kind === "binDrop" ? 0.42 : kind === "metal" ? 0.34 : 0.18;
  const sampleRate = context.sampleRate;
  const buffer = context.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i += 1) {
    const t = i / data.length;
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, kind === "rim" ? 4.6 : kind === "binDrop" ? 2.8 : kind === "metal" ? 2.1 : 3.4);
  }

  tone.type = kind === "rim" ? "square" : kind === "metal" ? "triangle" : "sine";
  tone.frequency.setValueAtTime(kind === "rim" ? 1450 : kind === "binDrop" ? 72 : kind === "metal" ? 420 : 92, now);
  tone.frequency.exponentialRampToValueAtTime(kind === "rim" ? 760 : kind === "binDrop" ? 38 : kind === "metal" ? 165 : 54, now + duration);
  filter.type = kind === "rim" ? "bandpass" : kind === "metal" ? "highpass" : "lowpass";
  filter.frequency.setValueAtTime(kind === "rim" ? 2100 : kind === "binDrop" ? 260 : kind === "metal" ? 720 : 380, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(kind === "rim" ? 0.08 : kind === "binDrop" ? 0.19 : kind === "metal" ? 0.18 : 0.12, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  noise.buffer = buffer;
  tone.connect(gain);
  noise.connect(filter).connect(gain);
  gain.connect(context.destination);
  tone.start(now);
  noise.start(now);
  tone.stop(now + duration);
  noise.stop(now + duration);
  noise.addEventListener("ended", () => context.close());
}

const faceColors = {
  front: "#d8d2bf",
  back: "#1769ff",
  right: "#ff7a1a",
  left: "#ef2d24",
  top: "#f5f1e8",
  bottom: "#06bd61",
};

const sideTransforms = {
  front: "translateZ(var(--cubie-half))",
  back: "rotateY(180deg) translateZ(var(--cubie-half))",
  right: "rotateY(90deg) translateZ(var(--cubie-half))",
  left: "rotateY(-90deg) translateZ(var(--cubie-half))",
  top: "rotateX(90deg) translateZ(var(--cubie-half))",
  bottom: "rotateX(-90deg) translateZ(var(--cubie-half))",
};

const sideNormals = {
  front: [0, 0, 1],
  back: [0, 0, -1],
  right: [1, 0, 0],
  left: [-1, 0, 0],
  top: [0, 1, 0],
  bottom: [0, -1, 0],
};

const normalSides = {
  "0,0,1": "front",
  "0,0,-1": "back",
  "1,0,0": "right",
  "-1,0,0": "left",
  "0,1,0": "top",
  "0,-1,0": "bottom",
};

const rubikCube = document.querySelector("[data-rubik-cube]");
const cubeViewport = document.querySelector(".cube-viewport");
const puzzleControls = [...document.querySelectorAll(".puzzle-arrow")];
const puzzleReset = document.querySelector("[data-puzzle-reset]");
const puzzleScramble = document.querySelector("[data-puzzle-scramble]");
const cup = document.querySelector("[data-cup]");
const wastebin = document.querySelector("[data-wastebin]");
const stage = document.querySelector("[data-stage]");
const panel = document.querySelector("[data-project-panel]");
const slips = [...document.querySelectorAll(".project-slip")];
const repinBoard = document.querySelector("[data-repin-board]");
const emailButton = document.querySelector("[data-copy-email]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

let cubies = [];
let isTurning = false;
let activeProject = null;
let isCrumplingPaper = false;
let viewX = -24;
let viewY = -34;
let ambientCubeActive = true;
let ambientCubeFrame = 0;
let ambientCubeTimer = 0;

const defaultScramble = [
  ["y", 1, 1],
  ["x", -1, -1],
  ["y", -1, -1],
  ["x", 1, 1],
  ["y", 0, 1],
  ["x", 0, -1],
  ["y", 1, -1],
];

function rotateVector([x, y, z], axis, direction) {
  if (axis === "x") return direction > 0 ? [x, -z, y] : [x, z, -y];
  if (axis === "y") return direction > 0 ? [z, y, -x] : [-z, y, x];
  return direction > 0 ? [-y, x, z] : [y, -x, z];
}

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function rotateForView([x, y, z]) {
  const yRad = degreesToRadians(viewY);
  const yCos = Math.cos(yRad);
  const ySin = Math.sin(yRad);
  const afterY = [x * yCos + z * ySin, y, -x * ySin + z * yCos];

  const xRad = degreesToRadians(viewX);
  const xCos = Math.cos(xRad);
  const xSin = Math.sin(xRad);
  const [rx, ry, rz] = afterY;
  return [rx, ry * xCos - rz * xSin, ry * xSin + rz * xCos];
}

function projectedAxis(axis) {
  const rotated = rotateForView(sideNormals[axis]);
  return { axis, screenX: rotated[0], screenY: -rotated[1], depth: rotated[2] };
}

function visibleControlAxes() {
  const visibleFace = ["front", "back", "right", "left", "top", "bottom"]
    .map(projectedAxis)
    .sort((a, b) => b.depth - a.depth)[0];
  const faceAxis = axisName(visibleFace.axis);
  const axes = ["right", "top", "front"]
    .map(projectedAxis)
    .filter((axis) => axisName(axis.axis) !== faceAxis);
  const horizontal = [...axes].sort((a, b) => Math.abs(b.screenX) - Math.abs(a.screenX))[0];
  const vertical = axes.find((axis) => axis.axis !== horizontal.axis);

  return {
    face: visibleFace.axis,
    horizontal: horizontal.axis,
    horizontalSign: horizontal.screenX >= 0 ? 1 : -1,
    vertical: vertical.axis,
    verticalSign: vertical.screenY <= 0 ? 1 : -1,
  };
}

function axisName(side) {
  if (side === "right" || side === "left") return "x";
  if (side === "top" || side === "bottom") return "y";
  return "z";
}

function layerFromScreenRow(row, controls = visibleControlAxes()) {
  if (row === 1) return 0;
  return row === 0 ? controls.verticalSign : -controls.verticalSign;
}

function layerFromScreenColumn(column, controls = visibleControlAxes()) {
  if (column === 1) return 0;
  return column === 0 ? -controls.horizontalSign : controls.horizontalSign;
}

function vectorForAxis(axis, layer) {
  if (axis === "x") return [layer, 0, 0];
  if (axis === "y") return [0, layer, 0];
  return [0, 0, layer];
}

function addVectors(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function axisIndex(axis) {
  if (axis === "x") return 0;
  if (axis === "y") return 1;
  return 2;
}

function axisFromSide(side) {
  return axisName(side);
}

function visibleFaceNormal(excludedAxis) {
  const excludedIndex = axisIndex(excludedAxis);
  const candidates = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ].filter((candidate) => candidate[excludedIndex] === 0);

  return candidates.sort((a, b) => rotateForView(b)[2] - rotateForView(a)[2])[0];
}

function visibleReferencePoint(axis, layer) {
  return addVectors(vectorForAxis(axis, layer), visibleFaceNormal(axis));
}

function pointFromScreenSlot(horizontalAxis, horizontalLayer, verticalAxis, verticalLayer, faceNormal) {
  return addVectors(
    addVectors(vectorForAxis(horizontalAxis, horizontalLayer), vectorForAxis(verticalAxis, verticalLayer)),
    faceNormal,
  );
}

function directionForScreenMotion(axis, layer, desiredScreenX, desiredScreenY) {
  const point = visibleReferencePoint(axis, layer);
  const before = rotateForView(point);
  const afterPositive = rotateForView(rotateVector(point, axis, 1));
  const deltaX = afterPositive[0] - before[0];
  const deltaY = -(afterPositive[1] - before[1]);
  const dot = deltaX * desiredScreenX + deltaY * desiredScreenY;

  return dot >= 0 ? 1 : -1;
}

function visibleFaceVector(controls) {
  return sideNormals[controls.face];
}

function directionForScreenRow(row, desiredScreenX, controls) {
  const horizontalAxis = axisFromSide(controls.horizontal);
  const verticalAxis = axisFromSide(controls.vertical);
  const horizontalLayer = controls.horizontalSign;
  const verticalLayer = layerFromScreenRow(row, controls);
  const point = pointFromScreenSlot(horizontalAxis, horizontalLayer, verticalAxis, verticalLayer, visibleFaceVector(controls));
  const before = rotateForView(point);
  const afterPositive = rotateForView(rotateVector(point, verticalAxis, 1));
  const deltaX = afterPositive[0] - before[0];

  return deltaX * desiredScreenX >= 0 ? 1 : -1;
}

function directionForScreenColumn(column, desiredScreenY, controls) {
  const horizontalAxis = axisFromSide(controls.horizontal);
  const verticalAxis = axisFromSide(controls.vertical);
  const horizontalLayer = layerFromScreenColumn(column, controls);
  const verticalLayer = controls.verticalSign;
  const point = pointFromScreenSlot(horizontalAxis, horizontalLayer, verticalAxis, verticalLayer, visibleFaceVector(controls));
  const before = rotateForView(point);
  const afterPositive = rotateForView(rotateVector(point, horizontalAxis, 1));
  const deltaY = -(afterPositive[1] - before[1]);

  return deltaY * desiredScreenY >= 0 ? 1 : -1;
}

function stickerFor(face, [x, y, z]) {
  if (face === "front") return { sourceFace: face, sourceIndex: (1 - y) * 3 + (x + 1) };
  if (face === "back") return { sourceFace: face, sourceIndex: (1 - y) * 3 + (1 - x) };
  if (face === "right") return { sourceFace: face, sourceIndex: (1 - y) * 3 + (1 - z) };
  if (face === "left") return { sourceFace: face, sourceIndex: (1 - y) * 3 + (z + 1) };
  if (face === "top") return { sourceFace: face, sourceIndex: (z + 1) * 3 + (x + 1) };
  return { sourceFace: face, sourceIndex: (1 - z) * 3 + (x + 1) };
}

function createCubies() {
  const nextCubies = [];

  for (let x = -1; x <= 1; x += 1) {
    for (let y = -1; y <= 1; y += 1) {
      for (let z = -1; z <= 1; z += 1) {
        const stickers = {};
        if (z === 1) stickers.front = stickerFor("front", [x, y, z]);
        if (z === -1) stickers.back = stickerFor("back", [x, y, z]);
        if (x === 1) stickers.right = stickerFor("right", [x, y, z]);
        if (x === -1) stickers.left = stickerFor("left", [x, y, z]);
        if (y === 1) stickers.top = stickerFor("top", [x, y, z]);
        if (y === -1) stickers.bottom = stickerFor("bottom", [x, y, z]);

        nextCubies.push({
          id: `cubie-${x}-${y}-${z}`,
          coord: [x, y, z],
          stickers,
        });
      }
    }
  }

  return nextCubies;
}

function cubieTransform(cubie) {
  const [x, y, z] = cubie.coord;
  return `translate3d(calc(${x} * var(--cube-step)), calc(${-y} * var(--cube-step)), calc(${z} * var(--cube-step)))`;
}

function stickerArtwork(sticker) {
  if (!sticker) return null;

  const photoSources = {
    front: "assets/reid-cube-photo-square.png",
    right: "assets/reid-cube-photo-orange.png",
    back: "assets/reid-cube-photo-blue.png",
    top: "assets/reid-cube-photo-white.png",
    left: "assets/reid-cube-photo-red.png",
    bottom: "assets/reid-cube-photo-green.png",
  };

  if (photoSources[sticker.sourceFace]) {
    const photoPositions = ["11.5%", "50%", "88.5%"];
    const column = sticker.sourceIndex % 3;
    const row = Math.floor(sticker.sourceIndex / 3);

    return {
      background: `url(${photoSources[sticker.sourceFace]}?v=final-copy-1)`,
      size: "360% 360%",
      x: photoPositions[column],
      y: photoPositions[row],
      photo: true,
      sourceFace: sticker.sourceFace,
    };
  }

  return {
    background: faceColors[sticker.sourceFace],
    size: "auto",
    x: "50%",
    y: "50%",
    photo: false,
    sourceFace: sticker.sourceFace,
  };
}

function makeCubie(cubie) {
  const node = document.createElement("div");
  node.className = "cubie";
  node.dataset.cubieId = cubie.id;
  node.style.transform = cubieTransform(cubie);

  Object.entries(sideTransforms).forEach(([side, transform]) => {
    const face = document.createElement("div");
    const sticker = cubie.stickers[side];
    const art = stickerArtwork(sticker);

    face.className = `cubie-side ${side}${art ? " has-sticker" : ""}${art?.photo ? ` photo photo-${art.sourceFace}` : ""}`;
    face.style.transform = transform;

    if (art) {
      face.style.setProperty("--sticker-bg", art.background);
      face.style.setProperty("--bg-size", art.size);
      face.style.setProperty("--bg-x", art.x);
      face.style.setProperty("--bg-y", art.y);
    }

    node.append(face);
  });

  return node;
}

function renderCube() {
  if (!rubikCube) return;
  rubikCube.innerHTML = "";
  cubies.forEach((cubie) => rubikCube.append(makeCubie(cubie)));
}

function setView() {
  if (!rubikCube) return;
  rubikCube.style.setProperty("--view-x", `${viewX}deg`);
  rubikCube.style.setProperty("--view-y", `${viewY}deg`);
}

function rotateStickerMap(stickers, axis, direction) {
  const rotated = {};

  Object.entries(stickers).forEach(([side, sticker]) => {
    const nextNormal = rotateVector(sideNormals[side], axis, direction);
    rotated[normalSides[nextNormal.join(",")]] = sticker;
  });

  return rotated;
}

function applyTurn(axis, layer, direction) {
  const axisIndex = axis === "x" ? 0 : axis === "y" ? 1 : 2;

  cubies.forEach((cubie) => {
    if (cubie.coord[axisIndex] !== layer) return;
    cubie.coord = rotateVector(cubie.coord, axis, direction);
    cubie.stickers = rotateStickerMap(cubie.stickers, axis, direction);
  });
}

function turnAxisTransform(axis, degrees) {
  if (axis === "x") return `rotateX(${degrees}deg)`;
  if (axis === "y") return `rotateY(${degrees}deg)`;
  return `rotateZ(${degrees}deg)`;
}

async function turnLayer(axis, layer, direction, animate = true, duration = 360) {
  if (!rubikCube || isTurning) return;
  isTurning = true;

  const axisIndex = axis === "x" ? 0 : axis === "y" ? 1 : 2;
  const affectedIds = new Set(
    cubies
      .filter((cubie) => cubie.coord[axisIndex] === layer)
      .map((cubie) => cubie.id),
  );

  applyTurn(axis, layer, direction);
  renderCube();

  if (animate) {
    const animations = cubies
      .filter((cubie) => affectedIds.has(cubie.id))
      .map((cubie) => {
      const node = rubikCube.querySelector(`[data-cubie-id="${cubie.id}"]`);
      if (!node) return null;

      const base = cubieTransform(cubie);
      return node.animate(
        [
          { transform: `${turnAxisTransform(axis, -90 * direction)} ${base}` },
          { transform: base },
        ],
        { duration, easing: "cubic-bezier(.2,.8,.2,1)" },
      ).finished.catch(() => undefined);
      });

    await Promise.all(animations.filter(Boolean));
  }

  isTurning = false;
}

function stopAmbientCube() {
  ambientCubeActive = false;
  if (ambientCubeFrame) cancelAnimationFrame(ambientCubeFrame);
  if (ambientCubeTimer) clearTimeout(ambientCubeTimer);
  ambientCubeFrame = 0;
  ambientCubeTimer = 0;
}

function startAmbientCube(delay = 0) {
  if (!rubikCube || ambientCubeActive) return;
  if (ambientCubeTimer) clearTimeout(ambientCubeTimer);
  ambientCubeTimer = window.setTimeout(() => {
    ambientCubeActive = true;
    runAmbientCube();
  }, delay);
}

function runAmbientCube() {
  let lastTurn = performance.now();

  const tick = async (time) => {
    if (!ambientCubeActive) return;
    viewY += 0.072;
    viewX += Math.sin(time / 1800) * 0.012;
    setView();

    if (!isTurning && time - lastTurn > 1850) {
      lastTurn = time;
      const axis = Math.random() > 0.5 ? "x" : "y";
      const layer = [-1, 0, 1][Math.floor(Math.random() * 3)];
      const direction = Math.random() > 0.5 ? 1 : -1;
      turnLayer(axis, layer, direction, true, 980).catch(() => undefined);
    }

    ambientCubeFrame = requestAnimationFrame(tick);
  };

  ambientCubeFrame = requestAnimationFrame(tick);
}

function turnFromControl(button, animate = true) {
  const controls = visibleControlAxes();

  if (button.dataset.row !== undefined) {
    const row = Number(button.dataset.row);
    const axis = axisName(controls.vertical);
    const layer = layerFromScreenRow(row, controls);
    const desiredX = button.dataset.direction === "right" ? 1 : -1;
    const direction = directionForScreenRow(row, desiredX, controls);
    return turnLayer(axis, layer, direction, animate);
  }

  if (button.dataset.col !== undefined) {
    const column = Number(button.dataset.col);
    const axis = axisName(controls.horizontal);
    const layer = layerFromScreenColumn(column, controls);
    const desiredY = button.dataset.direction === "down" ? 1 : -1;
    const direction = directionForScreenColumn(column, desiredY, controls);
    return turnLayer(axis, layer, direction, animate);
  }

  return Promise.resolve();
}

function resetCube() {
  cubies = createCubies();
  renderCube();
}

function loadDefaultScramble() {
  cubies = createCubies();
  defaultScramble.forEach(([axis, layer, direction]) => {
    applyTurn(axis, layer, direction);
  });
  renderCube();
}

async function scrambleCube() {
  if (isTurning) return;
  const controls = puzzleControls.filter((button) => button.dataset.row !== undefined || button.dataset.col !== undefined);

  for (let count = 0; count < 12; count += 1) {
    const button = controls[Math.floor(Math.random() * controls.length)];
    await turnFromControl(button, true);
  }
}

if (rubikCube) {
  loadDefaultScramble();
  setView();
  runAmbientCube();
}

if (cubeViewport) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialX = viewX;
  let initialY = viewY;

  cubeViewport.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    stopAmbientCube();
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    initialX = viewX;
    initialY = viewY;
    cubeViewport.setPointerCapture(event.pointerId);
  });

  cubeViewport.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    viewY = initialY + (event.clientX - startX) * 0.32;
    viewX = Math.max(-72, Math.min(72, initialX - (event.clientY - startY) * 0.32));
    setView();
  });

  cubeViewport.addEventListener("pointerup", (event) => {
    isDragging = false;
    cubeViewport.releasePointerCapture(event.pointerId);
  });

  cubeViewport.addEventListener("pointercancel", () => {
    isDragging = false;
  });

  cubeViewport.addEventListener("pointerenter", stopAmbientCube);
  cubeViewport.addEventListener("pointerleave", () => startAmbientCube(4500));
}

puzzleControls.forEach((button) => {
  button.addEventListener("click", () => {
    stopAmbientCube();
    turnFromControl(button);
  });
});

if (puzzleReset) {
  puzzleReset.addEventListener("click", () => {
    stopAmbientCube();
    resetCube();
  });
}

if (puzzleScramble) {
  puzzleScramble.addEventListener("click", () => {
    stopAmbientCube();
    scrambleCube();
  });
}

function updateRepinControl() {
  if (!repinBoard) return;
  repinBoard.hidden = !slips.length || !slips.every((slip) => slip.classList.contains("is-crumpled"));
}

function repinAllProjects() {
  slips.forEach((slip) => {
    slip.classList.remove("is-crumpled", "is-held", "is-active");
    slip.classList.add("is-uncrumpled");
  });
  stage?.querySelectorAll(".paper-ball").forEach((ball) => {
    stopPaperBallPhysics(ball);
    ball.remove();
  });
  if (panel) {
    panel.innerHTML = "";
    panel.classList.add("is-idle");
  }
  activeProject = null;
  updateRepinControl();
}

repinBoard?.addEventListener("click", repinAllProjects);

function closeProjectPanel() {
  slips.forEach((slip) => slip.classList.remove("is-held", "is-active"));
  if (panel) {
    panel.innerHTML = "";
    panel.classList.add("is-idle");
  }
  activeProject = null;
}

function selectProject(projectName) {
  const content = projectCopy[projectName];
  if (!content || !panel || isCrumplingPaper) return;

  activeProject = projectName;

  slips.forEach((slip) => {
    slip.classList.toggle("is-active", slip.dataset.project === projectName);
    slip.classList.toggle("is-held", slip.dataset.project === projectName);
  });

  panel.classList.remove("is-idle");
  const actionLinks = (content.actions || [])
    .map((action) => {
      const isPageAnchor = action.href.startsWith("#");
      const targetAttrs = isPageAnchor ? "" : ' target="_blank" rel="noreferrer"';
      return `<a href="${action.href}"${targetAttrs}>${action.label}</a>`;
    })
    .join("");
  panel.innerHTML = `
    <button class="panel-close" type="button" data-panel-close aria-label="Keep note pinned and close details">x</button>
    <p class="panel-kicker">${content.kicker}</p>
    <h3>${content.title}</h3>
    <p>${content.body}</p>
    <div class="paper-actions">
      <div class="project-links">${actionLinks}</div>
      <button class="crumple-button" type="button" data-crumple>crumple</button>
    </div>
  `;
}

const ballFrames = new WeakMap();

function stopPaperBallPhysics(ball) {
  const frame = ballFrames.get(ball);
  if (frame) cancelAnimationFrame(frame);
  ballFrames.delete(ball);
  ball.classList.remove("is-airborne");
  ball.dataset.velocityX = "0";
  ball.dataset.velocityY = "0";
}

function repinBallIfOverBoard(ball) {
  const projectName = ball.dataset.project;
  const board = document.querySelector(".bulletin-board");
  const slip = projectName ? slips.find((item) => item.dataset.project === projectName) : null;
  if (!board || !slip) return false;

  const ballRect = ball.getBoundingClientRect();
  const boardRect = board.getBoundingClientRect();
  const ballCenterX = ballRect.left + ballRect.width / 2;
  const ballCenterY = ballRect.top + ballRect.height / 2;
  const isOverBoard =
    ballCenterX >= boardRect.left &&
    ballCenterX <= boardRect.right &&
    ballCenterY >= boardRect.top &&
    ballCenterY <= boardRect.bottom;

  if (!isOverBoard) return false;

  stopPaperBallPhysics(ball);
  ball.remove();
  slip.classList.remove("is-crumpled", "is-held", "is-active");
  slip.classList.add("is-uncrumpled");
  updateRepinControl();
  return true;
}

function startPaperBallPhysics(ball, initialVelocityX = 0, initialVelocityY = 0) {
  if (!stage) return;
  stopPaperBallPhysics(ball);

  let x = Number.parseFloat(ball.style.left) || 0;
  let y = Number.parseFloat(ball.style.top) || 0;
  let velocityX = Math.max(-2400, Math.min(2400, initialVelocityX));
  let velocityY = Math.max(-2400, Math.min(2400, initialVelocityY));
  let rotation = Number.parseFloat(ball.dataset.rotation) || 0;
  let previousTime = performance.now();
  let lastImpactTime = 0;
  let lastBinEntryTime = 0;

  ball.classList.add("is-airborne");
  ball.dataset.velocityX = String(velocityX);
  ball.dataset.velocityY = String(velocityY);

  const tick = (time) => {
    const delta = Math.min((time - previousTime) / 1000, 0.032);
    const maxX = stage.clientWidth - ball.offsetWidth;
    let floorY = stage.clientHeight - ball.offsetHeight - 48;
    const stageRect = stage.getBoundingClientRect();
    const previousBottom = stageRect.top + y + ball.offsetHeight;
    previousTime = time;

    const queuedVelocityX = Number.parseFloat(ball.dataset.velocityX);
    const queuedVelocityY = Number.parseFloat(ball.dataset.velocityY);
    if (Number.isFinite(queuedVelocityX)) velocityX = queuedVelocityX;
    if (Number.isFinite(queuedVelocityY)) velocityY = queuedVelocityY;

    velocityY += 2500 * delta;
    x += velocityX * delta;
    y += velocityY * delta;
    rotation += velocityX * delta * 0.22;

    if (wastebin) {
      const binRect = wastebin.getBoundingClientRect();
      const openingY = binRect.top + 17;
      const bodyTop = binRect.top + 23;
      const ballLeft = stageRect.left + x;
      const ballRight = ballLeft + ball.offsetWidth;
      const ballCenterX = ballLeft + ball.offsetWidth / 2;
      const ballCenterY = stageRect.top + y + ball.offsetHeight / 2;
      const currentBottom = stageRect.top + y + ball.offsetHeight;
      const currentTop = stageRect.top + y;
      const bodyProgress = Math.max(0, Math.min(1, (ballCenterY - bodyTop) / Math.max(1, binRect.bottom - bodyTop)));
      const wallInset = binRect.width * (0.06 + bodyProgress * 0.14);
      const binLeft = binRect.left + wallInset;
      const binRight = binRect.right - wallInset;
      const openingLeft = binRect.left + binRect.width * 0.08;
      const openingRight = binRect.right - binRect.width * 0.08;
      const isWithinOpening = ballCenterX > openingLeft && ballCenterX < openingRight;
      const wasInsideBin = ball.dataset.insideBin === "true";
      const hitsRim =
        velocityY > 0 &&
        !wasInsideBin &&
        previousBottom <= openingY &&
        currentBottom >= openingY &&
        !isWithinOpening &&
        ballRight > binRect.left + binRect.width * 0.04 &&
        ballLeft < binRect.right - binRect.width * 0.04;

      if (hitsRim) {
        playImpactSound("rim");
        y = openingY - stageRect.top - ball.offsetHeight - 2;
        velocityY = -Math.max(260, Math.abs(velocityY) * 0.36);
        velocityX += ballCenterX < binRect.left + binRect.width / 2 ? -120 : 120;
      }

      if (velocityY > 0 && isWithinOpening && !wasInsideBin && previousBottom <= openingY && currentBottom >= openingY) {
        ball.dataset.insideBin = "true";
        if (time - lastBinEntryTime > 180) {
          playImpactSound("metal");
          lastBinEntryTime = time;
        }
      }

      let isInsideBin = ball.dataset.insideBin === "true";
      if (isInsideBin && currentBottom < openingY - 4 && isWithinOpening) {
        ball.dataset.insideBin = "false";
        isInsideBin = false;
      }

      if (isInsideBin) {
        floorY = Math.min(floorY, binRect.bottom - stageRect.top - ball.offsetHeight - 3);

        const innerLeft = binLeft - stageRect.left;
        const innerRight = binRight - stageRect.left - ball.offsetWidth;
        if (x < innerLeft) {
          x = innerLeft;
          velocityX = Math.abs(velocityX) * 0.16;
        } else if (x > innerRight) {
          x = innerRight;
          velocityX = -Math.abs(velocityX) * 0.16;
        }

        if (currentTop < openingY && !isWithinOpening) {
          y = openingY - stageRect.top;
          velocityY = Math.max(35, Math.abs(velocityY) * 0.18);
        }
      }

      const overlapsBinHeight = currentBottom > bodyTop && currentTop < binRect.bottom;
      const overlapsRimX = ballRight > binRect.left + binRect.width * 0.05 && ballLeft < binRect.right - binRect.width * 0.05;
      if (!isInsideBin && velocityY > 0 && overlapsRimX && !isWithinOpening && previousBottom <= openingY && currentBottom >= openingY) {
        y = openingY - stageRect.top - ball.offsetHeight;
        velocityY = -Math.abs(velocityY) * 0.2;
      } else if (!isInsideBin && overlapsBinHeight && ballRight > binLeft && ballCenterX < binRect.left + binRect.width / 2) {
        x = binLeft - stageRect.left - ball.offsetWidth;
        velocityX = -Math.max(70, Math.abs(velocityX) * 0.3);
      } else if (!isInsideBin && overlapsBinHeight && ballLeft < binRight && ballCenterX >= binRect.left + binRect.width / 2) {
        x = binRight - stageRect.left;
        velocityX = Math.max(70, Math.abs(velocityX) * 0.3);
      }
    }

    const ballRadius = ball.offsetWidth / 2;
    stage.querySelectorAll(".paper-ball").forEach((otherBall) => {
      if (otherBall === ball || otherBall.classList.contains("is-dragging")) return;

      let otherX = Number.parseFloat(otherBall.style.left) || 0;
      let otherY = Number.parseFloat(otherBall.style.top) || 0;
      const deltaX = otherX + otherBall.offsetWidth / 2 - (x + ballRadius);
      const deltaY = otherY + otherBall.offsetHeight / 2 - (y + ballRadius);
      const distance = Math.hypot(deltaX, deltaY);
      const minimumDistance = ballRadius + otherBall.offsetWidth / 2;
      if (distance <= 0 || distance >= minimumDistance) return;

      const normalX = deltaX / distance;
      const normalY = deltaY / distance;
      const overlap = minimumDistance - distance;
      x -= normalX * overlap * 0.5;
      y -= normalY * overlap * 0.5;
      otherX += normalX * overlap * 0.5;
      otherY += normalY * overlap * 0.5;
      otherBall.style.left = otherX + "px";
      otherBall.style.top = otherY + "px";

      let otherVelocityX = Number.parseFloat(otherBall.dataset.velocityX) || 0;
      let otherVelocityY = Number.parseFloat(otherBall.dataset.velocityY) || 0;
      const relativeSpeed = (otherVelocityX - velocityX) * normalX + (otherVelocityY - velocityY) * normalY;
      if (relativeSpeed < 0) {
        const impulse = (-(1 + 0.18) * relativeSpeed) / 2;
        velocityX -= impulse * normalX;
        velocityY -= impulse * normalY;
        otherVelocityX += impulse * normalX;
        otherVelocityY += impulse * normalY;
        otherBall.dataset.velocityX = String(otherVelocityX);
        otherBall.dataset.velocityY = String(otherVelocityY);

        if (!ballFrames.get(otherBall)) {
          startPaperBallPhysics(otherBall, otherVelocityX, otherVelocityY);
        }
      }
    });

    if (x <= 0 || x >= maxX) {
      x = Math.max(0, Math.min(maxX, x));
      velocityX *= -0.38;
    }

    let isOnFloor = false;
    if (y >= floorY) {
      const impactVelocity = velocityY;
      y = floorY;
      isOnFloor = true;

      if (impactVelocity > 180 && time - lastImpactTime > 180) {
        const isInsideBin = ball.dataset.insideBin === "true";
        if (!isInsideBin) {
          playImpactSound("floor");
        }
        lastImpactTime = time;
      }

      if (Math.abs(velocityY) > 90) {
        velocityY *= -0.24;
      } else {
        velocityY = 0;
      }

      velocityX *= 0.86;
    }

    ball.style.left = x + "px";
    ball.style.top = y + "px";
    ball.style.transform = "rotate(" + rotation + "deg)";
    ball.dataset.rotation = String(rotation);
    ball.dataset.velocityX = String(velocityX);
    ball.dataset.velocityY = String(velocityY);

    if (isOnFloor && velocityY === 0 && Math.abs(velocityX) < 8) {
      stopPaperBallPhysics(ball);
      return;
    }

    const frame = requestAnimationFrame(tick);
    ballFrames.set(ball, frame);
  };

  const frame = requestAnimationFrame(tick);
  ballFrames.set(ball, frame);
}

function makePaperBallDraggable(ball) {
  if (!stage) return;

  const moveBall = (left, top) => {
    const maxLeft = stage.clientWidth - ball.offsetWidth;
    const maxTop = stage.clientHeight - ball.offsetHeight - 48;
    ball.style.left = Math.max(0, Math.min(maxLeft, left)) + "px";
    ball.style.top = Math.max(0, Math.min(maxTop, top)) + "px";
  };

  ball.tabIndex = 0;
  ball.setAttribute("aria-label", "Crumpled project paper. Drag to move.");

  ball.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    stopPaperBallPhysics(ball);
    ball.dataset.insideBin = "false";
    ball.focus({ preventScroll: true });

    const startLeft = Number.parseFloat(ball.style.left) || 0;
    const startTop = Number.parseFloat(ball.style.top) || 0;
    const startX = event.clientX;
    const startY = event.clientY;
    let previousX = event.clientX;
    let previousY = event.clientY;
    let previousTime = performance.now();
    let velocityX = 0;
    let velocityY = 0;

    ball.classList.add("is-dragging");
    ball.setPointerCapture(event.pointerId);

    const move = (moveEvent) => {
      const time = performance.now();
      const delta = Math.max((time - previousTime) / 1000, 0.008);
      const sampleVelocityX = (moveEvent.clientX - previousX) / delta;
      const sampleVelocityY = (moveEvent.clientY - previousY) / delta;
      velocityX = velocityX * 0.35 + sampleVelocityX * 0.65;
      velocityY = velocityY * 0.35 + sampleVelocityY * 0.65;
      previousX = moveEvent.clientX;
      previousY = moveEvent.clientY;
      previousTime = time;

      moveBall(
        startLeft + moveEvent.clientX - startX,
        startTop + moveEvent.clientY - startY,
      );
    };

    const finish = (finishEvent) => {
      ball.classList.remove("is-dragging");
      ball.removeEventListener("pointermove", move);
      ball.removeEventListener("pointerup", finish);
      ball.removeEventListener("pointercancel", finish);
      if (repinBallIfOverBoard(ball)) return;
      startPaperBallPhysics(
        ball,
        finishEvent.type === "pointercancel" ? 0 : velocityX,
        finishEvent.type === "pointercancel" ? 0 : velocityY,
      );
    };

    ball.addEventListener("pointermove", move);
    ball.addEventListener("pointerup", finish);
    ball.addEventListener("pointercancel", finish);
  });

  ball.addEventListener("keydown", (event) => {
    const step = event.shiftKey ? 24 : 10;
    const left = Number.parseFloat(ball.style.left) || 0;
    const top = Number.parseFloat(ball.style.top) || 0;
    const movements = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const movement = movements[event.key];

    if (!movement) return;
    event.preventDefault();
    moveBall(left + movement[0], top + movement[1]);
    startPaperBallPhysics(ball, movement[0] * 14, movement[1] * 14);
  });
}

function makeWastebinDraggable() {
  if (!wastebin || !stage) return;

  let currentX = 0;
  let currentY = 0;
  let rotation = 0;
  let velocityX = 0;
  let velocityY = 0;
  let angularVelocity = 0;
  let physicsFrame = 0;
  let lastBinFloorImpact = 0;

  const moveBin = (x, y, angle = rotation) => {
    const maxX = Math.max(0, (stage.clientWidth - wastebin.offsetWidth) / 2);
    const previousX = currentX;
    const previousY = currentY;
    currentX = Math.max(-maxX, Math.min(maxX, x));
    currentY = Math.max(-320, Math.min(0, y));
    rotation = Math.max(-24, Math.min(24, angle));
    wastebin.style.setProperty("--bin-x", currentX + "px");
    wastebin.style.setProperty("--bin-y", currentY + "px");
    wastebin.style.setProperty("--bin-rotation", rotation + "deg");

    const travelX = currentX - previousX;
    const travelY = currentY - previousY;
    if (travelX !== 0 || travelY !== 0) {
      stage.querySelectorAll('.paper-ball[data-inside-bin="true"]').forEach((ball) => {
        const ballX = Number.parseFloat(ball.style.left) || 0;
        const ballY = Number.parseFloat(ball.style.top) || 0;
        ball.style.left = ballX + travelX + "px";
        ball.style.top = ballY + travelY + "px";
      });
    }
  };

  const wakePaperBalls = () => {
    stage.querySelectorAll(".paper-ball").forEach((ball) => {
      if (!ballFrames.get(ball) && !ball.classList.contains("is-dragging")) {
        startPaperBallPhysics(ball, 0, 0);
      }
    });
  };

  const stopBinPhysics = () => {
    if (physicsFrame) cancelAnimationFrame(physicsFrame);
    physicsFrame = 0;
  };

  const startBinPhysics = () => {
    stopBinPhysics();
    let previousTime = performance.now();

    const tick = (time) => {
      const delta = Math.min((time - previousTime) / 1000, 0.032);
      const maxX = Math.max(0, (stage.clientWidth - wastebin.offsetWidth) / 2);
      previousTime = time;

      velocityY += 1800 * delta;
      let nextX = currentX + velocityX * delta;
      let nextY = currentY + velocityY * delta;
      angularVelocity += -rotation * 18 * delta;
      angularVelocity *= Math.pow(0.06, delta);
      rotation += angularVelocity * delta;

      if (nextX <= -maxX || nextX >= maxX) {
        nextX = Math.max(-maxX, Math.min(maxX, nextX));
        velocityX *= -0.22;
      }

      let onFloor = false;
      if (nextY >= 0) {
        const impactVelocity = velocityY;
        nextY = 0;
        onFloor = true;
        if (impactVelocity > 140 && time - lastBinFloorImpact > 220) {
          playImpactSound("binDrop");
          lastBinFloorImpact = time;
        }
        velocityY = Math.abs(velocityY) > 80 ? -Math.abs(velocityY) * 0.08 : 0;
        velocityX *= 0.78;
        angularVelocity *= 0.62;
      }

      moveBin(nextX, nextY, rotation);
      wakePaperBalls();

      if (onFloor && velocityY === 0 && Math.abs(velocityX) < 5 && Math.abs(rotation) < 0.25 && Math.abs(angularVelocity) < 0.5) {
        moveBin(currentX, 0, 0);
        velocityX = 0;
        angularVelocity = 0;
        physicsFrame = 0;
        return;
      }

      physicsFrame = requestAnimationFrame(tick);
    };

    physicsFrame = requestAnimationFrame(tick);
  };

  wastebin.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    stopBinPhysics();
    wastebin.focus({ preventScroll: true });

    const rimRect = event.target.getBoundingClientRect();
    const grabRatio = (event.clientX - rimRect.left) / rimRect.width;
    const grabSide = grabRatio < 0.36 ? -1 : grabRatio > 0.64 ? 1 : 0;
    const startX = event.clientX;
    const startY = event.clientY;
    const initialX = currentX;
    const initialY = currentY;
    const initialRotation = rotation;
    let previousX = event.clientX;
    let previousY = event.clientY;
    let previousRotation = rotation;
    let previousTime = performance.now();

    wastebin.style.setProperty(
      "--bin-origin",
      grabSide < 0 ? "5% 17px" : grabSide > 0 ? "95% 17px" : "50% 17px",
    );
    wastebin.classList.add("is-dragging");
    wastebin.setPointerCapture(event.pointerId);

    const move = (moveEvent) => {
      const time = performance.now();
      const delta = Math.max((time - previousTime) / 1000, 0.008);
      const sampleVelocityX = (moveEvent.clientX - previousX) / delta;
      const sampleVelocityY = (moveEvent.clientY - previousY) / delta;
      velocityX = velocityX * 0.35 + sampleVelocityX * 0.65;
      velocityY = velocityY * 0.35 + sampleVelocityY * 0.65;

      const dragX = moveEvent.clientX - startX;
      const dragY = moveEvent.clientY - startY;
      const swing = grabSide === 0 ? 0 : grabSide * dragY * 0.06 + velocityX * 0.012;
      moveBin(
        initialX + dragX,
        initialY + dragY,
        initialRotation + swing,
      );
      angularVelocity = (rotation - previousRotation) / delta;
      previousX = moveEvent.clientX;
      previousY = moveEvent.clientY;
      previousRotation = rotation;
      previousTime = time;
      wakePaperBalls();
    };

    const finish = (finishEvent) => {
      wastebin.classList.remove("is-dragging");
      wastebin.removeEventListener("pointermove", move);
      wastebin.removeEventListener("pointerup", finish);
      wastebin.removeEventListener("pointercancel", finish);
      if (finishEvent.type === "pointercancel") {
        velocityX = 0;
        velocityY = 0;
        angularVelocity = 0;
      }
      startBinPhysics();
    };

    wastebin.addEventListener("pointermove", move);
    wastebin.addEventListener("pointerup", finish);
    wastebin.addEventListener("pointercancel", finish);
  });

  wastebin.addEventListener("keydown", (event) => {
    const step = event.shiftKey ? 24 : 10;
    const directions = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const direction = directions[event.key];
    if (!direction) return;

    event.preventDefault();
    stopBinPhysics();
    moveBin(currentX + direction[0], currentY + direction[1], rotation);
    velocityX = direction[0] * 12;
    velocityY = direction[1] * 12;
    startBinPhysics();
  });
}

makeWastebinDraggable();

async function crumpleProject() {
  if (!panel || !stage || !activeProject || isCrumplingPaper) return;
  isCrumplingPaper = true;
  playCrumpleSound();

  const selectedSlip = slips.find((slip) => slip.dataset.project === activeProject);
  const panelRect = panel.getBoundingClientRect();
  const sourceRect = selectedSlip?.getBoundingClientRect() || panelRect;
  const stageRect = stage.getBoundingClientRect();
  const ballSize = 68;
  const startLeft = sourceRect.left + sourceRect.width / 2 - ballSize / 2;
  const startTop = sourceRect.top + sourceRect.height / 2 - ballSize / 2;
  const flight = (selectedSlip || panel).cloneNode(true);
  const sourceRotation = selectedSlip
    ? getComputedStyle(selectedSlip).getPropertyValue("--r").trim() || "0deg"
    : "0deg";
  const paperColor = selectedSlip
    ? getComputedStyle(selectedSlip).getPropertyValue("--accent").trim() || "#fffef9"
    : "#fffef9";

  flight.classList.remove("is-idle", "is-active", "is-held", "is-crumpled");
  flight.classList.add("paper-flight");
  flight.removeAttribute("data-project-panel");
  flight.removeAttribute("data-project");
  flight.removeAttribute("type");
  flight.setAttribute("aria-hidden", "true");
  Object.assign(flight.style, {
    left: `${sourceRect.left}px`,
    top: `${sourceRect.top}px`,
    width: `${sourceRect.width}px`,
    height: `${sourceRect.height}px`,
    minHeight: "0px",
    transform: `rotate(${sourceRotation})`,
  });
  document.body.append(flight);

  panel.classList.add("is-idle");
  selectedSlip?.classList.remove("is-active", "is-held", "is-uncrumpled");
  selectedSlip?.classList.add("is-crumpled");
  updateRepinControl();

  await flight.animate(
    [
      {
        left: `${sourceRect.left}px`,
        top: `${sourceRect.top}px`,
        width: `${sourceRect.width}px`,
        height: `${sourceRect.height}px`,
        borderRadius: "0%",
        padding: "20px 14px 14px",
        transform: `rotate(${sourceRotation})`,
      },
      {
        left: `${startLeft}px`,
        top: `${startTop}px`,
        width: `${ballSize}px`,
        height: `${ballSize}px`,
        borderRadius: "48%",
        padding: "0px",
        transform: "rotate(24deg)",
      },
      {
        left: `${startLeft}px`,
        top: `${startTop}px`,
        width: `${ballSize}px`,
        height: `${ballSize}px`,
        borderRadius: "52%",
        padding: "0px",
        transform: "rotate(-18deg) scale(0.92)",
      },
    ],
    { duration: 460, easing: "cubic-bezier(.68,-0.25,.32,1.25)", fill: "forwards" },
  ).finished.catch(() => undefined);

  flight.remove();

  const ball = document.createElement("div");
  ball.className = "paper-ball";
  ball.dataset.project = activeProject;
  ball.style.setProperty("--paper-color", paperColor);

  const startX = Math.max(0, Math.min(stage.clientWidth - ballSize, startLeft - stageRect.left));
  const startY = Math.max(0, Math.min(stage.clientHeight - ballSize - 48, startTop - stageRect.top));

  ball.style.left = `${startX}px`;
  ball.style.top = `${startY}px`;
  ball.style.transform = "rotate(24deg)";
  ball.dataset.rotation = "24";
  stage.append(ball);
  makePaperBallDraggable(ball);
  startPaperBallPhysics(ball, (Math.random() - 0.5) * 28, 20);

  panel.innerHTML = "";
  activeProject = null;
  isCrumplingPaper = false;
  updateRepinControl();
}

if (panel) {
  panel.addEventListener("click", (event) => {
    if (event.target.closest("[data-panel-close]")) {
      closeProjectPanel();
      return;
    }
    if (event.target.closest("[data-crumple]")) {
      crumpleProject();
    }
  });
}

if (stage && cup) {
  stage.addEventListener("pointermove", (event) => {
    if (wastebin?.classList.contains("is-dragging")) return;
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    cup.style.setProperty("--tilt-x", `${x * 8}deg`);
    cup.style.setProperty("--tilt-y", `${y * -8}deg`);
  });

  stage.addEventListener("pointerleave", () => {
    cup.style.setProperty("--tilt-x", "0deg");
    cup.style.setProperty("--tilt-y", "0deg");
  });
}

slips.forEach((slip) => {
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let moved = false;

  slip.addEventListener("click", () => {
    if (!moved) selectProject(slip.dataset.project);
  });

  slip.addEventListener("pointerdown", (event) => {
    startX = event.clientX - currentX;
    startY = event.clientY - currentY;
    moved = false;
    slip.classList.add("is-dragging");
    slip.setPointerCapture(event.pointerId);
  });

  slip.addEventListener("pointermove", (event) => {
    if (!slip.classList.contains("is-dragging")) return;

    currentX = event.clientX - startX;
    currentY = event.clientY - startY;
    moved = Math.abs(currentX) + Math.abs(currentY) > 6;
    slip.style.setProperty("--drag-x", `${currentX}px`);
    slip.style.setProperty("--drag-y", `${currentY}px`);
  });

  slip.addEventListener("pointerup", (event) => {
    slip.classList.remove("is-dragging");
    slip.releasePointerCapture(event.pointerId);

    if (!moved) {
      selectProject(slip.dataset.project);
    }

    window.setTimeout(() => {
      moved = false;
    }, 0);
  });

  slip.addEventListener("pointercancel", () => {
    slip.classList.remove("is-dragging");
  });
});

if (emailButton) {
  const originalText = emailButton.textContent;

  emailButton.addEventListener("click", async () => {
    const email = emailButton.dataset.copyEmail;

    try {
      await navigator.clipboard.writeText(email);
      emailButton.textContent = "copied";
    } catch {
      window.location.href = `mailto:${email}`;
    }

    window.setTimeout(() => {
      emailButton.textContent = originalText;
    }, 1600);
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = encodeURIComponent(`Website note from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    if (formStatus) formStatus.textContent = "Opening your email app...";
    window.location.href = `mailto:reid.castillo@ufl.edu?subject=${subject}&body=${body}`;
  });
}
