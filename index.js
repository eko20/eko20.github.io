$(document).ready(function () {
  const rangeInput = $("#rangeInput");
  const rangeValue = $("#rangeValue");
  const copy = $(".copy");
  const refresh = $(".refresh");
  const checkBoxPun = $("#flexCheckChecked1");
  const checkBoxMix = $("#flexCheckChecked2");
  const passwordContainer = $(".passwords");

  function generatePassword() {
    const length = rangeInput.val();
    const includePun = checkBoxPun.prop("checked");
    const includeMix = checkBoxMix.prop("checked");

    const upperCase = "ABCDEFGHIJKLMNOPRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnoprstuvwxyz";
    const number = "1234567890";
    const punctation = "!'.;,:?_-`¨";
    const mixedCase = "^+%&/()=*<>}][{½$#£@€ßæ";

    let password = " ";
    let charathers = upperCase + lowerCase + number;
    if (includePun) {
      charathers += punctation;
    }
    if (includeMix) {
      charathers += mixedCase;
    }

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      password += charathers[array[i] % charathers.length];
    }

    return password;
  }

  function passwordWrite() {
    const password = generatePassword();
    passwordContainer.text(password);
    passwordDifficulty();
  }

  function passwordDifficulty() {
    let passDif = "very strong";
    $(".strong").css("color", "red");
    const length = parseInt(rangeInput.val(), 10);

    if (length >= 15 && length < 20) {
      passDif = "strong";
      $(".strong").css("color", "red");
    } else if (length >= 10 && length < 15) {
      passDif = "good";
      $(".strong").css("color", "blue");
    } else if (length >= 5 && length < 10) {
      passDif = "weak";
      $(".strong").css("color", "green");
    }
    $(".strong").text(passDif);
  }

  rangeInput.on("input", function () {
    const value = $(this).val();
    rangeValue.text(value);
    passwordWrite();
  });

  checkBoxMix.click(function () {
    passwordWrite();
  });

  checkBoxPun.click(function () {
    passwordWrite();
  });

  passwordWrite();

  function copiedText() {
    let currentPassword = passwordContainer.text();
    let copy = "!!! Copied !!!";
    
    passwordContainer.hide().fadeIn(600).text(copy);
    
    setTimeout(function() {
      passwordContainer.fadeOut(600, function() {
        passwordContainer.text(currentPassword).fadeIn(600);
      });
    }, 1500);
  }
  
  copy.on("click", function () {
    let copyText = $(".passwords");
    let curentPassword = copyText.text();

    navigator.clipboard
      .writeText(curentPassword)
      .then(function () {
        console.log("Text copied to clipboard");
      })
      .catch(function (error) {
        console.error("Unable to copy text to clipboard:", error);
      });

    copiedText();

  });

  refresh.click(function () {
    var icon = $(this).find("i");

    if (!icon.hasClass("spin")) {
      icon.addClass("spin");
      setTimeout(function () {
        icon.removeClass("spin");
      }, 300);
    }

    passwordWrite();
  });
});
