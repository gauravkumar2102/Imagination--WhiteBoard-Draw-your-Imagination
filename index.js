// ============================================
// ========== CANVAS & CONTAINER SETUP ==========
// ============================================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const container = document.getElementById("board-container");

canvas.width = 3000;
canvas.height = 3000;
container.scrollLeft = (canvas.width - container.clientWidth) / 2;
container.scrollTop = (canvas.height - container.clientHeight) / 2;

// ============================================
// ========== GENERAL STATE VARIABLES ==========
// ============================================
let currentMode = "text";
let isDrawing = false;
let undoStack = [];
let redoStack = [];

// ============================================
// ========== RECTANGLE VARIABLES ==========
// ============================================
let rectangles = [];
let selectedRect = null;
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let RectangleSelected = false;
let startX = 0;
let startY = 0;

// ============================================
// ========== PENCIL/STROKE VARIABLES ==========
// ============================================
let strokes = [];
let currentStroke = null;
let pencilSize = 2;
let lastX = 0;
let lastY = 0;
let isPencilDrawing = false;
let pencilSelected = false;
let brushType = "pen"; 
let smoothness = 0.5;


// ============================================
// ========== ERASER VARIABLES ==========
// ============================================
let eraseSelected = false;

// ============================================
// ========== TEXT VARIABLES ==========
// ============================================
let texts = [];
let textSelected = false;
let isTyping = false;
let currentText = "";
let textX = 0;
let textY = 0;
let fontSize = 20;
let fontFamily = "Arial";
let selectedText = null;
let isDraggingText = false;
let textDragOffsetX = 0;
let textDragOffsetY = 0;
let isEditingText = false;
let editingTextObj = null;
let cursorIndex = 0;
let showCaret = true;
let liveTextObj = null;

// ============================================
// ========== CIRCLE VARIABLES ==========
// ============================================
let circles = [];
let selectedCircle = null;
let isDraggingCircle = false;
let circleDragOffsetX = 0;
let circleDragOffsetY = 0;
let CircleSelected = false;

// ============================================
// ========== ARROW/LINE VARIABLES ==========
// ============================================
let arrows = [];
let ArrowSelected = false;
let selectedArrow = null;
let isDraggingArrow = false;
let arrowDragOffsetX = 0;
let arrowDragOffsetY = 0;

// ============================================
// ========== MOVE MODE VARIABLES ==========
// ============================================
let MoveSelected = false;

// ============================================
// ========== COLOR VARIABLES ==========
// ============================================
let colorPicker = document.getElementById("colorPicker");
let color =  "rgb(157, 213, 14)";

colorPicker.addEventListener("change", (e) => {
  color = e.target.value;
});

// ============================================
// ========== DOM BUTTON ELEMENTS ==========
// ============================================
let rectangle = document.getElementById("drawBtn");
let move = document.getElementById("moveBtn");
let pencil = document.getElementById("pencilBtn");
let listPencil = document.getElementById("pencil");
let eraser = document.getElementById("eraser");
let eraseId = document.getElementById("eraseId");
let textBtn = document.getElementById("textBtn");
let listText = document.getElementById("listText");
let circleBtn = document.getElementById("circleBtn");
let arrowBtn = document.getElementById("arrowBtn");
let arrowList = document.getElementById("arrowList");
const pdfBtn = document.getElementById("pdfBtn");

// ============================================
// ========== EVENT LISTENERS ==========
// ============================================

