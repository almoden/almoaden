const apiKey = 'YOUR_ALADHAN_API_KEY'; // استبدل بـ API Key الخاص بك إذا كنت بحاجة إلى واحد
const baseUrl = 'https://api.aladhan.com/v1/timingsByCity';

// أوقات الصلاة للمدينة المحددة
function fetchPrayerTimes(city) {
    axios.get(`${baseUrl}?city=${city}&country=LY&apikey=${apiKey}`)
        .then(response => {
            const data = response.data.data.timings;
            const prayerTimes = {
                fajr: formatTime(data.Fajr),
                dhuhr: formatTime(data.Dhuhr),
                asr: formatTime(data.Asr),
                maghrib: formatTime(data.Maghrib),
                isha: formatTime(data.Isha)
            };
            updatePrayerTimes(prayerTimes);
            checkPrayerTimes(prayerTimes);
        })
        .catch(error => {
            console.error('Error fetching prayer times:', error);
        });
}

// تنسيق الوقت
function formatTime(time) {
    return moment(time, 'HH:mm:ss').format('h:mm A');
}

// تحديث أوقات الصلاة في الصفحة
function updatePrayerTimes(prayerTimes) {
    document.getElementById('fajr-time').textContent = prayerTimes.fajr;
    document.getElementById('dhuhr-time').textContent = prayerTimes.dhuhr;
    document.getElementById('asr-time').textContent = prayerTimes.asr;
    document.getElementById('maghrib-time').textContent = prayerTimes.maghrib;
    document.getElementById('isha-time').textContent = prayerTimes.isha;
}

// التحقق من وقت الصلاة وتفعيل الصوت عند الأذان
function checkPrayerTimes(prayerTimes) {
    const now = moment().format('HH:mm:ss');
    const adhanAudio = new Audio('adhan.mp3'); // تأكد من أنك تملك ملف adhan.mp3 في مجلد المشروع

    Object.keys(prayerTimes).forEach(prayer => {
        if (now === prayerTimes[prayer]) {
            adhanAudio.play();
        }
    });
}

// تحديث أوقات الصلاة كل دقيقة
setInterval(() => {
    fetchPrayerTimes('Tripoli'); // استبدل 'Tripoli' باسم المدينة التي تريدها
}, 60000);

// قم بتحميل أوقات الصلاة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    fetchPrayerTimes('Tripoli'); // استبدل 'Tripoli' باسم المدينة التي تريدها
});