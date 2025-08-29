document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  const feedback = {
    username: document.getElementById("usernameFeedback"),
    email: document.getElementById("emailFeedback"),
    password: document.getElementById("passwordFeedback"),
    confirm: document.getElementById("confirmPasswordFeedback")
  };

  const submitBtn = document.getElementById("submitBtn");
  const checkBtn = document.getElementById("checkDuplicateBtn");
  const successMessage = document.getElementById("successMessage");

  const registeredUsers = new Set(["admin", "test", "user123"]);

  // 유효성 검사 함수
  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    feedback.email.textContent = regex.test(email.value) ? "✓ 올바른 이메일" : "이메일 형식이 올바르지 않습니다.";
    return regex.test(email.value);
  };

  const validatePassword = () => {
    const pass = password.value;
    const valid = pass.length >= 8 && /\d/.test(pass) && /[!@#$%^&*]/.test(pass);
    feedback.password.textContent = valid ? "✓ 안전한 비밀번호" : "비밀번호 조건을 만족하지 않습니다.";
    return valid;
  };

  const validateConfirm = () => {
    const match = password.value === confirmPassword.value && confirmPassword.value !== "";
    feedback.confirm.textContent = match ? "✓ 비밀번호 일치" : "비밀번호가 일치하지 않습니다.";
    return match;
  };

  // 아이디 중복 확인
  checkBtn.addEventListener("click", () => {
    if (username.value.length < 3) {
      feedback.username.textContent = "아이디는 3자 이상이어야 합니다.";
      return;
    }
    if (registeredUsers.has(username.value)) {
      feedback.username.textContent = "이미 사용 중인 아이디입니다.";
    } else {
      feedback.username.textContent = "✓ 사용 가능한 아이디입니다.";
    }
  });

  // 입력 이벤트 바인딩
  email.addEventListener("input", validateEmail);
  password.addEventListener("input", validatePassword);
  confirmPassword.addEventListener("input", validateConfirm);

  // 폼 제출
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateEmail() || !validatePassword() || !validateConfirm()) {
      alert("입력값을 다시 확인해주세요.");
      return;
    }
    registeredUsers.add(username.value);
    form.style.display = "none";
    successMessage.style.display = "block";
  });
});