function initializePage(){
  const birthdayYear = document.getElementById("user_birthday_1i");
  const birthdayMonth = document.getElementById("user_birthday_2i");
  const birthdayDay = document.getElementById("user_birthday_3i");

  const fortuneButton = document.getElementById('fortune-button'); 
  fortuneButton.addEventListener('click', function() {
const birthdate = new Date(birthdayYear.value, birthdayMonth.value - 1, birthdayDay.value);
  })

  function sumDigits(num) {
    const str = String(num);
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      sum += Number(str.charAt(i));
    }
    return sum;
  }

  function getFortuneNumber(birthdate) {
    const yearSum = sumDigits(birthdate.getFullYear()); // 年の数字を1桁ずつに分解して合計
    const monthSum = sumDigits(birthdate.getMonth() + 1); // 月の数字を1桁ずつに分解して合計
    const daySum = sumDigits(birthdate.getDate()); // 日の数字を1桁ずつに分解して合計
  
    const total = yearSum + monthSum + daySum;
  
    if (total === 11 || total === 22 || total === 33) {
      return total;
    } else {
      return sumDigits(total);
    }
  }

  fortuneButton.addEventListener('click', function() {
    const birthdate = new Date(birthdayYear.value, birthdayMonth.value - 1, birthdayDay.value);
    const fortuneNumber = getFortuneNumber(birthdate);
    let url;
    switch (fortuneNumber) {
      case 1:
        url = '/results/1';
        break;
      case 2:
        url = '/results/2';
        break;
      case 3:
        url = '/results/3';
        break;
      case 4:
        url = '/results/4';
        break;
      case 5:
        url = '/results/5';
        break;
      case 6:
        url = '/results/6';
        break;
      case 7:
        url = '/results/7';
        break;
      case 8:
        url = '/results/8';
        break;
      case 9:
        url = '/results/9';
        break;
      case 11:
        url = '/results/11';
        break;
      case 22:
        url = '/results/22';
        break;
      case 33:
        url = '/results/33';
        break;
      }
      window.location.href = url;
  });
}

window.addEventListener('turbo:load', initializePage);
window.addEventListener('turbo:render', initializePage);