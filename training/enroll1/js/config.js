// ==== EDIT THESE BEFORE GOING LIVE ====

// Sign up free at https://www.emailjs.com — no backend needed.
// Create 3 templates: office notification, student acknowledgment, paid invoice.
const EMAILJS_CONFIG = {
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
  serviceId: 'YOUR_EMAILJS_SERVICE_ID',
  templateOffice: 'template_office_notify',
  templateStudentAck: 'template_student_ack',
  templateStudentInvoice: 'template_student_invoice',
  officeEmail: 'office@schooloffreelancing.com',
};

// Used to sign the verify link so it can't be trivially forged.
// NOTE: this is client-side JS — a technically skilled visitor CAN read this
// secret in devtools. A fully tamper-proof verify link requires a real
// backend. This still stops casual link-guessing/edits, which is the best
// achievable without a server.
const VERIFY_SECRET = 'CHANGE-THIS-TO-A-LONG-RANDOM-STRING';

const TELEGRAM_URL = 'https://t.me/SchoolOfFreelancingTraining';

const WALLETS = {
  USDT_TRC20: { label: 'USDT (TRC20)', address: 'TXXXXXXXXXXXXXXXXXXXXXXXXXXXXREPLACEME', qrPrefix: '' },
  ETH_ERC20: { label: 'ETH (ERC20)', address: '0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXREPLACEME', qrPrefix: 'ethereum:' },
  BTC: { label: 'BTC', address: 'bc1qXXXXXXXXXXXXXXXXXXXXXXXXXXXXXREPLACEME', qrPrefix: 'bitcoin:' },
};

const BANK_QR = {
  whatsapp: '8801748973769',
  note: 'Scan to open WhatsApp with your order pre-filled. Our team will share exact local bank/mobile wallet details and confirm your payment manually.',
};

const COURSES = [
  { id: 'linux-freelancing', name: 'Linux Freelancing Training', price: 600, hours: 180, duration: '6 Months', icon: '🐧' },
  { id: 'hermes-agent', name: 'Hermes Agent Training', price: 150, hours: 30, duration: '5 Days', icon: '☤' },
  { id: 'odysseus-ai', name: 'Odysseus AI Workspace Training', price: 200, hours: 20, duration: '5 Days', icon: '⛵' },
  { id: 'openclaw', name: 'OpenClaw Hands-on Training', price: 200, hours: 20, duration: '5 Days', icon: '🦀' },
  { id: 'localai', name: 'LocalAI Hands-on Training', price: 200, hours: 20, duration: '5 Days', icon: '🐴' },
  { id: 'zeroclaw', name: 'ZeroClaw Hands-on Training', price: 200, hours: 20, duration: '5 Days', icon: '🤖' },
  { id: 'gitlab', name: 'GitLab Hands-on Training', price: 200, hours: 20, duration: '5 Days', icon: '🦊' },
  { id: 'fusionpbx', name: 'FusionPBX VoIP Training', price: 400, hours: 20, duration: '5 Days', icon: '☎' },
  { id: 'goautodial', name: 'Goautodial VoIP Training', price: 400, hours: 20, duration: '5 Days', icon: '☎' },
  { id: 'ubuntu', name: 'Ubuntu Linux Training', price: 400, hours: 20, duration: '5 Days', icon: '🐧' },
  { id: 'centos', name: 'CentOS Linux Training', price: 400, hours: 20, duration: '5 Days', icon: '🐧' },
  { id: 'ansible-awx', name: 'Ansible AWX Training', price: 200, hours: 20, duration: '5 Days', icon: '🅰' },
  { id: 'openai-platform', name: 'OpenAI Platform Training', price: 200, hours: 20, duration: '5 Days', icon: '✦' },
  { id: 'sms-api', name: 'Telnyx/Twilio SMS API Training', price: 1100, hours: 38, duration: '1-4 Weeks', icon: '📨' },
];
