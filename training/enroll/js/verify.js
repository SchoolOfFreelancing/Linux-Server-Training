(function () {
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  const app = document.getElementById('verify-app');

  function renderError(msg) {
    app.innerHTML = `<h4 class="text-danger">⚠️ ${msg}</h4>`;
  }

  function buildInvoicePDFBlob(enrollment) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    doc.setFontSize(18).text('SCHOOL OF FREELANCING', 40, 50);
    doc.setFontSize(10).setTextColor(22, 163, 74).text('Linux Freelancing Training & Tech Support', 40, 68);

    doc.setTextColor(10, 10, 10).setFontSize(16).text('PAID INVOICE', 555, 50, { align: 'right' });
    doc.setFontSize(10).setTextColor(80, 80, 80);
    doc.text(`Invoice #: ${enrollment.invoiceNumber}`, 555, 68, { align: 'right' });
    doc.text(`Enrollment ID: ${enrollment.enrollmentId}`, 555, 82, { align: 'right' });
    doc.text(`Payment Date: ${enrollment.paymentDate}`, 555, 96, { align: 'right' });

    doc.setDrawColor(200).line(40, 115, 555, 115);

    doc.setFontSize(12).setTextColor(10, 10, 10).text('Billed To:', 40, 145);
    doc.setFontSize(10).setTextColor(50, 50, 50);
    doc.text(enrollment.fullName, 40, 162);
    doc.text(enrollment.email, 40, 176);
    doc.text(enrollment.phone, 40, 190);
    doc.text(enrollment.country, 40, 204);

    doc.setFillColor(10, 10, 10).rect(40, 230, 515, 22, 'F');
    doc.setTextColor(255, 255, 255).setFontSize(10);
    doc.text('Description', 48, 245);
    doc.text('Amount (USD)', 470, 245);

    doc.setTextColor(50, 50, 50);
    doc.text(enrollment.courseName, 48, 272);
    doc.text(`$${Number(enrollment.priceUSD).toFixed(2)}`, 470, 272);
    doc.setDrawColor(200).line(40, 285, 555, 285);

    doc.setFontSize(12).setTextColor(10, 10, 10).text('Total Paid:', 400, 310);
    doc.setTextColor(22, 163, 74).text(`$${Number(enrollment.priceUSD).toFixed(2)} USD`, 470, 310);

    doc.setFontSize(9).setTextColor(100, 100, 100);
    doc.text(`Payment Method: ${enrollment.paymentMethod} (${enrollment.paymentCurrency})`, 40, 360);
    doc.text('Thank you for enrolling with School of Freelancing.', 40, 410);
    doc.text('https://www.schooloffreelancing.com', 40, 424);

    return doc.output('blob');
  }

  async function sendInvoiceEmail(enrollment, pdfBlob) {
    // EmailJS attachment workaround: browsers can't send raw Blob via the
    // JSON send() call, so we push the PDF through a hidden file input and
    // use sendForm(), which EmailJS reads as a real attachment.
    // Requires your EmailJS plan to support attachments — check emailjs.com/pricing.
    const file = new File([pdfBlob], `${enrollment.invoiceNumber}.pdf`, { type: 'application/pdf' });
    const dt = new DataTransfer();
    dt.items.add(file);

    const form = document.createElement('form');
    form.style.display = 'none';
    const fields = {
      to_email: enrollment.email,
      full_name: enrollment.fullName,
      enrollment_id: enrollment.enrollmentId,
      invoice_number: enrollment.invoiceNumber,
      course_name: enrollment.courseName,
      price_usd: enrollment.priceUSD,
      payment_date: enrollment.paymentDate,
    };
    Object.entries(fields).forEach(([k, v]) => {
      const input = document.createElement('input');
      input.type = 'hidden'; input.name = k; input.value = v;
      form.appendChild(input);
    });
    const fileInput = document.createElement('input');
    fileInput.type = 'file'; fileInput.name = 'invoice_pdf';
    fileInput.files = dt.files;
    form.appendChild(fileInput);
    document.body.appendChild(form);

    try {
      await emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateStudentInvoice, form);
    } finally {
      document.body.removeChild(form);
    }
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function init() {
    const params = new URLSearchParams(location.search);
    const dataParam = params.get('data');
    const token = params.get('token');
    if (!dataParam || !token) return renderError('This verification link is missing required parameters.');

    let enrollment;
    try { enrollment = b64decode(decodeURIComponent(dataParam)); } catch (e) { return renderError('This verification link is corrupted.'); }

    const expectedToken = await signPayload(JSON.stringify(enrollment));
    if (expectedToken !== token) return renderError('This verification link is invalid or has been tampered with.');

    if (enrollment.status === 'paid') {
      app.innerHTML = `<h4 class="text-brand">Already Verified ✅</h4>
        <p>Enrollment <strong>${sanitize(enrollment.enrollmentId)}</strong> was already marked paid.</p>`;
      return;
    }

    app.innerHTML = `
      <h4 class="mb-3">Verify Payment</h4>
      <ul class="list-unstyled small mb-4">
        <li><strong>Enrollment ID:</strong> ${sanitize(enrollment.enrollmentId)}</li>
        <li><strong>Student:</strong> ${sanitize(enrollment.fullName)} (${sanitize(enrollment.email)})</li>
        <li><strong>Training:</strong> ${sanitize(enrollment.courseName)} — $${enrollment.priceUSD}</li>
        <li><strong>Payment Method:</strong> ${sanitize(enrollment.paymentMethod)} (${sanitize(enrollment.paymentCurrency)})</li>
        <li><strong>Submitted:</strong> ${sanitize(enrollment.createdAt)}</li>
      </ul>
      <button id="confirm-btn" class="btn btn-brand w-100">✅ Confirm Payment &amp; Generate Invoice</button>
      <p id="verify-status" class="small text-muted mt-3"></p>
    `;

    document.getElementById('confirm-btn').addEventListener('click', async () => {
      const btn = document.getElementById('confirm-btn');
      const status = document.getElementById('verify-status');
      btn.disabled = true; btn.textContent = 'Processing…';

      enrollment.status = 'paid';
      enrollment.invoiceNumber = generateInvoiceNumber();
      enrollment.paymentDate = new Date().toISOString();

      dbUpdate(enrollment.enrollmentId, {
        status: 'paid', invoiceNumber: enrollment.invoiceNumber, paymentDate: enrollment.paymentDate,
      }); // only affects this browser's local copy — see README

      const pdfBlob = buildInvoicePDFBlob(enrollment);
      downloadBlob(pdfBlob, `${enrollment.invoiceNumber}.pdf`);

      try {
        await sendInvoiceEmail(enrollment, pdfBlob);
        status.textContent = `Invoice ${enrollment.invoiceNumber} generated and emailed to ${enrollment.email}.`;
        status.className = 'small text-brand mt-3';
      } catch (err) {
        console.error(err);
        status.textContent = 'Invoice PDF downloaded, but the automated email failed (check EmailJS attachment support). Please attach and send it manually.';
        status.className = 'small text-warning mt-3';
      }
      btn.textContent = '✅ Verified';
    });
  }

  init();
})();
