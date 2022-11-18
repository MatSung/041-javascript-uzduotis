
let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function(){submitMe()});



// document.querySelector('input[name="group-radio"]:checked').value;

//data example

let dataExample = ["Vardas", "Pavarde", 20, "+37060000000", "me@me.me", 10, "CAFS 1gr."];
let dataFormat = ["name", "surname", "age", "phone", "email", "rating", "group"]


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
    input.push(rangeInput.value + '/10');

    let groupValue = document.querySelector('input[name="group-radio"]:checked').value;
    let groupName = document.getElementById("group-select-label-" + groupValue).innerText;

    input.push(groupName);

    createStudentItem(input);

}

function createStudentItem(data) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("student-list-item");



    data.forEach((element, index) => {
        let newSpan = document.createElement("span");
        newSpan.classList.add("student-" + dataFormat[index]);

        newSpan.innerText = element;
        newDiv.append(newSpan);
    });

    let studentList = document.getElementById("student-list");
    studentList.append(newDiv);
}