// ---- Rectangle Button Click ----
rectangle.addEventListener("click", () => {
  if (!RectangleSelected) {
    currentMode = "rect";
    rectangle.classList.remove("fa-regular");
    rectangle.classList.add("fa-solid");
    move.classList.remove("fa-solid");
    move.classList.add("fa-regular");
    listPencil.classList.remove("penc")
    pencilSelected = false;
    MoveSelected = false;
    canvas.classList.remove("penci");
    RectangleSelected = true;

    canvas.classList.remove("move");
    eraseSelected = false;
    canvas.classList.remove("erase");
    eraseId.classList.remove("listErase");
    textSelected = false;
    canvas.classList.remove("textCursor");
    listText.classList.remove("penc");
    circleBtn.classList.remove("fa-solid");
    circleBtn.classList.add("fa-regular");
    CircleSelected = false;
    ArrowSelected = false;
    arrowList.classList.remove("penc");
    finishTextEditing();
  }
  else if (RectangleSelected) {
    currentMode = "pencil";
    rectangle.classList.remove("fa-solid");
    rectangle.classList.add("fa-regular");
    listPencil.classList.add("penc")
    pencilSelected = true;
    canvas.classList.add("penci");

    RectangleSelected = false;
    canvas.classList.add("penci")
  }
});

// ---- Move Button Click ----
move.addEventListener("click", () => {
  if (!MoveSelected) {
    currentMode = "move";
    move.classList.remove("fa-regular");
    move.classList.add("fa-solid");
    rectangle.classList.remove("fa-solid");
    rectangle.classList.add("fa-regular");
    listPencil.classList.remove("penc")
    pencilSelected = false;
    canvas.classList.remove("penci");
    RectangleSelected = false;
    MoveSelected = true;
    canvas.classList.add("move");
    eraseSelected = false;
    canvas.classList.remove("erase");
    eraseId.classList.remove("listErase");
    textSelected = false;
    canvas.classList.remove("textCursor");
    listText.classList.remove("penc");
    circleBtn.classList.remove("fa-solid");
    circleBtn.classList.add("fa-regular");
    CircleSelected = false;
    ArrowSelected = false;
    arrowList.classList.remove("penc");
    finishTextEditing();
  }
  else if (MoveSelected) {
    currentMode = "pencil";
    move.classList.remove("fa-solid");
    move.classList.add("fa-regular");
    listPencil.classList.add("penc")
    pencilSelected = true;
    canvas.classList.add("penci");
    MoveSelected = false;
    canvas.classList.remove("move")
  }
});

// ---- Pencil Button Click ----
pencil.addEventListener('click', (e) => {
  if (!pencilSelected) {
    console.log(pencil);
    currentMode = "pencil";
    pencil.classList.add("fa-solid");
    pencilSelected = true;
    rectangle.classList.remove("fa-solid");
    rectangle.classList.add("fa-regular");
    move.classList.remove("fa-solid");
    move.classList.add("fa-regular");
    listPencil.classList.add("penc")
    canvas.classList.add("penci");
    eraseSelected = false;
    RectangleSelected = false;
    MoveSelected = false;
    canvas.classList.remove("move");
    canvas.classList.remove("erase");
    eraseId.classList.remove("listErase");
    textSelected = false;
    canvas.classList.remove("textCursor");
    circleBtn.classList.remove("fa-solid");
    circleBtn.classList.add("fa-regular");
    CircleSelected = false;
    ArrowSelected = false;
    arrowList.classList.remove("penc");
    finishTextEditing();
    listText.classList.remove("penc");
  }
  else if (pencilSelected) {
    currentMode = "text";
    listPencil.classList.remove("penc")
    pencilSelected = false;
    canvas.classList.remove("penci")
    listText.classList.add("penc");
    textSelected = true;
    canvas.classList.add("textCursor");
  }
})

// ================ Pencil Options Hover ============
const pencilOptions = document.getElementById("colorPencil");
const pencilSizeInput = document.getElementById("pencilSize");
const pencilSizeValue = document.getElementById("pencilSizeValue");
const brushTypeSelect = document.getElementById("brushType");
const smoothnessRange = document.getElementById("smoothnessRange");
const smoothvalue = document.getElementById("smoothvalue");

pencil.addEventListener("mouseenter", () => {
  if (pencilSelected) {
    pencilOptions.style.display = "block";
  }
});

