document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('dark-mode-toggle');
    
    // بررسی وضعیت ذخیره شده حالت تاریک (در صورت وجود)
    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'enabled') {
        document.documentElement.classList.add('dark');  // کلاس 'dark' به بدنه اضافه می‌شود
        toggleButton.checked = true;  // سوئیچ فعال می‌شود
    }

    // وقتی سوئیچ تغییر می‌کند
    toggleButton.addEventListener('change', () => {
        if (toggleButton.checked) {
            document.documentElement.classList.add('dark');  // افزودن کلاس 'dark'
            localStorage.setItem('dark-mode', 'enabled');  // ذخیره تنظیمات
        } else {
            document.documentElement.classList.remove('dark');  // حذف کلاس 'dark'
            localStorage.setItem('dark-mode', 'disabled');  // ذخیره تنظیمات
        }
    });
});
