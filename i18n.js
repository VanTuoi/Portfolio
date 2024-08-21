const i18n = {
  locale: "en", // Ngôn ngữ mặc định
  locales: {},

  loadLocaleData: async function () {
    const response = await fetch(`./locales/${this.locale}.json`);
    this.locales = await response.json();
    this.updateText();
  },

  updateText: function () {
    document.querySelectorAll("[data-i18n-key]").forEach((element) => {
      const key = element.getAttribute("data-i18n-key");
      const value = this.locales[key];

      if (Array.isArray(value)) {
        // Tạo chuỗi HTML với dấu chấm tròn trước mỗi mục
        element.innerHTML = value.map((item) => `• ${item} `).join("");
      } else {
        element.innerText = value;
      }
    });
  },

  setLocale: function (newLocale) {
    this.locale = newLocale;
    this.loadLocaleData();
  },
};

// Khởi tạo ngôn ngữ khi trang tải
document.addEventListener("DOMContentLoaded", () => {
  i18n.loadLocaleData();
});