pencilSizeInput.addEventListener("input", () => {
  pencilSize = parseInt(pencilSizeInput.value);
  pencilSizeValue.innerText = pencilSize;
});


colorPencil.addEventListener("mouseleave", () => {
  pencilOptions.style.display = "none";
});



brushTypeSelect.addEventListener("change", () => {
  brushType = brushTypeSelect.value;
});

smoothnessRange.addEventListener("input", () => {
  smoothness = parseInt(smoothnessRange.value) / 100;
  smoothvalue.innerText = smoothness.toFixed(2);
});




// ---- Eraser Button Click ----
eraser.addEventListener('click', (e) => {
  if (!eraseSelected) {
    console.log(eraser);
    currentMode = "eraser";
    rectangle.classList.remove("fa-solid");
    rectangle.classList.add("fa-regular");
    move.classList.remove("fa-solid");
    move.classList.add("fa-regular");
    listPencil.classList.remove("penc")
    pencilSelected = false;
    canvas.classList.remove("penci")
    RectangleSelected = false;
    MoveSelected = false;
    canvas.classList.remove("move")
    eraseSelected = true;
    canvas.classList.add("erase");
    eraseId.classList.add("listErase");
    textSelected = false;
    canvas.classList.remove("textCursor");
    listText.classList.remove("penc");
    circleBtn.classList.remove("fa-solid");
    circleBtn.classList.add("fa-regular");
    CircleSelected = false;
    ArrowSelected = false;
    arrowList.classList.remove("penc");
    finishTextEditing();
  }
  else {
    currentMode = "pencil";
    listPencil.classList.add("penc")
    pencilSelected = true;
    canvas.classList.add("penci");
    canvas.classList.remove("erase");
    eraseSelected = false;
    eraseId.classList.remove("listErase");
  }
})

// ---- Text Button Click ----
listText.classList.add("penc");
textBtn.addEventListener("click", () => {
  if (!textSelected) {
    currentMode = "text";
    textSelected = true;
    listText.classList.add("penc");
    rectangle.classList.remove("fa-solid");
    rectangle.classList.add("fa-regular");
    move.classList.remove("fa-solid");
    move.classList.add("fa-regular");
    listPencil.classList.remove("penc");
    pencilSelected = false;
    canvas.classList.remove("penci");
    RectangleSelected = false;
    MoveSelected = false;
    canvas.classList.remove("move");
    eraseSelected = false;
    canvas.classList.remove("erase");
    eraseId.classList.remove("listErase");
    canvas.classList.add("textCursor");
    circleBtn.classList.remove("fa-solid");
    circleBtn.classList.add("fa-regular");
    CircleSelected = false;

  } else {
    listText.classList.remove("penc");
    textSelected = false;
    currentMode = "pencil";
    pencilSelected = true;
    canvas.classList.add("penci");
    canvas.classList.remove("textCursor");
  }
});

// ---- Circle Button Click ----
circleBtn.addEventListener("click", () => {
  if (!CircleSelected) {
    currentMode = "circle";
    CircleSelected = true;
    circleBtn.classList.remove("fa-regular");
    circleBtn.classList.add("fa-solid");
    listText.classList.remove("penc");
    textSelected = false;
    pencilSelected = false;
    MoveSelected = false;
    RectangleSelected = false;
    eraseSelected = false;
    canvas.classList.remove("move");
    canvas.classList.remove("erase");
    eraseId.classList.remove("listErase");
    canvas.classList.remove("penci");
    move.classList.remove("fa-solid");
    move.classList.add("fa-regular");
    rectangle.classList.remove("fa-solid");
    rectangle.classList.add("fa-regular");
    listPencil.classList.remove("penc");
    canvas.classList.remove("move");
    eraseSelected = false;
    canvas.classList.remove("erase");
    eraseId.classList.remove("listErase");
    ArrowSelected = false;
    arrowList.classList.remove("penc");
    canvas.classList.remove("textCursor");
    finishTextEditing();
  } else {
    currentMode = "text";
    CircleSelected = false;
    circleBtn.classList.remove("fa-solid");
    circleBtn.classList.add("fa-regular");
    listText.classList.add("penc");
    textSelected = true;
    canvas.classList.add("textCursor");
  }
});

