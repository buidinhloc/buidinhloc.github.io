let wishes = [];
const list = document.getElementById('list');
const counter = document.getElementById('counter');
const copiedSet = new Set(JSON.parse(localStorage.getItem('copiedWishes') || '[]'));

fetch('wishes.txt')
  .then(res => res.text())
  .then(text => {
    wishes = text.split('---').map(w => w.trim()).filter(w => w);
    renderItems();
  })
  .catch(err => console.error('Không thể tải wishes.txt:', err));

function renderItems() {
  list.innerHTML = "";
  wishes.forEach((wish, idx) => {
    const item = document.createElement('div');
    item.className = 'item';
    if (copiedSet.has(idx)) item.classList.add('copied');

    item.innerHTML = `<div class="text">${wish.replace(/\n/g, "<br>")}</div>`;

    item.onclick = () => copyWish(idx, item);
    list.appendChild(item);
  });
  updateCounter();
}

function copyWish(idx, item) {
  navigator.clipboard.writeText(wishes[idx]);
  copiedSet.add(idx);
  localStorage.setItem('copiedWishes', JSON.stringify([...copiedSet]));
  item.classList.add('copied');

  setTimeout(() => {
    list.removeChild(item);
    list.appendChild(item);
  }, 500);

  updateCounter();
}

function resetCopied() {
  if (confirm("Riel? Reset à?")) {
    localStorage.removeItem('copiedWishes');
    copiedSet.clear();
    renderItems();
  }
}

function updateCounter() {
  counter.textContent = `${copiedSet.size}/${wishes.length}`;
}
