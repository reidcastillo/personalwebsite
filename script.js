const projectCopy = {
  launch: {
    kicker: "01 / Launch Page",
    title: "Make the first impression do actual work.",
    body:
      "A sharp personal homepage that tells people who you are, what you make, and where to go next without feeling like a resume template.",
  },
  system: {
    kicker: "02 / Tiny System",
    title: "Turn scattered ideas into one little operating system.",
    body:
      "A lightweight dashboard for notes, links, reminders, and project status. Small enough to use every day, structured enough to matter.",
  },
  tool: {
    kicker: "03 / Work Tool",
    title: "Build the boring helper that saves the whole afternoon.",
    body:
      "A practical internal tool concept: clean inputs, instant feedback, and a playful surface that makes repeat work feel less heavy.",
  },
  archive: {
    kicker: "04 / Archive",
    title: "Keep experiments visible instead of hiding them in folders.",
    body:
      "A living shelf for sketches, prototypes, tiny apps, visual studies, and the half-finished sparks that deserve a second look.",
  },
};

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
const stage = document.querySelector("[data-stage]");
const panel = document.querySelector("[data-project-panel]");
const slips = [...document.querySelectorAll(".project-slip")];
const emailButton = document.querySelector("[data-copy-email]");

let cubies = [];
let isTurning = false;
let viewX = -24;
let viewY = -34;

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

  if (sticker.sourceFace === "front") {
    const photoPositions = ["11.5%", "50%", "88.5%"];
    const column = sticker.sourceIndex % 3;
    const row = Math.floor(sticker.sourceIndex / 3);

    return {
      background: "url(assets/reid-cube-photo-square.png)",
      size: "360% 360%",
      x: photoPositions[column],
      y: photoPositions[row],
      photo: true,
    };
  }

  return {
    background: faceColors[sticker.sourceFace],
    size: "auto",
    x: "50%",
    y: "50%",
    photo: false,
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

    face.className = `cubie-side ${side}${art ? " has-sticker" : ""}${art?.photo ? " photo" : ""}`;
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

async function turnLayer(axis, layer, direction, animate = true) {
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
        { duration: 360, easing: "cubic-bezier(.2,.8,.2,1)" },
      ).finished.catch(() => undefined);
      });

    await Promise.all(animations.filter(Boolean));
  }

  isTurning = false;
}

function turnFromControl(button, animate = true) {
  if (button.dataset.row !== undefined) {
    const row = Number(button.dataset.row);
    const layer = 1 - row;
    const direction = button.dataset.direction === "right" ? 1 : -1;
    return turnLayer("y", layer, direction, animate);
  }

  if (button.dataset.col !== undefined) {
    const column = Number(button.dataset.col);
    const layer = column - 1;
    const direction = button.dataset.direction === "down" ? 1 : -1;
    return turnLayer("x", layer, direction, animate);
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
}

if (cubeViewport) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialX = viewX;
  let initialY = viewY;

  cubeViewport.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
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
}

puzzleControls.forEach((button) => {
  button.addEventListener("click", () => turnFromControl(button));
});

if (puzzleReset) {
  puzzleReset.addEventListener("click", resetCube);
}

if (puzzleScramble) {
  puzzleScramble.addEventListener("click", scrambleCube);
}

function selectProject(projectName) {
  const content = projectCopy[projectName];
  if (!content || !panel) return;

  slips.forEach((slip) => {
    slip.classList.toggle("is-active", slip.dataset.project === projectName);
  });

  panel.innerHTML = `
    <p class="panel-kicker">${content.kicker}</p>
    <h3>${content.title}</h3>
    <p>${content.body}</p>
    <a href="#contact">talk about this</a>
  `;
}

if (stage && cup) {
  stage.addEventListener("pointermove", (event) => {
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