// ---- Arrow Button Click ----
arrowBtn.addEventListener("click", () => {
  if (!ArrowSelected) {
    currentMode = "arrow";
    ArrowSelected = true;
    arrowList.classList.add("penc");
    
    // turn off others
    CircleSelected = false;
    RectangleSelected = false;
    MoveSelected = false;
    pencilSelected = false;
    eraseSelected = false;
    textSelected = false;
    circleBtn.classList.remove("fa-solid");
    circleBtn.classList.add("fa-regular");
    rectangle.classList.remove("fa-solid");
    rectangle.classList.add("fa-regular");
    move.classList.remove("fa-solid");
    move.classList.add("fa-regular");
    listPencil.classList.remove("penc");
    canvas.classList.remove("penci");
    canvas.classList.remove("move");
    canvas.classList.remove("erase");
    canvas.classList.remove("textCursor");
    eraseId.classList.remove("listErase");
    listText.classList.remove("penc");
    finishTextEditing();

  } else {
    ArrowSelected = false;
    arrowList.classList.remove("penc");
    textSelected = true;
    canvas.classList.add("textCursor");
    listText.classList.add("penc"); 
    currentMode = "text";
  }
});

// ---- PDF Export Button Click ----
pdfBtn.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("l", "px", [canvas.width, canvas.height]);
  const imgData = canvas.toDataURL("image/png");
  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save("whiteboard.pdf");
});

// ---- Keyboard Events for Undo/Redo ----
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "z") {
    e.preventDefault();
    undo();
  }

  if (e.ctrlKey && (e.key === "y" || (e.shiftKey && e.key === "Z"))) {
    e.preventDefault();
    redo();
  }
});

// ---- Keyboard Events for Text Typing ----
document.addEventListener("keydown", (e) => {
  if (e.key === " " || e.code === "Space") {
    e.preventDefault();
  }

  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
  }

  if (e.key === "Backspace") {
    if (cursorIndex > 0) {
      currentText =
        currentText.slice(0, cursorIndex - 1) +
        currentText.slice(cursorIndex);
      cursorIndex--;
    }

    liveTextObj.text = currentText;

    redrawCanvas();
    drawTextPreview();
    return;
  }

  if (e.key === "Delete") {
    if (cursorIndex < currentText.length) {
      currentText =
        currentText.slice(0, cursorIndex) +
        currentText.slice(cursorIndex + 1);
    }

    liveTextObj.text = currentText;

    redrawCanvas();
    drawTextPreview();
    return;
  }

  if (e.key === "ArrowLeft") {
    if (cursorIndex > 0) cursorIndex--;
    redrawCanvas();
    drawTextPreview();
    return;
  }

  if (e.key === "ArrowRight") {
    if (cursorIndex < currentText.length) cursorIndex++;
    redrawCanvas();
    drawTextPreview();
    return;
  }

  if (e.key.length === 1) {
    currentText =
      currentText.slice(0, cursorIndex) +
      e.key +
      currentText.slice(cursorIndex);

    cursorIndex++;

    liveTextObj.text = currentText;

    redrawCanvas();
    drawTextPreview();
  }
});

// ---- Canvas Click Events ----
canvas.addEventListener("click", (e) => {
  if (currentMode !== "text") return;

  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  const t = getTextAt(mouseX, mouseY);
  if (!t) return;

  isTyping = true;
  isEditingText = true;
  editingTextObj = t;

  currentText = t.text;
  textX = t.x;
  textY = t.y;

  liveTextObj = t;

  cursorIndex = getCharIndexAt(t, mouseX);

  redrawCanvas();
  drawTextPreview();
});

