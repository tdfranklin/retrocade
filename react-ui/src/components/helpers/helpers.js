export const GetCanvas = (name) => {
    return document.getElementById(name);
}

export const GetContext = (name) => {
    return document.getElementById(name).getContext('2d');
}

export const SetDefaultCanvas = (color, name) => {
    const canvas = GetCanvas(name);
    const context = GetContext(name);
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

export const SetCanvasBorder = (color, name, size) => {
    const canvas = GetCanvas(name);
    const context = GetContext(name);
    context.strokeStyle = color;
    context.lineWidth = size;
    context.strokeRect(0, 0, canvas.width, canvas.height);
}

export const SetCanvasText = (color, text, fontSize, xPos, yPos, name) => {
    const context = GetContext(name);
    context.fillStyle = color;
    context.font = context.font = `${fontSize} 'Press Start 2P' `;
    context.fillText(text, xPos, yPos);
}

export const ResetCanvas = (color, name) => {
    const canvas = GetCanvas(name);
    const context = GetContext(name);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

export const BuildRect = (color, name, xPos, yPos, width, height) => {
    const context = GetContext(name);
    context.fillStyle = color;
    context.fillRect(xPos, yPos, width, height);
}

export const ClearRect = (name, xPos, yPos, width, height) => {
    const context = GetContext(name);
    context.clearRect(xPos, yPos, width, height);
    context.fillStyle = 'black';
    context.fillRect(xPos, yPos, width, height);
}

export const BuildCircle = (name, color, x, y, radius) => {
    const context = GetContext(name);
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
}

export const GetRandInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const AddCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}