function getCSRFToken() {
  return document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
}

function calculateFortuneNumber(year, month, day) {
  // 各桁の数字を足し合わせる関数
  function sumDigits(num) {
    return num
      .toString()
      .split("")
      .reduce((acc, val) => acc + parseInt(val), 0);
  }
  // 年、月、日を1桁ずつに分解して足し合わせる
  let total =
    sumDigits(parseInt(year)) +
    sumDigits(parseInt(month)) +
    sumDigits(parseInt(day));
  // 11、22、33はそのまま運命数として扱う、それ以外の場合、合計を1桁ずつに分解して再度足し合わせる
  return total === 11 || total === 22 || total === 33
    ? total
    : sumDigits(total);
}

// ページがロードされた場合等に発火する部分
function initializePage() {
  const fortuneButton = document.getElementById("fortune-button");
  if (!fortuneButton) {
    console.error("Fortune button not found");
    return; // fortuneButtonが存在しない場合は処理を中断する
  }

  // 重複登録防止でデータセット
  if (fortuneButton.dataset.initialized) return;
  fortuneButton.dataset.initialized = true;

  // クリックされた場合にhandleClickという関数を発火
  fortuneButton.addEventListener("click", handleClick);
}

// クリックされた際に発火するイベント
function handleClick(event) {
  console.log("クリックされました");
  event.preventDefault();
  // ログインされていない場合はログインの関数を発火
  if (!isLoggedIn()) {
    redirectToLogin();
    return;
  }

  const nameValue = document.getElementById("inputName").value;
  const yearValue = document.getElementById("result_birthday_1i").value;
  const monthValue = document.getElementById("result_birthday_2i").value;
  const dayValue = document.getElementById("result_birthday_3i").value;
  const csrfToken = getCSRFToken();
  const fortuneNumber = calculateFortuneNumber(yearValue, monthValue, dayValue);

  // Formを送信する関数に値を渡しています
  submitFortuneForm(
    nameValue,
    yearValue,
    monthValue,
    dayValue,
    fortuneNumber,
    csrfToken
  );
}

// 要検討
function isLoggedIn() {
  return typeof window.isLoggedIn !== 'undefined' && window.isLoggedIn;
}

function redirectToLogin() {
  window.location.href = "/users/sign_in";
}

// ここがフォーム送信をしている関数
function submitFortuneForm(name, year, month, day, fortuneNumber, csrfToken) {
  const formData = new FormData();
  formData.append("result[name]", name);
  formData.append("result[birthday]", `${year}-${month}-${day}`);
  formData.append("result[calculation_result]", fortuneNumber);

  fetch("/results", {
    method: "POST",
    headers: { "X-CSRF-Token": csrfToken },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to submit form");
      return response.json();
    })
    .then((response) => {
      console.log("Form submitted successfully:", response.result);
      const calculationResult = response.result.calculation_result;
      window.location.href = `/results/${calculationResult}`;
    })
    .catch((error) => console.error("Form submission error:", error));
}

document.addEventListener("turbo:load", initializePage);