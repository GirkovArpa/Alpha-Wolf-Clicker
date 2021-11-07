export function adjustWindow() {
  const [, windowWidth] = document.state.contentWidths();
  const windowHeight = document.state.contentHeight(windowWidth);
  const [screenWidth, screenHeight] = Window.this.screenBox('frame', 'dimension');
  Window.this.move(
    (screenWidth - windowWidth) / 2,
    (screenHeight - windowHeight) / 2,
    windowWidth,
    windowHeight,
    true
  );
}