// ---- Canvas Mouse Down ----
canvas.addEventListener("mousedown", (e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  // Text Mode
  if (currentMode === "text") {

    const clickedText = getTextAt(mouseX, mouseY);

    // If already typing and clicked same text → move cursor
    if (isTyping && clickedText === liveTextObj) {
      cursorIndex = getCharIndexAt(
        { text: currentText, x: textX, y: textY, size: fontSize, font: fontFamily },
        mouseX
      );
      redrawCanvas();
      return;
    }

    // Clicked on existing text → start editing
    if (!isTyping && clickedText) {
      isTyping = true;

      liveTextObj = clickedText;

      currentText = clickedText.text;
      textX = clickedText.x;
      textY = clickedText.y;

      cursorIndex = getCharIndexAt(clickedText, mouseX);

      redrawCanvas();
      return;
    }

    //Clicked empty area → create new text
    if (!clickedText) {
      textX = mouseX;
      textY = mouseY;
      isTyping = true;
      currentText = "";
      cursorIndex = 0;

      liveTextObj = {
        x: textX,
        y: textY,
        text: "",
        color: color,
        size: fontSize,
        font: fontFamily
      };

      texts.push(liveTextObj);

      redrawCanvas();
      return;
    }
  }


  // Eraser Mode
  if (currentMode === "eraser") {
    eraseAt(mouseX, mouseY);
    return;
  }

  // MOVE MODE
  if (currentMode === "move") {

  // TEXT
  const clickedText = getTextAt(mouseX, mouseY);
  if (clickedText) {
    selectedText = clickedText;
    isDraggingText = true;
    textDragOffsetX = mouseX - clickedText.x;
    textDragOffsetY = mouseY - clickedText.y;
    return;
  }

  // CIRCLE
  for (let i = circles.length - 1; i >= 0; i--) {
    const c = circles[i];
    if (isPointInEllipse(mouseX, mouseY, c)) {
      selectedCircle = c;
      isDraggingCircle = true;
      circleDragOffsetX = mouseX - c.cx;
      circleDragOffsetY = mouseY - c.cy;
      return;
    }
  }
   
  //  ARROW (line)
  for (let i = arrows.length - 1; i >= 0; i--) {
    const l = arrows[i];
    if (isPointNearLine(mouseX, mouseY, l.x1, l.y1, l.x2, l.y2)) {
      selectedArrow = l;
      isDraggingArrow = true;
      arrowDragOffsetX = mouseX - l.x1;
      arrowDragOffsetY = mouseY - l.y1;
      return;
    }
  }

  // RECTANGLE
  for (let i = rectangles.length - 1; i >= 0; i--) {
    const r = rectangles[i];
    if (
      mouseX >= r.x &&
      mouseX <= r.x + r.width &&
      mouseY >= r.y &&
      mouseY <= r.y + r.height
    ) {
      selectedRect = r;
      isDragging = true;
      dragOffsetX = mouseX - r.x;
      dragOffsetY = mouseY - r.y;
      return;
    }
  }

  return;
}

  //  pencil mode
  if (currentMode === "pencil") {
    isPencilDrawing = true;
   currentStroke = { 
  color, 
  size: pencilSize,
  brush: brushType,
  smooth: smoothness,
  points: [{ x: mouseX, y: mouseY }] 
};


    strokes.push(currentStroke);
    lastX = mouseX;
    lastY = mouseY;
    return;
  }

  if (currentMode == "rect") {
    isDrawing = true;
    startX = mouseX;
    startY = mouseY;
  }

  if (currentMode == "circle") {
    isDrawing = true;
    startX = mouseX;
    startY = mouseY;
  }

  if (currentMode === "arrow") {
    isDrawing = true;
    startX = mouseX;
    startY = mouseY;
  }
});

