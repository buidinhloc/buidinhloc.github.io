function tinhtuoi() {
  const input = document.getElementById('birthYear');
  const result = document.getElementById('result');
  const year = parseInt(input.value);
  const currentYear = new Date().getFullYear();

  result.style.color = 'white';
  result.textContent = 'Đang suy nghĩ... 🤔';

  if (isNaN(year) || year < 1900 || year > currentYear) {
    setTimeout(() => {
      result.style.color = 'red';
      result.textContent = 'Vui lòng nhập một năm sinh hợp lệ!';
    }, 2000);
    return;
  }

  const age = currentYear - year;

  setTimeout(() => {
    result.style.color = 'lime';
    result.textContent = `🎉 Bạn ${age} tuổi!`;
  }, 2000);
}
