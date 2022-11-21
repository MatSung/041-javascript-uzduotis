


// document.querySelector('input[name="group-radio"]:checked').value;

//data example

const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

let dataExample = ["Vardas", "Pavarde", 20, "+37060000000", "me@me.me", 10, "CAFS 1gr.", ['Python', 'C++']];
let dataFormat = ["name", "surname", "age", "phone", "email", "rating", "group", "languages"]


//Listen to submit button
let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function () { submitMe() });


// success or fail at adding a new student
let successContainer = document.getElementById("success-container");
let successSpan = document.getElementById("success-span");

// Live student array
let studentArray = [];

//all of my form inputs
let nameInput = document.getElementById("name");
let surnameInput = document.getElementById("surname");
let ageInput = document.getElementById("age");
let phoneInput = document.getElementById("phone");
let emailInput = document.getElementById("email");

let textInputs = [nameInput, surnameInput, ageInput, phoneInput, emailInput];
//criteria
// nameInput > 3
// surnameInput > 3
// age > 0 && < 120
// phone > 9 && < 12
// email > 8 && contains @

let rangeInput = document.getElementById("rating");
let checkboxesElements = [...document.getElementsByClassName("checkbox-select")];

// console.log(checkboxesElements);


function submitMe() {

    removeMistakes();
    if(!checkValidity()){
        alert("Laukeliai neužpildyti teisingai.");
        //nepavyko raudono mygtuko

        console.log("mistakes found")
        return 0;
    }

    

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

    // console.log(input);

    createStudentItem(input);

    successSpan.innerText = `Pridėtas studentas ${input[0]} ${input[1]}`;
    showSuccess();

}

function checkValidity(){
    
    //empty
    let isValid = 1;
    for (let i = 0; i < textInputs.length; i++) {
        const element = textInputs[i];
        // console.log(element.value);
        if(!element.value){
            // console.log("found mistake");
            element.classList.add("mistake");
            let failureSpan = document.createElement("span");
            failureSpan.innerText = "Šis laukelis yra privalomas";
            failureSpan.classList.add("span-mistake-highlight");
            element.parentElement.append(failureSpan);
            isValid = 0;
        } 
    }
    if(!isValid) return false;
    
    if(nameInput.value.length < 3){
        addFailureSpan(nameInput,"Vardas privalo būti bent 3 simbolių ilgumo.");
        isValid = 0;
    }
    if(surnameInput.value.length < 3){
        addFailureSpan(surnameInput, "Pavardė privalo būti bent 3 simbolių ilgumo.");
        isValid = 0;
    }
    if(ageInput.value < 0){
        addFailureSpan(ageInput, "Amžius privalo būti teigiamas skaičius");
        isValid = 0;
    }
    if(ageInput.value > 120){
        addFailureSpan(ageInput, "Įvestas amžius per didelis.");
        isValid = 0;
    }
    if(phoneInput.value.length < 9 || phoneInput.value.length > 12){
        addFailureSpan(phoneInput, "Įvestas telefono numeris yra neteisingas.");
        isValid = 0;
    }
    if(emailInput.value.length < 8 || !emailInput.value.includes("@")){
        addFailureSpan(emailInput, "Įvestas elektroninis paštas yra neteisingas.");
        isValid = 0;
    }

    if(!isValid) return 0;

    return true;
}

function addFailureSpan(element,text){
        let failureSpan = document.createElement("span");
        failureSpan.innerText = text;
        failureSpan.classList.add("span-mistake-highlight");
        element.parentElement.append(failureSpan);
        element.classList.add("mistake");
}


function removeMistakes(){
    for (let i = 0; i < textInputs.length; i++) {
        const element = textInputs[i];
        element.classList.remove("mistake");
    }

    let spanElements = document.getElementsByClassName("span-mistake-highlight");
    let tempLength = spanElements.length;
    //neistrina paskutinio kazkodel jeigu nepaimu length
    for (let i = 0; i < tempLength; i++) {
        spanElements[0].remove();
        console.log(spanElements);
        console.log(i);
    }
}

function createStudentItem(data) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("student-list-item");


    //for every data format entry array it and make all the required items for the div
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
            //return in for each good or bad
        }
        let newSpan = document.createElement("span");
        newSpan.classList.add("student-" + dataFormat[index]);
        newSpan.innerText = element;
        if (dataFormat[index] == "email") {
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

    //add delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Ištrinti";
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("onclick", "deleteMe(this)");
    deleteButton.setAttribute("__index", studentArray.length);

    //student array length will need to be checked when fetching array from memory
    hideDetailsButton.setAttribute("__index", studentArray.length);

    newDiv.append(hideDetailsButton);
    newDiv.append(deleteButton);
    // newDiv.append(studentArray.length);

    studentArray.push(data);

    let studentList = document.getElementById("student-list");
    studentList.append(newDiv);
}

const showSuccess = async () => {
    submitButton.toggleAttribute("disabled");
    successContainer.toggleAttribute("hidden");
    // console.log("disabled");


    await sleep(5000);

    submitButton.toggleAttribute("disabled");
    successContainer.toggleAttribute("hidden");
    // console.log("enabled");
}

function toggleEmail(button) {

    let studentEmailElement;
    studentEmailElement = button.previousSibling;
    while (1) {
        if (studentEmailElement.classList.contains("student-email")) {
            // console.log(studentEmailElement);
            break;
        }
        studentEmailElement = studentEmailElement.previousSibling;
    }

    if (button.getAttribute("__status") == "hidden") {
        studentEmailElement.innerText = studentArray[button.getAttribute("__index")][4];
        button.innerText = "Paslėpti asmens duomenis";
        button.setAttribute("__status", "visible");
    } else {
        studentEmailElement.innerText = "Paslėptas";
        button.innerText = "Rodyti asmens duomenis";
        button.setAttribute("__status", "hidden");
    }

}

function deleteMe(button){
    let deletionIndex = button.getAttribute("__index");
    button.parentElement.remove();
    let studentName = studentArray[deletionIndex][0] + " " + studentArray[deletionIndex][1]
    studentArray.splice(deletionIndex,1);
    console.log(studentArray);
    successSpan.innerText = `Ištrintas studentas ${studentName}`;
    showSuccess();
}