// ---- Canvas Mouse Move ----
canvas.addEventListener("mousemove", (e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  // MOVE MODE
  if (isDraggingText && selectedText) {
    selectedText.x = mouseX - textDragOffsetX;
    selectedText.y = mouseY - textDragOffsetY;
    redrawCanvas();
    return;
  }

  if (currentMode === "move" && isDragging && selectedRect) {
    selectedRect.x = mouseX - dragOffsetX;
    selectedRect.y = mouseY - dragOffsetY;
    redrawCanvas();
    return;
  }

  if (isDraggingCircle && selectedCircle) {
    selectedCircle.cx = mouseX - circleDragOffsetX;
    selectedCircle.cy = mouseY - circleDragOffsetY;
    redrawCanvas();
    return;
  }

  if (isDraggingArrow && selectedArrow) {
    const newX1 = mouseX - arrowDragOffsetX;
    const newY1 = mouseY - arrowDragOffsetY;

    const dx = selectedArrow.x2 - selectedArrow.x1;
    const dy = selectedArrow.y2 - selectedArrow.y1;

    selectedArrow.x1 = newX1;
    selectedArrow.y1 = newY1;
    selectedArrow.x2 = newX1 + dx;
    selectedArrow.y2 = newY1 + dy;

    redrawCanvas();
    return;
  }

  // DRAW MODE
  if (currentMode === "rect" && isDrawing) {
    redrawCanvas();

    const x = Math.min(startX, mouseX);
    const y = Math.min(startY, mouseY);
    const width = Math.abs(mouseX - startX);
    const height = Math.abs(mouseY - startY);

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
  }

  // PENCIL DRAWING
  if (currentMode === "pencil" && isPencilDrawing) {
    currentStroke.points.push({ x: mouseX, y: mouseY });
    redrawCanvas();
  }

  if (currentMode === "eraser" && e.buttons === 1) {
    eraseAt(mouseX, mouseY); // drag erase
    return;
  }

  if (currentMode === "circle" && isDrawing) {
    redrawCanvas();

    const cx = (startX + mouseX) / 2;
    const cy = (startY + mouseY) / 2;
    const rx = Math.abs(mouseX - startX) / 2;
    const ry = Math.abs(mouseY - startY) / 2;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (currentMode === "arrow" && isDrawing) {
    redrawCanvas();

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.moveTo(startX, startY);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
  }
});

// ---- Canvas Mouse Up ----
canvas.addEventListener("mouseup", (e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  let didSomething = false;

  // Save rectangle
  if (currentMode === "rect" && isDrawing) {
    const x = Math.min(startX, mouseX);
    const y = Math.min(startY, mouseY);
    const width = Math.abs(mouseX - startX);
    const height = Math.abs(mouseY - startY);

    rectangles.push({ x, y, width, height, color });
    didSomething = true;
  }

  // Save circle
  if (currentMode === "circle" && isDrawing) {
    const cx = (startX + mouseX) / 2;
    const cy = (startY + mouseY) / 2;
    const rx = Math.abs(mouseX - startX) / 2;
    const ry = Math.abs(mouseY - startY) / 2;

    circles.push({ cx, cy, rx, ry, color });
    didSomething = true;
  }

  // Save arrow
  if (currentMode === "arrow" && isDrawing) {
    arrows.push({
      x1: startX,
      y1: startY,
      x2: mouseX,
      y2: mouseY,
      color
    });
    didSomething = true;
  }

  // Pencil finished
  if (currentMode === "pencil" && isPencilDrawing) {
    didSomething = true;
  }

  // Drag finished
  if (isDragging || isDraggingText || isDraggingCircle || isDraggingArrow) {
    didSomething = true;
  }

  // Reset flags
  isDraggingText = false;
  selectedText = null;
  isDrawing = false;
  isDragging = false;
  selectedRect = null;
  isPencilDrawing = false;
  isDraggingCircle = false;
  selectedCircle = null;
  isDraggingArrow = false;
  selectedArrow = null;

  if (didSomething) {
    saveState();
  }
});


// ============================================
// ========== HELPER FUNCTIONS ==========
// ============================================

// ---- Text Helper Functions ----
function getTextAt(x, y) {
  for (let i = texts.length - 1; i >= 0; i--) {
    const t = texts[i];
    ctx.font = `${t.size}px ${t.font}`;
    const width = ctx.measureText(t.text).width;
    const height = t.size;

    if (
      x >= t.x &&
      x <= t.x + width &&
      y <= t.y &&
      y >= t.y - height
    ) {
      return t;
    }
  }
  return null;
}

function getCharIndexAt(textObj, mouseX) {
  ctx.font = `${textObj.size}px ${textObj.font}`;

  let x = textObj.x;

  for (let i = 0; i < textObj.text.length; i++) {
    const ch = textObj.text[i];
    const w = ctx.measureText(ch).width;

    if (mouseX < x + w / 2) {
      return i;
    }
    x += w;
  }

  return textObj.text.length;
}

function finishTextEditing() {
  isTyping = false;
  liveTextObj = null;
  saveState();
}

// ---- Circle Helper Function ----
function isPointInEllipse(x, y, c) {
  const dx = (x - c.cx) / c.rx;
  const dy = (y - c.cy) / c.ry;
  return dx * dx + dy * dy <= 1;
}

// ---- Arrow/Line Helper Functions ----
function isPointNearLine(px, py, x1, y1, x2, y2, tolerance = 6) {
  const A = px - x1;
  const B = py - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;
  if (lenSq !== 0) param = dot / lenSq;

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = px - xx;
  const dy = py - yy;
  return Math.sqrt(dx * dx + dy * dy) <= tolerance;
}

// ---- Rectangle Helper Function ----
function isPointNearRectBorder(x, y, r, tolerance = 6) {
  const left = r.x;
  const right = r.x + r.width;
  const top = r.y;
  const bottom = r.y + r.height;

  const nearTop = Math.abs(y - top) <= tolerance && x >= left && x <= right;
  const nearBottom = Math.abs(y - bottom) <= tolerance && x >= left && x <= right;
  const nearLeft = Math.abs(x - left) <= tolerance && y >= top && y <= bottom;
  const nearRight = Math.abs(x - right) <= tolerance && y >= top && y <= bottom;

  return nearTop || nearBottom || nearLeft || nearRight;
}

// ============================================
// ========== DRAWING/RENDERING FUNCTIONS ==========
// ============================================

function drawTextPreview() {
  if (!isTyping) return;

  ctx.fillStyle = color;
  ctx.font = `${fontSize}px ${fontFamily}`;

  // Draw text
  ctx.fillText(currentText, textX, textY);
  const before = currentText.slice(0, cursorIndex);
  const caretX = textX + ctx.measureText(before).width;

  // Draw caret
  ctx.beginPath();
  ctx.moveTo(caretX, textY - fontSize);
  ctx.lineTo(caretX, textY + 4);
  ctx.strokeStyle = color;
  ctx.stroke();
}

function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw pencil strokes
  for (let stroke of strokes) {
  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.size;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Brush types
  if (stroke.brush === "marker") {
    ctx.globalAlpha = 0.6;
  } else if (stroke.brush === "highlighter") {
    ctx.globalAlpha = 0.25;
  } else {
    ctx.globalAlpha = 1;
  }

  ctx.beginPath();

  const pts = stroke.points;

  if (pts.length === 1) {
    ctx.moveTo(pts[0].x, pts[0].y);
    ctx.lineTo(pts[0].x + 0.1, pts[0].y + 0.1);
  } else {
    ctx.moveTo(pts[0].x, pts[0].y);

    for (let i = 1; i < pts.length - 1; i++) {
      const midX = (pts[i].x + pts[i + 1].x) / 2;
      const midY = (pts[i].y + pts[i + 1].y) / 2;

      ctx.quadraticCurveTo(
        pts[i].x,
        pts[i].y,
        midX,
        midY
      );
    }
  }

  ctx.stroke();
  ctx.globalAlpha = 1; 
}

  // Draw rectangles
  for (let rect of rectangles) {
    ctx.strokeStyle = rect.color;
    ctx.lineWidth = 2;
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  }

  // Draw text
  for (let t of texts) {
    ctx.fillStyle = t.color;
    ctx.font = `${t.size}px ${t.font}`;
    ctx.fillText(t.text, t.x, t.y);
  }

  // Draw circles
  for (let c of circles) {
    ctx.beginPath();
    ctx.strokeStyle = c.color;
    ctx.lineWidth = 2;
    ctx.ellipse(c.cx, c.cy, c.rx, c.ry, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Draw arrows
  for (let l of arrows) {
    ctx.beginPath();
    ctx.strokeStyle = l.color;
    ctx.lineWidth = 2;
    ctx.moveTo(l.x1, l.y1);
    ctx.lineTo(l.x2, l.y2);
    ctx.stroke();
  }

  drawTextPreview();
}

// ============================================
// ========== ERASER FUNCTIONALITY ==========
// ============================================

function eraseAt(x, y) {
  const ERASE_RADIUS = 9;

  // Erase rectangles 
  for (let i = rectangles.length - 1; i >= 0; i--) {
    const r = rectangles[i];
    if (isPointNearRectBorder(x, y, r)) {
      rectangles.splice(i, 1);
      redrawCanvas();
      return;
    }
  }

  // Erase pencil strokes
  let newStrokes = [];

  for (let stroke of strokes) {
    let currentSegment = [];

    for (let p of stroke.points) {
      const dx = p.x - x;
      const dy = p.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > ERASE_RADIUS) {
        currentSegment.push(p);
      } else {
        if (currentSegment.length > 1) {
          newStrokes.push({
            color: stroke.color,
            points: currentSegment
          });
        }
        currentSegment = [];
      }
    }

    if (currentSegment.length > 1) {
      newStrokes.push({
        color: stroke.color,
        points: currentSegment
      });
    }
  }

  // Erase arrows
  for (let i = arrows.length - 1; i >= 0; i--) {
    const l = arrows[i];
    if (isPointNearLine(x, y, l.x1, l.y1, l.x2, l.y2)) {
      arrows.splice(i, 1);
      redrawCanvas();
      return;
    }
  }

  strokes = newStrokes;
  redrawCanvas();
  saveState();
}

// ============================================
// ========== UNDO/REDO FUNCTIONALITY ==========
// ============================================

function saveState() {
  const state = {
    strokes: JSON.parse(JSON.stringify(strokes)),
    rectangles: JSON.parse(JSON.stringify(rectangles)),
    circles: JSON.parse(JSON.stringify(circles)),
    arrows: JSON.parse(JSON.stringify(arrows)),
    texts: JSON.parse(JSON.stringify(texts))
  };
  undoStack.push(state);
  if (undoStack.length > 50) {
    undoStack.shift();
  }
  redoStack.length = 0;
}

function restoreState(state) {
  strokes = JSON.parse(JSON.stringify(state.strokes));
  rectangles = JSON.parse(JSON.stringify(state.rectangles));
  circles = JSON.parse(JSON.stringify(state.circles));
  arrows = JSON.parse(JSON.stringify(state.arrows));
  texts = JSON.parse(JSON.stringify(state.texts));

  redrawCanvas();
}

function undo() {
  if (undoStack.length <= 1) return; 

  // Move current to redo
  const current = undoStack.pop();
  redoStack.push(current);

  // Restore previous
  const prev = undoStack[undoStack.length - 1];
  restoreState(prev);
}

function redo() {
  if (redoStack.length === 0) return;

  const state = redoStack.pop();
  undoStack.push(state);
  restoreState(state);
}

// ============================================
// ========== INITIALIZE APPLICATION ==========
// ============================================

saveState();
