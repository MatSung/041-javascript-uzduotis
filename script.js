
let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function(){submitMe()});



// document.querySelector('input[name="group-radio"]:checked').value;

//data example

let dataExample = ["Vardas", "Pavarde", 20, "+37060000000", "me@me.me", 10, "CAFS 1gr."];


function submitMe() {
    let nameInput = document.getElementById("name");
    let surnameInput = document.getElementById("surname");
    let ageInput = document.getElementById("age");
    let phoneInput = document.getElementById("phone");
    let emailInput = document.getElementById("email");
    let rangeInput = document.getElementById("rating");

    let input = [];
    input.push(nameInput.value);
    input.push(surnameInput.value);
    input.push(ageInput.value);
    input.push(phoneInput.value);
    input.push(emailInput.value);
    input.push(rangeInput.value);

    let groupValue = document.querySelector('input[name="group-radio"]:checked').value;
    let groupName = document.getElementById("group-select-label-" + groupValue).innerText;

    input.push(groupName);

    createStudentItem(input);

}

function createStudentItem(data) {
    
}

