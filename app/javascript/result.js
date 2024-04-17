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

// ログインページにリダイレクトする関数
function redirectToLogin() {
  window.location.href = '/users/sign_in';
}

function initializePage() {
  const fortuneButton = document.getElementById('fortune-button');
  console.log('イベント発火');
  if (!fortuneButton) {
    console.error('fortuneButton is not found');
    return; // fortuneButtonが存在しない場合は処理を中断する
  }

  // ボタンをクリックした時の処理
  fortuneButton.addEventListener('click', function() {
    // ログインチェック
    const loggedIn = isLoggedIn();
    // ログインしていない場合はログインページにリダイレクト
    if (!loggedIn) {
      redirectToLogin();
      return; // ログインしていない場合は以降の処理をスキップ
    }

    // ログインしている場合はフォーチュンの計算を行う
    calculateFortune();

    // ボタンがクリックされたことをログに出力
    console.log('Fortune button clicked');
  });

  // ログインしているかどうかをチェックする関数
  function isLoggedIn() {
  // ここにログインチェックのロジックを追加する
  // セッションストレージにログイン情報が保存されているかを確認する
    return sessionStorage.getItem('isLoggedIn') === true;
  }
  // フォーチュンを計算する関数
  function calculateFortune() {
    const inputName = document.getElementById("inputName");
    const nameValue = inputName.value;

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
      body: formDat
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
  }

window.addEventListener('turbo:load', initializePage);
window.addEventListener('turbo:render', initializePage);