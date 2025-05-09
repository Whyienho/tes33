let data = [];

const audioSuccess = new Audio('success.mp3');
const audioFail = new Audio('fail.mp3');

fetch('jadwal.json')
  .then(response => response.json())
  .then(json => data = json)
  .catch(error => console.error('Gagal memuat data:', error));

function cekKelulusan() {
  const nisn = document.getElementById('nisn').value.trim();
  const password = document.getElementById('password').value.trim();
  const hasilDiv = document.getElementById('hasil');

  const result = data.find(item => item.NISN === nisn && item.PASSWORD === password);

  if (result) {
    // Tampilkan informasi jadwal tes
    hasilDiv.innerHTML = `
      <div class="success">
        <i class="fas fa-calendar-alt"></i> Jadwal Tes Anda:<br><br>
        <strong>Nama:</strong> ${result["NAMA LENGKAP"]}<br>
        <strong>Hari / Tanggal:</strong> ${result["HARI / TANGGAL"]}<br>
        <strong>Waktu:</strong> ${result["WAKTU"]}<br>
        <strong>Lokasi:</strong> ${result["LOKASI"]}
      </div>
    `;
  } else {
    hasilDiv.innerHTML = `
      <div class="fail">
        <i class="fas fa-times-circle"></i> NISN atau Password salah.
      </div>
    `;
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "Enter") cekKelulusan();
});


document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  const icon = this;

  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  icon.classList.toggle("fa-eye", !isPassword);
  icon.classList.toggle("fa-eye-slash", isPassword);
});