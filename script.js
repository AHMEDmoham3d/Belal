// بيانات اللاعبين
const playersData = {
  'login001': { name: 'لوجين أحمد', points: 0, absences: 0, rank: 1 },
  'adam002': { name: 'آدم هاني', points: 0, absences: 0, rank: 2 },
  'ahmed003': { name: 'أحمد عطية', points: 0, absences: 0, rank: 3 },
  'retag004': { name: 'ريتاج أحمد', points: 0, absences: 0, rank: 4 },
  'omar005': { name: 'عمر عادل', points: 0, absences: 0, rank: 5 },
  'retag006': { name: 'ريتاج محمود', points: 0, absences: 0, rank: 6 },
  'judy007': { name: 'جودي محمود', points: 0, absences: 0, rank: 7 },
  'malak008': { name: 'ملك أيمن', points: 0, absences: 0, rank: 8 },
  'remas009': { name: 'ريماس طارق', points: 0, absences: 0, rank: 9 },
  'malak010': { name: 'ملك محمود السيد', points: 0, absences: 0, rank: 10 },
  'iten011': { name: 'إيتن فتحي', points: 0, absences: 0, rank: 11 },
  'mohamed012': { name: 'محمد عبد التام', points: 0, absences: 0, rank: 12 },
  'farah013': { name: 'فرح عادل', points: 150, absences: 0, rank: 13 },
  'nada014': { name: 'ندى أنور', points: 0, absences: 0, rank: 14 },
  'noreen015': { name: 'نورين محمود', points: 0, absences: 0, rank: 15 },
  'sama016': { name: 'سما وليد', points: 0, absences: 0, rank: 16 },
  'rodina017': { name: 'رودينا إسلام', points: 0, absences: 0, rank: 17 },
  'nelly018': { name: 'نيللي محمود', points: 0, absences: 0, rank: 18 },
  'taha019': { name: 'طه إسلام طه', points: 0, absences: 0, rank: 19 },
  'adel020': { name: 'عادل صبري', points: 0, absences: 0, rank: 20 },
  'mohamedsaid021': { name: 'محمد سعيد', points: 0, absences: 0, rank: 21 },
  'Afnan022': { name: 'أفنان عادل', points: 0, absences: 0, rank: 22 },
  'yasen000': { name: 'ياسين احمد', points: 0, absences: 0, rank: 23 },
  'Hanen787': { name: 'حنين شوقى', points: 0, absences: 0, rank: 24 },
  'tark111': { name: 'محمد طارق', points: 0, absences: 0, rank: 0, isAdmin: true },
  'Belal': { name: 'بلال محمد', points: 0, absences: 0, rank: 0, isAdmin: true }
};

// تهيئة الجسيمات في الخلفية
document.addEventListener('DOMContentLoaded', function() {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      }
    }
  });
  
  // إضافة تأثير للعناصر عند التحميل
  const inputGroup = document.querySelector('.input-group');
  setTimeout(() => {
    inputGroup.classList.add('animate__fadeInUp');
  }, 300);
});

// تسجيل الدخول
function login() {
  const inputId = document.getElementById('playerId').value.trim();
  const player = playersData[inputId];
  
  if (player) {
    // إخفاء شاشة الدخول بتأثير
    const loginCard = document.getElementById('loginCard');
    loginCard.classList.add('animate__fadeOut');
    
    setTimeout(() => {
      loginCard.style.display = 'none';
      
      // تعبئة بيانات اللاعب
      document.getElementById('playerName').textContent = player.name;
      document.getElementById('playerPoints').textContent = player.points;
      document.getElementById('playerAbsences').textContent = player.absences;
      document.getElementById('playerRank').textContent = player.rank;
      
      // إذا كان المدرب أو المسؤول
      if (player.isAdmin) {
        showAllPlayersStats();
      } else {
        // عرض شاشة الملف الشخصي العادية بتأثير
        const profileCard = document.getElementById('profileCard');
        profileCard.style.display = 'block';
        profileCard.classList.add('animate__fadeIn');
        
        // تحريك العناصر بشكل متتابع
        animateElements([
          '.profile-header',
          '.stats-container',
          '.progress-container',
          '.quick-actions',
          '.resources-section',
          '.logout-btn'
        ]);
      }
      
      // تحديث شريط التقدم
      updateProgressBars();
    }, 300);
  } else {
    showModal('خطأ', 'المعرف غير صحيح، يرجى المحاولة مرة أخرى', 'error');
  }
}

