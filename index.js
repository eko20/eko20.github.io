$(document).ready(function () {
  const rangeInput = $("#rangeInput");
  const rangeValue = $("#rangeValue");
  const generate = $(".btnn");
  const checkBoxPun = $("#flexCheckChecked1");
  const checkBoxMix = $("#flexCheckChecked2");
  const passwordContainer = $(".passwords");

  rangeInput.on("input", function () {
    const value = $(this).val();
    rangeValue.text(value);
  });

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

    const array = new Uint32Array(length)
    window.crypto.getRandomValues(array)

    for (let i = 0; i < length; i++) {
        password += charathers[array[i] % charathers.length];
        
    }
    
    return password;

  }

  generate.click(function() {
    const password = generatePassword();
    passwordContainer.text(password);

  });
  

});
