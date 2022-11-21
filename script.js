


// document.querySelector('input[name="group-radio"]:checked').value;

//data example

const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

let dataExample = ["Vardas", "Pavarde", 20, "+37060000000", "me@me.me", 10, "CAFS 1gr.", ['Python','C++']];
let dataFormat = ["name", "surname", "age", "phone", "email", "rating", "group", "languages"]

let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function () { submitMe() });

let successContainer = document.getElementById("success-container");
let successSpan = document.getElementById("success-span");

let studentArray = [];


function submitMe() {
    let nameInput = document.getElementById("name");
    let surnameInput = document.getElementById("surname");
    let ageInput = document.getElementById("age");
    let phoneInput = document.getElementById("phone");
    let emailInput = document.getElementById("email");
    let rangeInput = document.getElementById("rating");
    let checkboxesElements = [...document.getElementsByClassName("checkbox-select")];
    // console.log(checkboxesElements);

    let input = [];
    input.push(nameInput.value);
    input.push(surnameInput.value);
    input.push(ageInput.value);
    input.push(phoneInput.value);
    input.push(emailInput.value);
    input.push(rangeInput.value + '/10');

    //push groups
    let groupValue = document.querySelector('input[name="group-radio"]:checked').value;
    let groupName = document.getElementById("group-select-label-" + groupValue).innerText;

    input.push(groupName);

    //push languages
    let languagesValues = [];

    checkboxesElements.forEach(element => {
        if (element.checked) languagesValues.push(element.value)
    });

    input.push(languagesValues);

    console.log(input);

    createStudentItem(input);

    successSpan.innerText = `Pridėtas studentas ${input[0]} ${input[1]}`;
    showSuccess();

}

function createStudentItem(data) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("student-list-item");



    data.forEach((element, index) => {


        if (typeof element == "object") {
            let languagesDiv = document.createElement("div");
            languagesDiv.classList.add("student-list-item-languages");

            element.forEach(element => {
                let newSpan = document.createElement("span");
                newSpan.classList.add("student-" + dataFormat[index]);
                newSpan.innerText = element;
                languagesDiv.append(newSpan);
            });
            newDiv.append(languagesDiv);
            return;
        }
        let newSpan = document.createElement("span");
        newSpan.classList.add("student-" + dataFormat[index]);
        newSpan.innerText = element;
        if(dataFormat[index] == "email") {
            newSpan.innerText = "Paslėptas";    
        }
        newDiv.append(newSpan);
    });

    //add hide details button
    let hideDetailsButton = document.createElement("button");
    hideDetailsButton.innerText = "Rodyti asmens duomenis";
    hideDetailsButton.classList.add("show-details-button");
    hideDetailsButton.setAttribute("onclick", "toggleEmail(this);");
    hideDetailsButton.setAttribute("__status", "hidden");
    
    //student array length will need to be checked when fetching array from memory
    hideDetailsButton.setAttribute("__index", studentArray.length);
    
    newDiv.append(hideDetailsButton);


    studentArray.push(data);

    let studentList = document.getElementById("student-list");
    studentList.append(newDiv);
}

const showSuccess = async () => {
        submitButton.toggleAttribute("disabled");
        successContainer.toggleAttribute("hidden");
        console.log("disabled");


        await sleep(1000);
        
        submitButton.toggleAttribute("disabled");
        successContainer.toggleAttribute("hidden");
        console.log("enabled");
    }

function toggleEmail(button){

    let studentEmailElement;
    studentEmailElement = button.previousSibling;
    while(1){
        if(studentEmailElement.classList.contains("student-email")){
            // console.log(studentEmailElement);
            break;
        }
        studentEmailElement = studentEmailElement.previousSibling;
    }

    if(button.getAttribute("__status") == "hidden"){
    studentEmailElement.innerText = studentArray[button.getAttribute("__index")][4];
    button.innerText = "Rodyti asmens duomenis";
    button.setAttribute("__status", "visible");
    } else {
        studentEmailElement.innerText = "Paslėptas";
        button.innerText = "Paslėpti asmens duomenis";
        button.setAttribute("__status", "hidden");
    }

}