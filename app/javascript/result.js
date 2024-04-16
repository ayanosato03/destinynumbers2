function getCSRFToken() {
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  return token;
}

function calculateFortuneNumber(year, month, day) {
  // 各桁の数字を足し合わせる関数
  function sumDigits(num) {
    return num.toString().split('').reduce((acc, val) => acc + parseInt(val), 0);
  }

  // 年、月、日を1桁ずつに分解して足し合わせる
  let total = sumDigits(parseInt(year)) + sumDigits(parseInt(month)) + sumDigits(parseInt(day));

  // 11、22、33はそのまま運命数として扱う
  if (total === 11 || total === 22 || total === 33) {
    return total;
  } else {
    // それ以外の場合、合計を1桁ずつに分解して再度足し合わせる
    return sumDigits(total);
  }
}

function initializePage() {
    const fortuneButton = document.getElementById('fortune-button');
    if (!fortuneButton) {
      console.error('fortuneButton is not found');
      return; // fortuneButtonが存在しない場合は処理を中断する
    }

      // 既存のイベントリスナーを削除
  fortuneButton.removeEventListener('click', handleClick);

  // 新しいイベントリスナーを追加
  fortuneButton.addEventListener('click', handleClick);
}

function handleClick(event) {
  event.preventDefault(); // デフォルトのイベントをキャンセル

    const inputName = document.getElementById("inputName");
    const nameValue = inputName.value;
    console.log("inputNameの値:", nameValue);


    const birthdayYear = document.getElementById("result_birthday_1i");
    const birthdayMonth = document.getElementById("result_birthday_2i");
    const birthdayDay = document.getElementById("result_birthday_3i");

    // 生年月日の値を取得
    const yearValue = birthdayYear.value;
    const monthValue = birthdayMonth.value;
    const dayValue = birthdayDay.value;

        // CSRFトークンを取得
        const csrfToken = getCSRFToken();

    // 生年月日の運命数を計算
    const fortuneNumber = calculateFortuneNumber(yearValue, monthValue, dayValue);
    console.log("運命数:", fortuneNumber);

    // フォームデータを作成
    const formData = new FormData();
    formData.append('result[name]', nameValue);
    formData.append('result[birthday]', `${yearValue}-${monthValue}-${dayValue}`);
    formData.append('result[calculation_result]', fortuneNumber);

// フォームデータをサーバーに送信
fetch('/results', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken // CSRFトークンを追加
  },
  body: formData
})
.then(response => {
  if (!response.ok) {
    throw new Error('Failed to submit form');
  }
  return response.json();
})

.then(response => {
  if (response.success) {
    console.log('Form submitted successfully:', response.result);
    // 成功時の処理を記述する
    const calculationResult = response.result.calculation_result;
    let url = `/results/${calculationResult}`; // 運命数に基づいてURLを生成
    window.location.href = url;
    console.log('fortuneButton:', fortuneButton);
  } else {
    console.error('Form submission error:', response.errors);
    // エラー時の処理を記述する
  }
})
.catch(error => {
  console.error('Form submission error:', error);
});
}

document.addEventListener('DOMContentLoaded', function() {
  const fortuneButton = document.getElementById('fortune-button');
  if (fortuneButton) {
    fortuneButton.addEventListener('click', function() {
      window.location.href = '/users/sign_in'; 
    });
  }
});

window.addEventListener('turbo:load', initializePage);
window.addEventListener('turbo:render', initializePage);