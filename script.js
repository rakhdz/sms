
const form = document.getElementById('subscriptionForm');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  let rawPhone = phoneInput.value.replace(/\D/g, '');

  if (!/^0(5|6|7)\d{8}$/.test(rawPhone)) {
    alert('يرجى إدخال رقم هاتف صحيح مكون من 10 أرقام ويبدأ بـ 05 أو 06 أو 07');
    return;
  }

  phoneInput.value = rawPhone;

  submitBtn.disabled = true;
  submitBtn.classList.add("loading");
  submitBtn.textContent = "جاري الإرسال...";

  fetch("https://script.google.com/macros/s/AKfycbw3YcrggKy2lPzj8vuN4duJ1PaFy2viDpIM51KkPyDcrcwoLIvpdzVAzNjZY6E6E0fgxA/exec", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ phone: "'" + rawPhone })
  })
  .then(res => res.text())
  .then(() => {
    successMessage.classList.add('show');
    form.reset();
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");
    submitBtn.textContent = "اشترك";
  })
  .catch(() => {
    alert("حدث خطأ أثناء الإرسال. حاول مرة أخرى.");
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");
    submitBtn.textContent = "اشترك";
  });
});