// عرض إحصائيات جميع اللاعبين للمدربين
function showAllPlayersStats() {
  const profileCard = document.getElementById('profileCard');
  profileCard.style.display = 'block';
  profileCard.classList.add('animate__fadeIn');
  
  // إنشاء جدول لإحصائيات اللاعبين
  let statsHTML = `
    <div class="all-players-stats animate__animated animate__fadeIn">
      <h3><i class="fas fa-users"></i> إحصائيات جميع اللاعبين</h3>
      <div class="stats-table-container">
        <table class="stats-table">
          <thead>
            <tr>
              <th>الترتيب</th>
              <th>الاسم</th>
              <th>النقاط</th>
              <th>الغيابات</th>
            </tr>
          </thead>
          <tbody>
  `;
  
  // ترتيب اللاعبين حسب النقاط (تنازلياً)
  const sortedPlayers = Object.values(playersData)
    .filter(player => !player.isAdmin) // استبعاد المدربين من القائمة
    .sort((a, b) => b.points - a.points);
  
  // إضافة بيانات كل لاعب إلى الجدول
  sortedPlayers.forEach((player, index) => {
    statsHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${player.name}</td>
        <td>${player.points}</td>
        <td>${player.absences}</td>
      </tr>
    `;
  });
  
  statsHTML += `
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  // إضافة الجدول إلى بطاقة الملف الشخصي
  profileCard.innerHTML = `
    <div class="profile-header animate__animated">
      <div class="avatar-container">
        <div class="avatar-circle">
          <i class="fas fa-user-tie"></i>
        </div>
      </div>
      <h2>${playersData[document.getElementById('playerId').value.trim()].name}</h2>
      <div class="belt-level">
        <div class="belt-progress" id="beltProgress"></div>
        <span>مدرب النظام</span>
      </div>
    </div>
    ${statsHTML}
    <button class="logout-btn animate__animated" onclick="logout()">
      <i class="fas fa-sign-out-alt"></i> تسجيل الخروج
    </button>
  `;
  
  // تحريك العناصر بشكل متتابع
  animateElements([
    '.profile-header',
    '.all-players-stats',
    '.logout-btn'
  ]);
}

// تسجيل الخروج
function logout() {
  const profileCard = document.getElementById('profileCard');
  profileCard.classList.add('animate__fadeOut');
  
  setTimeout(() => {
    profileCard.style.display = 'none';
    const loginCard = document.getElementById('loginCard');
    loginCard.style.display = 'block';
    loginCard.classList.remove('animate__fadeOut');
    loginCard.classList.add('animate__fadeIn');
    
    // مسح حقل الإدخال
    document.getElementById('playerId').value = '';
  }, 300);
}

// إضافة نقاط
function addPoints() {
  const inputId = document.getElementById('playerId').value.trim();
  const player = playersData[inputId];
  
  if (player) {
    player.points += 10;
    document.getElementById('playerPoints').textContent = player.points;
    updateProgressBars();
    showModal('نجاح', 'تم إضافة 10 نقاط بنجاح', 'success');
  }
}

// إضافة غياب
function addAbsence() {
  const inputId = document.getElementById('playerId').value.trim();
  const player = playersData[inputId];
  
  if (player) {
    player.absences += 1;
    document.getElementById('playerAbsences').textContent = player.absences;
    updateProgressBars();
    showModal('تنبيه', 'تم تسجيل غياب للاعب', 'warning');
  }
}

// فتح مصدر تعليمي
function openResource(type) {
  let title = '';
  let message = '';
  
  switch(type) {
    case 'kata':
      title = 'تمارين الكاتا';
      message = 'سيتم فتح قسم تمارين الكاتا قريباً';
      break;
    case 'kihon':
      title = 'أساسيات الكيهون';
      message = 'سيتم فتح قسم أساسيات الكيهون قريباً';
      break;
    case 'kumite':
      title = 'تمارين الكوميتيه';
      message = 'سيتم فتح قسم تمارين الكوميتيه قريباً';
      break;
    case 'rules':
      title = 'قواعد البطولات';
      message = 'سيتم فتح قسم قواعد البطولات قريباً';
      break;
  }
  
  showModal(title, message, 'info');
}

// عرض نافذة التنبيه
function showModal(title, message, type) {
  const modal = document.getElementById('modalOverlay');
  const modalBox = document.getElementById('modalBox');
  const modalIcon = document.getElementById('modalIcon');
  
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMessage').textContent = message;
  
  // تغيير الأيقونة حسب نوع التنبيه
  modalIcon.className = 'modal-icon';
  switch(type) {
    case 'error':
      modalIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
      modalIcon.style.backgroundColor = 'rgba(230, 57, 70, 0.1)';
      modalIcon.style.color = 'var(--error-color)';
      break;
    case 'success':
      modalIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
      modalIcon.style.backgroundColor = 'rgba(42, 157, 143, 0.1)';
      modalIcon.style.color = 'var(--success-color)';
      break;
    case 'warning':
      modalIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
      modalIcon.style.backgroundColor = 'rgba(233, 196, 106, 0.1)';
      modalIcon.style.color = 'var(--warning-color)';
      break;
    case 'info':
      modalIcon.innerHTML = '<i class="fas fa-info-circle"></i>';
      modalIcon.style.backgroundColor = 'rgba(29, 53, 87, 0.1)';
      modalIcon.style.color = 'var(--secondary-color)';
      break;
  }
  
  modal.style.display = 'flex';
  modalBox.classList.add('animate__bounceIn');
}

// إغلاق نافذة التنبيه
function closeModal() {
  const modal = document.getElementById('modalOverlay');
  const modalBox = document.getElementById('modalBox');
  
  modalBox.classList.remove('animate__bounceIn');
  modalBox.classList.add('animate__fadeOut');
  
  setTimeout(() => {
    modal.style.display = 'none';
    modalBox.classList.remove('animate__fadeOut');
  }, 300);
}

// تحريك العناصر بشكل متتابع
function animateElements(selectors) {
  selectors.forEach((selector, index) => {
    const element = document.querySelector(selector);
    if (element) {
      setTimeout(() => {
        element.classList.add('animate__fadeInUp');
      }, index * 100);
    }
  });
}

// تحديث أشرطة التقدم
function updateProgressBars() {
  const inputId = document.getElementById('playerId').value.trim();
  const player = playersData[inputId];
  
  if (player && !player.isAdmin) {
    // حساب نسبة التقدم الأسبوعي (عشوائي للتوضيح)
    const weekProgress = Math.min(player.points / 100 * 10, 100);
    document.getElementById('weekProgress').style.width = `${weekProgress}%`;
    
    // حساب تقدم الحزام (عشوائي للتوضيح)
    const beltProgress = Math.min(player.points / 500 * 100, 100);
    document.querySelector('.belt-progress').style.width = `${beltProgress}%`;
  }
}