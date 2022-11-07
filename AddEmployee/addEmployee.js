const userInputs = document
  .getElementById("user_inputs")
  .querySelectorAll("input");
const addEmpBtn = document.getElementById("submit_employee");

const clearEmpInputs = () => {
  for (const input of userInputs) {
    input.value = "";
  }
};

const addEmpHandler = () => {
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

    fetch("https://localhost:7209/api/Employees", {
      method: "POST",
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
    alert("Employee added");
    clearEmpInputs();
  }
};

addEmpBtn.addEventListener("click", addEmpHandler);
