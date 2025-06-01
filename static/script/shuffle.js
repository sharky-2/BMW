document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll("#container-shuffel .item");

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => startShuffle(item));
  });
});

function startShuffle(item) {
  if (item.dataset.animating) return; 

  item.dataset.animating = "true";

  const words = Array.from(item.querySelectorAll(".word"));
  const originalTexts = words.map(w => w.textContent);

  const maxFrames = 30; 
  const delay = 20; 
  let frame = 0;

  function shuffleFrame() {
    if (frame >= maxFrames) {
      words.forEach((word, i) => {
        word.textContent = originalTexts[i];
      });
      delete item.dataset.animating;
      return;
    }

    words.forEach(word => {
      word.textContent = generateRandomString(word.textContent.length);
    });

    frame++;
    setTimeout(shuffleFrame, delay); 
  }

  shuffleFrame();
}

function generateRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+,-./:;<=>?@[]^_{|}~0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
