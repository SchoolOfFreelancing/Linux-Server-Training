(function () {
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });

  let fxRates = { USD: 1 };
  let selectedCourseId = null;

  const courseGrid = document.getElementById('course-grid');
  const orderTotal = document.getElementById('order-total');
  const paymentMethodEl = document.getElementById('paymentMethod');
  const currencyWrap = document.getElementById('currency-wrap');
  const currencyEl = document.getElementById('paymentCurrency');
  const qrEl = document.getElementById('qr-code');
  const payAmountEl = document.getElementById('pay-amount');
  const addressWrap = document.getElementById('address-wrap');
  const addressEl = document.getElementById('pay-address');
  const instructionsEl = document.getElementById('pay-instructions');
  const copyBtn = document.getElementById('copy-btn');
  const form = document.getElementById('enrollment-form');
  const submitBtn = document.getElementById('submit-btn');
  const alertBox = document.getElementById('alert-box');

  function showAlert(msg, type) {
    alertBox.textContent = msg;
    alertBox.className = 'alert alert-' + (type || 'danger');
    alertBox.classList.remove('d-none');
  }

  function getSelectedCourse() {
    return COURSES.find((c) => c.id === selectedCourseId) || null;
  }

  function renderCourses() {
    courseGrid.innerHTML = '';
    COURSES.forEach((course) => {
      const col = document.createElement('div');
      col.className = 'col-md-6';
      col.innerHTML = `<div class="course-card" data-id="${course.id}">
          <div class="d-flex justify-content-between"><strong>${course.icon} ${sanitize(course.name)}</strong></div>
          <small>$${course.price} · ${course.hours} Hours · ${sanitize(course.duration)}</small>
        </div>`;
      col.querySelector('.course-card').addEventListener('click', () => selectCourse(course.id));
      courseGrid.appendChild(col);
    });
    if (COURSES.length) selectCourse(COURSES[0].id);
  }

  function selectCourse(id) {
    selectedCourseId = id;
    document.querySelectorAll('.course-card').forEach((el) => el.classList.toggle('selected', el.dataset.id === id));
    updateTotals();
  }

  function populateCurrencyOptions() {
    const method = paymentMethodEl.value;
    currencyEl.innerHTML = '';
    if (method === 'bank_qr') {
      currencyWrap.classList.remove('d-none');
      const common = ['USD', 'EUR', 'GBP', 'BDT', 'INR', 'NGN', 'PKR', 'PHP', 'KES', 'ZAR', 'CAD', 'AUD', 'AED', 'SAR'];
      const codes = Object.keys(fxRates).sort();
      const ordered = common.filter((c) => codes.includes(c)).concat(codes.filter((c) => !common.includes(c)));
      (ordered.length ? ordered : ['USD']).forEach((code) => {
        const opt = document.createElement('option');
        opt.value = code; opt.textContent = code;
        currencyEl.appendChild(opt);
      });
    } else {
      currencyWrap.classList.add('d-none');
      const label = { USDT_TRC20: 'USDT', ETH_ERC20: 'ETH', BTC: 'BTC' }[method];
      const opt = document.createElement('option');
      opt.value = label; opt.textContent = label;
      currencyEl.appendChild(opt);
    }
  }

  function renderQR(text) {
    qrEl.innerHTML = '';
    new QRCode(qrEl, { text, width: 180, height: 180 });
  }

  function updateTotals() {
    const course = getSelectedCourse();
    const priceUSD = course ? course.price : 0;
    orderTotal.textContent = '$' + priceUSD.toLocaleString();
    updatePaymentBox(priceUSD);
  }

  function updatePaymentBox(priceUSD) {
    const method = paymentMethodEl.value;
    if (method === 'bank_qr') {
      addressWrap.classList.add('d-none');
      const currency = currencyEl.value || 'USD';
      const rate = fxRates[currency] || 1;
      const localAmount = (priceUSD * rate).toLocaleString(undefined, { maximumFractionDigits: 2 });
      payAmountEl.textContent = `${localAmount} ${currency} (≈ $${priceUSD})`;
      const msg = `Hi, I want to pay ${localAmount} ${currency} ($${priceUSD} USD) for my School of Freelancing training enrollment.`;
      renderQR(`https://wa.me/${BANK_QR.whatsapp}?text=${encodeURIComponent(msg)}`);
      instructionsEl.textContent = BANK_QR.note;
    } else {
      addressWrap.classList.remove('d-none');
      const cfg = WALLETS[method];
      const symbol = { USDT_TRC20: 'USDT', ETH_ERC20: 'ETH', BTC: 'BTC' }[method];
      payAmountEl.textContent = `$${priceUSD} worth of ${symbol}`;
      addressEl.textContent = cfg.address;
      renderQR((cfg.qrPrefix || '') + cfg.address);
      instructionsEl.textContent = 'Scan with your wallet app or copy the address. Send the exact USD-equivalent amount and paste the transaction ID below.';
    }
  }

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(addressEl.textContent).then(() => {
      copyBtn.textContent = '✅ Copied!';
      setTimeout(() => (copyBtn.textContent = '📋 Copy Address'), 1500);
    });
  });

  paymentMethodEl.addEventListener('change', () => { populateCurrencyOptions(); updateTotals(); });
  currencyEl.addEventListener('change', updateTotals);

  async function loadFxRates() {
    try {
      const r = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await r.json();
      if (data && data.rates) { fxRates = data.rates; fxRates.USD = 1; }
    } catch (e) { /* fall back to USD only */ }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (!document.getElementById('paymentConfirm').checked || !document.getElementById('termsAgree').checked) {
      showAlert('Please confirm your payment and agree to the Terms & Privacy Policy.', 'warning');
      return;
    }

    const email = document.getElementById('email').value.trim();
    const fingerprint = btoa(email + '|' + selectedCourseId).replace(/[^a-zA-Z0-9]/g, '');
    if (alreadySubmittedRecently(fingerprint)) {
      showAlert('You already submitted an enrollment for this training in this session.', 'warning');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';

    const course = getSelectedCourse();
    const enrollment = {
      enrollmentId: generateEnrollmentId(),
      fullName: sanitize(document.getElementById('fullName').value),
      email: sanitize(email),
      phone: sanitize(document.getElementById('phone').value),
      country: sanitize(document.getElementById('country').value),
      courseId: course.id,
      courseName: course.name,
      priceUSD: course.price,
      paymentMethod: paymentMethodEl.value,
      paymentCurrency: currencyEl.value,
      note: sanitize(document.getElementById('note').value),
      status: 'pending',
      invoiceNumber: null,
      paymentDate: null,
      createdAt: new Date().toISOString(),
    };

    try {
      const payloadStr = JSON.stringify(enrollment);
      const token = await signPayload(payloadStr);
      const verifyUrl = `${location.origin}${location.pathname.replace('index.html', '')}verify.html?data=${encodeURIComponent(b64encode(enrollment))}&token=${token}`;

      dbSave(enrollment);

      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateOffice, {
        to_email: EMAILJS_CONFIG.officeEmail,
        enrollment_id: enrollment.enrollmentId,
        full_name: enrollment.fullName,
        student_email: enrollment.email,
        phone: enrollment.phone,
        country: enrollment.country,
        course_name: enrollment.courseName,
        price_usd: enrollment.priceUSD,
        payment_method: enrollment.paymentMethod,
        payment_currency: enrollment.paymentCurrency,
        note: enrollment.note,
        created_at: enrollment.createdAt,
        verify_url: verifyUrl,
      });

      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateStudentAck, {
        to_email: enrollment.email,
        full_name: enrollment.fullName,
        enrollment_id: enrollment.enrollmentId,
        course_name: enrollment.courseName,
        price_usd: enrollment.priceUSD,
      });

      document.getElementById('telegram-btn').href = TELEGRAM_URL;
      new bootstrap.Modal(document.getElementById('successModal')).show();
      form.reset();
      submitBtn.textContent = '✅ Submitted';
    } catch (err) {
      console.error(err);
      showAlert('Could not send confirmation emails. Please check your EmailJS configuration in js/config.js.', 'danger');
      submitBtn.disabled = false;
      submitBtn.textContent = '🔒 Complete Enrollment';
    }
  });

  renderCourses();
  populateCurrencyOptions();
  loadFxRates().then(() => { populateCurrencyOptions(); updateTotals(); });
  updateTotals();
})();
