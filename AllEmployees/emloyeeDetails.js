const userInputs = document
  .getElementById("user_inputs")
  .querySelectorAll("input");
const editEmpBtn = document.getElementById("submit_employee");
const deleteEmpBtn = document.getElementById("delete_employee");

const urlParams = new URLSearchParams(window.location.search);
const employeeId = urlParams.get("id");

const fetchEployees = () => {
  fetch(`https://localhost:7209/api/Employees/${employeeId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("GET Success:", data);

      let stringDate = data.dateOfBirth;
      stringDate = stringDate.substr(0, 10);

      userInputs[0].value = data.name;
      userInputs[1].value = data.email;
      userInputs[2].value = stringDate;
      userInputs[3].value = data.salary;
      document.getElementById("department").value = data.department;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const clearEmpInputs = () => {
  for (const input of userInputs) {
    input.value = "";
  }
};

const editEmpHandler = () => {
  const name = userInputs[0].value;
  const email = userInputs[1].value;
  const dob = userInputs[2].value;
  const salary = userInputs[3].value;
  const department = document.getElementById("department").value;

  var mail_format = /^\S+@\S+\.\S+$/;

  var name_format = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;

  if (name.trim() === "") {
    alert("Name is empty!");
  } else if (!name.trim().match(name_format)) {
    alert("Please enter valid name!");
  } else if (email.trim() === "") {
    alert("Email is empty!");
  } else if (!email.trim().match(mail_format)) {
    alert("Please enter valid email!");
  } else if (dob.trim() === "") {
    alert("Date of birth is empty!");
  } else if (
    salary.trim() === "" ||
    salary.includes("+") ||
    salary.includes("-") ||
    salary.includes(".") ||
    salary.includes("e") ||
    salary.includes("E")
  ) {
    alert("Please enter valid salary!");
  } else {
    const newEmployee = {
      name,
      email,
      dateOfBirth: dob,
      salary: Number(salary),
      department,
    };

    fetch(`https://localhost:7209/api/Employees/${employeeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("POST Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log(newEmployee);
    alert("Employee details edited!");
    clearEmpInputs();
    window.location.replace(
      "http://127.0.0.1:5501/AllEmployees/allEmployees.html"
    );
  }
};

const deleteEmpHandler = () => {
  fetch(`https://localhost:7209/api/Employees/${employeeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("DELETE Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  alert("Employee deleted!");
  clearEmpInputs();
  window.location.replace(
    "http://127.0.0.1:5501/AllEmployees/allEmployees.html"
  );
};

editEmpBtn.addEventListener("click", editEmpHandler);
deleteEmpBtn.addEventListener("click", deleteEmpHandler);
