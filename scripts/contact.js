document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("interactive-form");
  const contactType = document.getElementById("contact-type");
  const generalQuestions = document.getElementById("general-questions");
  const trainingQuestions = document.getElementById("training-questions");

  function toggleSectionVisibility(showSection, hideSection) {
    showSection.style.display = "block";
    hideSection.style.display = "none";

    showSection
      .querySelectorAll("input, select, textarea")
      .forEach((el) => (el.disabled = false));
    hideSection
      .querySelectorAll("input, select, textarea")
      .forEach((el) => (el.disabled = true));
  }

  // تغيير عرض النماذج حسب نوع التواصل
  contactType.addEventListener("change", function () {
    document.querySelectorAll(".error-message").forEach((msg) => {
      msg.style.display = "none";
    });

    if (this.value === "general") {
      toggleSectionVisibility(generalQuestions, trainingQuestions);
    } else if (this.value === "training") {
      toggleSectionVisibility(trainingQuestions, generalQuestions);
    } else {
      generalQuestions.style.display = "none";
      trainingQuestions.style.display = "none";

      generalQuestions
        .querySelectorAll("input, select, textarea")
        .forEach((el) => (el.disabled = true));
      trainingQuestions
        .querySelectorAll("input, select, textarea")
        .forEach((el) => (el.disabled = true));
    }
  });

  // دالة موثوقة لإرسال رسالة واتساب
  function sendWhatsAppMessage(message, phoneNumber = "96879479521") {
    try {
      // تنظيف الرقم من أي رموز غير رقمية
      const cleanPhone = phoneNumber.replace(/[^\d]/g, "");

      // تشفير الرسالة للـ URL
      const encodedMessage = encodeURIComponent(message);

      console.log("Sending message:", message.substring(0, 100) + "...");
      console.log("Phone:", cleanPhone);

      // إنشاء رابط واتساب
      const whatsappURL = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`;

      console.log("WhatsApp URL:", whatsappURL);

      // فتح رابط واتساب في نافذة جديدة
      const newWindow = window.open(whatsappURL, "_blank");

      // في حالة فشل فتح النافذة الجديدة، استخدم location.href
      if (!newWindow) {
        window.location.href = whatsappURL;
      }

      // إظهار رسالة نجاح
      showSuccessMessage("جاري فتح واتساب...");

      return true;
    } catch (error) {
      console.error("خطأ في إرسال الرسالة:", error);

      // محاولة بديلة باستخدام wa.me
      try {
        const fallbackURL = `https://wa.me/${phoneNumber.replace(
          /[^\d]/g,
          ""
        )}?text=${encodeURIComponent(message)}`;
        const fallbackWindow = window.open(fallbackURL, "_blank");

        if (!fallbackWindow) {
          window.location.href = fallbackURL;
        }

        showSuccessMessage("جاري فتح واتساب...");
        return true;
      } catch (fallbackError) {
        console.error("فشل في المحاولة البديلة:", fallbackError);
        showErrorMessage("حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.");
        return false;
      }
    }
  }

  // دالة لإظهار رسالة النجاح
  function showSuccessMessage(text) {
    const existingMsg = document.getElementById("success-message");
    if (existingMsg) {
      existingMsg.remove();
    }

    const successDiv = document.createElement("div");
    successDiv.id = "success-message";
    successDiv.className = "success-message";
    successDiv.innerHTML = `✅ ${text}`;

    document.body.appendChild(successDiv);

    setTimeout(() => {
      const msg = document.getElementById("success-message");
      if (msg) {
        msg.remove();
      }
    }, 4000);
  }

  // دالة لإظهار رسالة خطأ
  function showErrorMessage(text) {
    const existingMsg = document.getElementById("error-message");
    if (existingMsg) {
      existingMsg.remove();
    }

    const errorDiv = document.createElement("div");
    errorDiv.id = "error-message";
    errorDiv.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #ff6b6b;
                    color: white;
                    padding: 15px 25px;
                    border-radius: 8px;
                    z-index: 10000;
                    font-size: 16px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    font-family: Arial, sans-serif;
                `;
    errorDiv.innerHTML = `❌ ${text}`;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
      const msg = document.getElementById("error-message");
      if (msg) {
        msg.remove();
      }
    }, 5000);
  }

  // التحقق عند إرسال النموذج
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Form submitted");

    let isValid = true;
    let message = "";

    // إخفاء رسائل الخطأ
    document.querySelectorAll(".error-message").forEach((msg) => {
      msg.style.display = "none";
    });

    if (contactType.value === "general") {
      const name = document.getElementById("name")?.value?.trim() || "";
      const msg = document.getElementById("message")?.value?.trim() || "";

      if (!name) {
        showError("name", "يرجى إدخال الاسم");
        isValid = false;
      }
      if (!msg) {
        showError("message", "يرجى إدخال الرسالة");
        isValid = false;
      }

      if (isValid) {
        message = `🔵 استفسار عام

👤 الاسم: ${name}

💬 الرسالة: ${msg}

---
مرسل من موقع كابتن أحمد بدر`;
      }
    } else if (contactType.value === "training") {
      const getVal = (id, def = "غير محدد") => {
        const element = document.getElementById(id);
        return element ? element.value?.trim() || def : def;
      };

      const qName = getVal("q_name", "");
      const qAge = parseInt(getVal("q_age", "0"));
      const qWeight = parseFloat(getVal("q_weight", "0"));
      const qHeight = parseFloat(getVal("q_height", "0"));
      const qRoutine = getVal("q_routine", "");
      const qMaritalStatus = getVal("q_marital_status", "");
      const qDietType = getVal("q_diet_type", "");

      // التحقق من البيانات الأساسية
      if (!qName) {
        showError("q_name", "يرجى إدخال الاسم");
        isValid = false;
      }
      if (!(qAge >= 9 && qAge <= 130)) {
        showError("q_age", "يرجى إدخال عمر صحيح");
        isValid = false;
      }
      if (!(qWeight >= 30 && qWeight <= 200)) {
        showError("q_weight", "يرجى إدخال وزن صحيح");
        isValid = false;
      }
      if (!(qHeight >= 100 && qHeight <= 250)) {
        showError("q_height", "يرجى إدخال طول صحيح");
        isValid = false;
      }
      if (!qRoutine) {
        showError("q_routine", "يرجى إدخال الروتين اليومي");
        isValid = false;
      }
      if (!qMaritalStatus || qMaritalStatus === "غير محدد") {
        showError("q_marital_status", "يرجى اختيار الحالة الاجتماعية");
        isValid = false;
      }
      if (!qDietType || qDietType === "غير محدد") {
        showError("q_diet_type", "يرجى اختيار نوع النظام الغذائي");
        isValid = false;
      }

      // التحقق من الأسئلة الراديو
      const radioFields = [
        "q_injuries",
        "q_surgeries",
        "q_fractures",
        "q_heart_condition",
        "q_chest_pain_activity",
        "q_chest_pain_month",
        "q_exercised_before",
      ];

      const radioValues = {};

      radioFields.forEach((fieldName) => {
        const radio = document.querySelector(
          `input[name="${fieldName}"]:checked`
        );
        if (!radio) {
          showErrorRadio(fieldName, "يرجى اختيار إجابة");
          isValid = false;
        } else {
          radioValues[fieldName] = radio.value;
        }
      });

      // التحقق من التفاصيل الإضافية
      if (
        radioValues["q_injuries"] === "نعم" &&
        !getVal("q_injuries_details", "")
      ) {
        showError("q_injuries_details", "يرجى إدخال تفاصيل الإصابات");
        isValid = false;
      }
      if (
        radioValues["q_surgeries"] === "نعم" &&
        !getVal("q_surgeries_details", "")
      ) {
        showError("q_surgeries_details", "يرجى إدخال تفاصيل العمليات");
        isValid = false;
      }
      if (
        radioValues["q_fractures"] === "نعم" &&
        !getVal("q_fractures_details", "")
      ) {
        showError("q_fractures_details", "يرجى إدخال تفاصيل الكسور");
        isValid = false;
      }

      if (isValid) {
        message = `🏋️ طلب برنامج تدريبي

👨‍⚕️ الأسئلة العامة:
👤 الاسم: ${qName}
🎂 العمر: ${qAge} سنة
⚖️ الوزن: ${qWeight} كجم
📏 الطول: ${qHeight} سم
🏠 الروتين اليومي: ${qRoutine}
💍 الحالة الاجتماعية: ${qMaritalStatus}

🍽️ الأسئلة الغذائية:
🥗 نوع النظام الغذائي: ${qDietType}
🍞 مصادر الكربوهيدرات: ${getVal("q_carb_sources")}
🥩 مصادر البروتين: ${getVal("q_protein_sources")}
🍎 الفاكهة المفضلة: ${getVal("q_favorite_fruits")}
🥕 الخضروات المفضلة: ${getVal("q_favorite_vegetables")}
🍽️ الأكلات المفضلة: ${getVal("q_favorite_meals")}
🚫 الأكلات غير المفضلة: ${getVal("q_disliked_foods")}
🥤 المشروبات المفضلة: ${getVal("q_favorite_drinks")}
💧 كمية الماء اليومية: ${getVal("q_water_intake")}

🏥 الأسئلة الصحية:
🤕 هل تعاني من إصابات؟: ${radioValues["q_injuries"] || "غير محدد"}
📝 تفاصيل الإصابات: ${getVal("q_injuries_details")}
🏥 هل أجريت عمليات جراحية؟: ${radioValues["q_surgeries"] || "غير محدد"}
📝 تفاصيل العمليات: ${getVal("q_surgeries_details")}
🦴 هل تعرضت لكسور؟: ${radioValues["q_fractures"] || "غير محدد"}
📝 تفاصيل الكسور: ${getVal("q_fractures_details")}
❤️ هل تعاني من أمراض القلب؟: ${radioValues["q_heart_condition"] || "غير محدد"}
💔 هل تشعر بألم في الصدر أثناء النشاط؟: ${
          radioValues["q_chest_pain_activity"] || "غير محدد"
        }
💔 هل شعرت بألم في الصدر خلال الشهر الماضي؟: ${
          radioValues["q_chest_pain_month"] || "غير محدد"
        }

🏃‍♂️ الأسئلة الرياضية:
🏋️‍♂️ هل مارست الرياضة من قبل؟: ${radioValues["q_exercised_before"] || "غير محدد"}
⚽ الرياضة المفضلة: ${getVal("q_favorite_sport")}

---
مرسل من موقع كابتن أحمد بدر`;
      }
    } else {
      showError("contact-type", "يرجى اختيار نوع التواصل");
      isValid = false;
    }

    // إرسال الرسالة
    if (isValid && message.trim()) {
      console.log("Message ready to send:", message.substring(0, 200) + "...");
      const success = sendWhatsAppMessage(message);

      if (success) {
        // إعادة تعيين النموذج بعد الإرسال الناجح
        setTimeout(() => {
          form.reset();
          generalQuestions.style.display = "none";
          trainingQuestions.style.display = "none";

          // إغلاق جميع الأكورديونات
          document.querySelectorAll(".accordion-content").forEach((content) => {
            content.style.display = "none";
          });
          document.querySelectorAll(".accordion-button").forEach((button) => {
            button.classList.remove("active");
            button.setAttribute("aria-expanded", "false");
          });
        }, 2000);
      }
    } else {
      console.log("Form validation failed or message is empty");
      if (!message.trim()) {
        showErrorMessage("حدث خطأ في إنشاء الرسالة");
      }
    }
  });

  function showError(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    if (field) {
      const errorElement = field.nextElementSibling;
      if (errorElement && errorElement.classList.contains("error-message")) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = "block";

        // التمرير إلى الحقل الذي به خطأ
        field.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  function showErrorRadio(fieldName, errorMessage) {
    const field = document.querySelector(`input[name="${fieldName}"]`);
    if (field) {
      const formGroup = field.closest(".form-group");
      if (formGroup) {
        const errorElement = formGroup.querySelector(".error-message");
        if (errorElement) {
          errorElement.textContent = errorMessage;
          errorElement.style.display = "block";

          // التمرير إلى الحقل الذي به خطأ
          formGroup.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  }

  // أكورديون
  document.querySelectorAll(".accordion-button").forEach((button) => {
    button.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const isOpen = this.getAttribute("aria-expanded") === "true";

      this.setAttribute("aria-expanded", isOpen ? "false" : "true");
      content.style.display = isOpen ? "none" : "block";
      this.classList.toggle("active");
    });
  });
});
