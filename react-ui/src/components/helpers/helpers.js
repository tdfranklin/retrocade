export const GetCanvas = (name) => {
    return document.getElementById(name);
}

export const GetContext = (canvas) => {
    return canvas.getContext('2d');
}

export const SetDefaultCanvas = (color, name, myCanvas=null, myContext=null) => {
    const canvas = myCanvas || GetCanvas(name);
    const context = myContext || GetContext(canvas);
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

export const SetCanvasText = (color, text, fontSize, xPos, yPos, name=null, myCanvas=null, myContext=null) => {
    const canvas = myCanvas || GetCanvas(name);
    const context = myContext || GetContext(canvas);
    context.fillStyle = color;
    context.font = context.font = `${fontSize} 'Press Start 2P' `;
    context.fillText(text, xPos, yPos);
}

export const ResetCanvas = (color, name=null, myCanvas=null, myContext=null) => {
    const canvas = myCanvas || GetCanvas(name);
    const context = myContext || GetContext(canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
}