const billInput = document.getElementById("bill"); 
const customPercentInput = document.getElementById("customPercent");
const totalDisplay = document.getElementById("total"); 
const tipAmountDisplay = document.getElementById("tipAmount");
const numberPeopleInput = document.getElementById("numberPeople"); 
const buttonPercent = document.querySelectorAll(".percent");
const alertMsg= document.getElementById("alertMsg");

let tip = 0;
//aqui reconhece o numero de pessoas sendo zero ou não e caso seja uma mensagem será printada na tela// 
numberPeopleInput.addEventListener("input", function () {
    if (parseInt(numberPeopleInput.value, 10) === 0) {
      alertMsg.style.display = "block";
      numberPeopleInput.classList.add("error-in");

    } else {
        alertMsg.style.display = "none";
        numberPeopleInput.classList.remove("error-in");
    }
  });

  //aqui as strings vão ser transformadas em números para poderme ser calculadas//
  function calculateTip() {
    const billValue = parseFloat(billInput.value);
    const customPercent = parseFloat(customPercentInput.value); 
    const numberPeople = parseFloat(numberPeopleInput.value);
    const tipPercent = !isNaN(customPercent) && customPercent > 0 ? customPercent : tip;              
  if (
    !isNaN(billValue) && // aqui confirma que o numéro seja válido//
    billValue > 0 && //aqui  afirma que o numero seja positivo e maior que zero//
    !isNaN(tipPercent) && // afirma que seja um numeor valido//
    tipPercent >= 0 && //aqui verifica se o numero é maior ou igual a zero//
    !isNaN(numberPeople) && // aqui afirma que o numero seja válido//
    numberPeople > 0 //aqui verifica se o numero é maior que zero.//
    ) {
    const tipFinal = (billValue * tipPercent) / 100;  //aqui acontece o calculo da gorjeta sob o valor total da conta//
    const totalPerPerson = (billValue + tipFinal) / numberPeople; //aqui é calculado o valor final por pessoa//
    const tipPerPerson = tipFinal / numberPeople; //aqui é calculado o valor da gorjeta por pessoa//

    tipAmountDisplay.textContent = tipPerPerson.toFixed(2); //aqui o valor é arredondado para (2) casas decimais e é trasnformado em string//
    totalDisplay.textContent = totalPerPerson.toFixed(2); // aqui acontece o mesmo, arredonda o valor e o transforma em string//
  } else {
    tipAmountDisplay.textContent = "0"; //aqui caso os requisitos não sejam aplicados e para evitar resultados inválidos, será printado o número 0//
    totalDisplay.textContent = "0"; //aqui caso os requisitos não sejam aplicados e para evitar resultados inválidos, será printado o número 0//
  }
}

numberPeopleInput.addEventListener("input", calculateTip); //sempre que o usuario difitar algo no campo do input, a função de calculo será chamada//
customPercentInput.addEventListener('input', function() { //sempre que o usuario difitar algo no campo do input, a função de calculo será chamada//
  tip = this.value; // aqui é onde a porcentagem customizada que o usuário escreveu é armazenada//
});

function getPercentTip(percent){ // aqui o valor customizado é validada como um valor de percent para que o calculo aconteça//
  tip = percent;
}
const botoes = document.querySelectorAll(".percent"); //aqui toda vez que um botão for selecionado a cor do background desse botao muda//
botoes.forEach(botao => { 
    botao.addEventListener("click", () => {
        botoes.forEach(b => b.classList.remove("select")); // aqui caso outro botao da mesma classe seja selecionado, o anterior volta ao seu estado normal e o selecionado ganha essa mudança no background.//
        botao.classList.add("select");
    });
});



document.querySelector(".reset").addEventListener("click", function () { // essa é a função do reset, assim que clicado no botão reset todos os campos voltam ao seu estado original//
  document.getElementById("bill").value = "";
  document.getElementsByClassName("percent").value = "";
  document.getElementById("numberPeople").value = "" ;
  tipAmountDisplay.textContent = "$0.00";
  totalDisplay.textContent = "$0.00";
  botoes.forEach(b => b.classList.remove("select"));
  });

