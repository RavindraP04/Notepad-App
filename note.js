//..Date, Time, Year Fetching and Displaying in the Header.
const fetchDate = new Date();
const month = document.querySelector("#month");
const monthName = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const currentMonth = monthName[fetchDate.getMonth()];

const date = document.querySelector("#date");
const currentDate = fetchDate.getDate();

const year = document.querySelector("#year");
const currentYear = fetchDate.getFullYear();

date.textContent = currentDate;
month.textContent = currentMonth;
year.textContent = currentYear;

//..Updation of the number of tasks in the incomplete and complete sections.
function updation() {
	// Incomplete tasks
	const inCompleteNum = document.querySelector("#incomplete-no");
	const inCompleteTasks = document.querySelector(".cb");
	const countTask_ict = inCompleteTasks.children.length;
	inCompleteNum.textContent = countTask_ict;

	// Complete tasks
	const completeNum = document.querySelector("#complete-no");
	const completeTasks = document.querySelector(".completedCB");
	const countTask_ct = completeTasks.children.length;
	completeNum.textContent = countTask_ct;
}
updation();

//-----------
const newTask = document.querySelector(".newTaskBox");
const inCompleteTasks = document.querySelector(".cb");
const completeTasks = document.querySelector(".completedCB");

//.. Function to add a new task
function newTaskChild() {
	const newTaskValue = newTask.value;
	//new child in task list
	const newChild = document.createElement("div");

	//Creating new class - <div class = "items">
	newChild.classList.add("items");
	newChild.setAttribute("draggable", "true");
	newChild.setAttribute("id", `${newTaskValue}*`);

	//Creating new Input element and settings its attributes - <input type = "checkbox">
	const newInput = document.createElement("input");
	newInput.setAttribute("type", "checkbox");
	newInput.setAttribute("id", `${newTaskValue}*`);
	newInput.setAttribute("autocomplete", "off");

	//Appending new input element to <div class = "items">
	newChild.appendChild(newInput);

	//Creating new label element and settings its attributes - <label for = "">
	const newChildLabel = document.createElement("label");
	newChildLabel.textContent = newTaskValue;
	newChildLabel.setAttribute("for", `${newTaskValue}`);
	newChildLabel.setAttribute("contenteditable", "true");

	//Appending new Label element to <div class = "items">
	newChild.appendChild(newChildLabel);

	//Appending <div class = "items"> (newChild) to Incomplete Tasks Section
	inCompleteTasks.appendChild(newChild);

	checkAttributes();
	checkLabelValue();
}

//.. Script - CLICK event
const newTaskAddBtn = document.querySelector("#add");
newTaskAddBtn.addEventListener("click", function () {
	if (newTask.value !== "") {
		newTaskChild();
		updation();
		newTask.value = "";
	} else {
		alert("Please enter a task");
	}
});

//.. Script - ENTER event
newTask.addEventListener("keypress", function (event) {
	if (event.keyCode == 13) {
		event.preventDefault();
		if (newTask.value !== "") {
			newTaskChild();
			updation();
			newTask.value = "";
		} else {
			alert("Please enter a task");
		}
	}
});

//..Cancel popup event
const cancel = document.getElementById("cancel");
cancel.addEventListener("click", function () {
		newTask.value = "";
		popClass.classList.toggle("reveal");
		addPopUp.classList.toggle("rotated");
});

//.. Function to validate the checkbox and move the task to the complete section and incomplete section respectively.
function check(item) {
	item.addEventListener("change", function () {
		if (item.checked) {
			// console.log(item);

			// inCompleteTasks.remove(this.parentElement);
			// Not needed as it is automatically removed when checkbox is checked

			completeTasks.appendChild(this.parentElement);
		} else if (!item.checked) {
			// console.log(this);

			// completeTasks.remove(this.parentElement);
			// Not needed as it is automatically removed when checkbox is unchecked
			inCompleteTasks.appendChild(this.parentElement);
		}
		updation();
	});
}

function checkAttributes() {
	// Used querySelectorAll for all targeting all the attributes of input and labels.
	let checkbox = document.querySelectorAll("input[id][type=checkbox]");

	// Looping through all the input elements and adding event listener to them
	for (let i = checkbox.length - 1; i < checkbox.length; i++) {
		// console.log(checkbox);
		check(checkbox[i]);
	}
}

//..Function to check the value of label is empty or not.
//..If empty then delete the task
function checkLabelValue() {
	let label = document.querySelectorAll("label[for]");
	let checkBOX = document.querySelectorAll("input[id][type=checkbox]");
	for (let i = label.length - 1; i < label.length; i++) {
		label[i].addEventListener("blur", function () {
			if (label[i].textContent == "") {
				// console.log(checkBOX[i].getAttribute("id"));
				inCompleteTasks.removeChild(
					document.getElementById(checkBOX[i].getAttribute("id"))
				);
				updation();
			}
		});
	}
}


//.. Function to delete all task from the incomplete section
const deleteAllBtn = document.querySelector("#delete-btn");
deleteAllBtn.addEventListener("click", function () {
	inCompleteTasks.innerHTML = "";
	completeTasks.innerHTML = "";
	updation();
});

//.. Function to hide/show - add task box.

const addPopUp = document.querySelector(".add-btn");
const popClass = document.querySelector(".addTaskPopUp");
addPopUp.addEventListener("click", function () {
	popClass.classList.toggle("reveal");
	addPopUp.classList.toggle("rotated");
});


