export const getCanvasRelativePosition = (
    event: MouseEvent | TouchEvent,
    canvas: HTMLCanvasElement
) => {
    const rect = canvas.getBoundingClientRect()

    let x, y
    if (event instanceof MouseEvent) {
        x = event.clientX
        y = event.clientY
    } else {
        x = event.touches[0].clientX
        y = event.touches[0].clientY
    }

    return {
        x: ((x - rect.left) / rect.width) * 2 - 1,
        y: -((y - rect.top) / rect.height) * 2 + 1,
    }
}
