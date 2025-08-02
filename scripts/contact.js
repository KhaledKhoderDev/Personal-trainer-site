document.addEventListener("DOMContentLoaded", function () {
  // Detect language from HTML lang attribute or default to English
  const isArabic =
    document.documentElement.lang === "ar" ||
    document.body.classList.contains("arabic");

  const form = document.getElementById("interactive-form");
  const contactType = document.getElementById("contact-type");
  const generalQuestions = document.getElementById("general-questions");
  const trainingQuestions = document.getElementById("training-questions");

  // Language-specific text
  const texts = {
    ar: {
      openingWhatsApp: "جاري فتح واتساب...",
      errorSending: "حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      errorCreating: "حدث خطأ في إنشاء الرسالة",
      enterName: "يرجى إدخال الاسم",
      enterMessage: "يرجى إدخال الرسالة",
      validAge: "يرجى إدخال عمر صحيح",
      validWeight: "يرجى إدخال وزن صحيح",
      validHeight: "يرجى إدخال طول صحيح",
      enterRoutine: "يرجى إدخال الروتين اليومي",
      selectMaritalStatus: "يرجى اختيار الحالة الاجتماعية",
      selectDietType: "يرجى اختيار نوع النظام الغذائي",
      selectAnswer: "يرجى اختيار إجابة",
      enterInjuryDetails: "يرجى إدخال تفاصيل الإصابات",
      enterSurgeryDetails: "يرجى إدخال تفاصيل العمليات",
      enterFractureDetails: "يرجى إدخال تفاصيل الكسور",
      selectContactType: "يرجى اختيار نوع التواصل",
      notSpecified: "غير محدد",
      generalInquiry:
        "🔵 استفسار عام\n\n👤 الاسم: {name}\n\n💬 الرسالة: {message}\n\n---\nمرسل من موقع كابتن أحمد بدر",
      trainingRequest: `🏋️ طلب برنامج تدريبي

👨‍⚕️ الأسئلة العامة:
👤 الاسم: {name}
🎂 العمر: {age} سنة
⚖️ الوزن: {weight} كجم
📏 الطول: {height} سم
🏠 الروتين اليومي: {routine}
💍 الحالة الاجتماعية: {maritalStatus}

🍽️ الأسئلة الغذائية:
🥗 نوع النظام الغذائي: {dietType}
🍞 مصادر الكربوهيدرات: {carbSources}
🥩 مصادر البروتين: {proteinSources}
🍎 الفاكهة المفضلة: {favoriteFruits}
🥕 الخضروات المفضلة: {favoriteVegetables}
🍽️ الأكلات المفضلة: {favoriteMeals}
🚫 الأكلات غير المفضلة: {dislikedFoods}
🥤 المشروبات المفضلة: {favoriteDrinks}
💧 كمية الماء اليومية: {waterIntake}

 الأسئلة الصحية:
🤕 هل تعاني من إصابات؟: {injuries}
📝 تفاصيل الإصابات: {injuriesDetails}
 هل أجريت عمليات جراحية؟: {surgeries}
📝 تفاصيل العمليات: {surgeriesDetails}
🦴 هل تعرضت لكسور؟: {fractures}
📝 تفاصيل الكسور: {fracturesDetails}
❤️ هل تعاني من أمراض القلب؟: {heartCondition}
💔 هل تشعر بألم في الصدر أثناء النشاط؟: {chestPainActivity}
💔 هل شعرت بألم في الصدر خلال الشهر الماضي؟: {chestPainMonth}

🏃‍♂️ الأسئلة الرياضية:
🏋️‍♂️ هل مارست الرياضة من قبل؟: {exercisedBefore}
⚽ الرياضة المفضلة: {favoriteSport}

---
مرسل من موقع كابتن أحمد بدر`,
    },
    en: {
      openingWhatsApp: "Opening WhatsApp...",
      errorSending:
        "An error occurred while sending the message. Please try again.",
      errorCreating: "An error occurred while creating the message",
      enterName: "Please enter your name",
      enterMessage: "Please enter your message",
      validAge: "Please enter a valid age",
      validWeight: "Please enter a valid weight",
      validHeight: "Please enter a valid height",
      enterRoutine: "Please enter your daily routine",
      selectMaritalStatus: "Please select your marital status",
      selectDietType: "Please select your diet type",
      selectAnswer: "Please select an answer",
      enterInjuryDetails: "Please enter injury details",
      enterSurgeryDetails: "Please enter surgery details",
      enterFractureDetails: "Please enter fracture details",
      selectContactType: "Please select contact type",
      notSpecified: "Not specified",
      generalInquiry:
        "🔵 General Inquiry\n\n👤 Name: {name}\n\n💬 Message: {message}\n\n---\nSent from Captain Ahmed Badr's website",
      trainingRequest: `🏋️ Training Program Request

👨‍⚕️ General Information:
👤 Name: {name}
🎂 Age: {age} years
⚖️ Weight: {weight} kg
📏 Height: {height} cm
🏠 Daily Routine: {routine}
💍 Marital Status: {maritalStatus}

🍽️ Dietary Information:
🥗 Diet Type: {dietType}
🍞 Carbohydrate Sources: {carbSources}
🥩 Protein Sources: {proteinSources}
🍎 Favorite Fruits: {favoriteFruits}
🥕 Favorite Vegetables: {favoriteVegetables}
🍽️ Favorite Meals: {favoriteMeals}
🚫 Disliked Foods: {dislikedFoods}
🥤 Favorite Drinks: {favoriteDrinks}
💧 Daily Water Intake: {waterIntake}

 Health Information:
🤕 Do you have any injuries?: {injuries}
📝 Injury Details: {injuriesDetails}
 Have you had any surgeries?: {surgeries}
📝 Surgery Details: {surgeriesDetails}
🦴 Have you had any fractures?: {fractures}
📝 Fracture Details: {fracturesDetails}
❤️ Do you have heart conditions?: {heartCondition}
💔 Do you feel chest pain during activity?: {chestPainActivity}
💔 Have you felt chest pain in the past month?: {chestPainMonth}

🏃‍♂️ Exercise Information:
🏋️‍♂️ Have you exercised before?: {exercisedBefore}
⚽ Favorite Sport: {favoriteSport}

---
Sent from Captain Ahmed Badr's website`,
    },
  };

  const t = texts[isArabic ? "ar" : "en"];

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

  // Toggle form display based on contact type
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

  // Reliable function to send WhatsApp message
  function sendWhatsAppMessage(message, phoneNumber = "96879479521") {
    try {
      // Clean phone number from any non-numeric characters
      const cleanPhone = phoneNumber.replace(/[^\d]/g, "");

      // Encode message for URL
      const encodedMessage = encodeURIComponent(message);

      console.log("Sending message:", message.substring(0, 100) + "...");
      console.log("Phone:", cleanPhone);

      // Create WhatsApp link
      const whatsappURL = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`;

      console.log("WhatsApp URL:", whatsappURL);

      // Open WhatsApp link in new window
      const newWindow = window.open(whatsappURL, "_blank");

      // If opening new window fails, use location.href
      if (!newWindow) {
        window.location.href = whatsappURL;
      }

      // Show success message
      showSuccessMessage(t.openingWhatsApp);

      return true;
    } catch (error) {
      console.error("Error sending message:", error);

      // Fallback attempt using wa.me
      try {
        const fallbackURL = `https://wa.me/${phoneNumber.replace(
          /[^\d]/g,
          ""
        )}?text=${encodeURIComponent(message)}`;
        const fallbackWindow = window.open(fallbackURL, "_blank");

        if (!fallbackWindow) {
          window.location.href = fallbackURL;
        }

        showSuccessMessage(t.openingWhatsApp);
        return true;
      } catch (fallbackError) {
        console.error("Fallback attempt failed:", fallbackError);
        showErrorMessage(t.errorSending);
        return false;
      }
    }
  }

  // Function to show success message
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

  // Function to show error message
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

  // Validation on form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Form submitted");

    let isValid = true;
    let message = "";

    // Hide error messages
    document.querySelectorAll(".error-message").forEach((msg) => {
      msg.style.display = "none";
    });

    if (contactType.value === "general") {
      const name = document.getElementById("name")?.value?.trim() || "";
      const msg = document.getElementById("message")?.value?.trim() || "";

      if (!name) {
        showError("name", t.enterName);
        isValid = false;
      }
      if (!msg) {
        showError("message", t.enterMessage);
        isValid = false;
      }

      if (isValid) {
        message = t.generalInquiry
          .replace("{name}", name)
          .replace("{message}", msg);
      }
    } else if (contactType.value === "training") {
      const getVal = (id, def = t.notSpecified) => {
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

      // Validate basic information
      if (!qName) {
        showError("q_name", t.enterName);
        isValid = false;
      }
      if (!(qAge >= 9 && qAge <= 130)) {
        showError("q_age", t.validAge);
        isValid = false;
      }
      if (!(qWeight >= 30 && qWeight <= 200)) {
        showError("q_weight", t.validWeight);
        isValid = false;
      }
      if (!(qHeight >= 100 && qHeight <= 250)) {
        showError("q_height", t.validHeight);
        isValid = false;
      }
      if (!qRoutine) {
        showError("q_routine", t.enterRoutine);
        isValid = false;
      }
      if (!qMaritalStatus || qMaritalStatus === t.notSpecified) {
        showError("q_marital_status", t.selectMaritalStatus);
        isValid = false;
      }
      if (!qDietType || qDietType === t.notSpecified) {
        showError("q_diet_type", t.selectDietType);
        isValid = false;
      }

      // Validate radio button fields
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
          showErrorRadio(fieldName, t.selectAnswer);
          isValid = false;
        } else {
          radioValues[fieldName] = radio.value;
        }
      });

      // Validate additional details
      const yesValue = isArabic ? "نعم" : "Yes";
      if (
        radioValues["q_injuries"] === yesValue &&
        !getVal("q_injuries_details", "")
      ) {
        showError("q_injuries_details", t.enterInjuryDetails);
        isValid = false;
      }
      if (
        radioValues["q_surgeries"] === yesValue &&
        !getVal("q_surgeries_details", "")
      ) {
        showError("q_surgeries_details", t.enterSurgeryDetails);
        isValid = false;
      }
      if (
        radioValues["q_fractures"] === yesValue &&
        !getVal("q_fractures_details", "")
      ) {
        showError("q_fractures_details", t.enterFractureDetails);
        isValid = false;
      }

      if (isValid) {
        message = t.trainingRequest
          .replace("{name}", qName)
          .replace("{age}", qAge)
          .replace("{weight}", qWeight)
          .replace("{height}", qHeight)
          .replace("{routine}", qRoutine)
          .replace("{maritalStatus}", qMaritalStatus)
          .replace("{dietType}", qDietType)
          .replace("{carbSources}", getVal("q_carb_sources"))
          .replace("{proteinSources}", getVal("q_protein_sources"))
          .replace("{favoriteFruits}", getVal("q_favorite_fruits"))
          .replace("{favoriteVegetables}", getVal("q_favorite_vegetables"))
          .replace("{favoriteMeals}", getVal("q_favorite_meals"))
          .replace("{dislikedFoods}", getVal("q_disliked_foods"))
          .replace("{favoriteDrinks}", getVal("q_favorite_drinks"))
          .replace("{waterIntake}", getVal("q_water_intake"))
          .replace("{injuries}", radioValues["q_injuries"] || t.notSpecified)
          .replace("{injuriesDetails}", getVal("q_injuries_details"))
          .replace("{surgeries}", radioValues["q_surgeries"] || t.notSpecified)
          .replace("{surgeriesDetails}", getVal("q_surgeries_details"))
          .replace("{fractures}", radioValues["q_fractures"] || t.notSpecified)
          .replace("{fracturesDetails}", getVal("q_fractures_details"))
          .replace(
            "{heartCondition}",
            radioValues["q_heart_condition"] || t.notSpecified
          )
          .replace(
            "{chestPainActivity}",
            radioValues["q_chest_pain_activity"] || t.notSpecified
          )
          .replace(
            "{chestPainMonth}",
            radioValues["q_chest_pain_month"] || t.notSpecified
          )
          .replace(
            "{exercisedBefore}",
            radioValues["q_exercised_before"] || t.notSpecified
          )
          .replace("{favoriteSport}", getVal("q_favorite_sport"));
      }
    } else {
      showError("contact-type", t.selectContactType);
      isValid = false;
    }

    // Send the message
    if (isValid && message.trim()) {
      console.log("Message ready to send:", message.substring(0, 200) + "...");
      const success = sendWhatsAppMessage(message);

      if (success) {
        // Reset form after successful submission
        setTimeout(() => {
          form.reset();
          generalQuestions.style.display = "none";
          trainingQuestions.style.display = "none";

          // Close all accordions
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
        showErrorMessage(t.errorCreating);
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

        // Scroll to the field with error
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

          // Scroll to the field with error
          formGroup.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  }

  // Accordion functionality
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
