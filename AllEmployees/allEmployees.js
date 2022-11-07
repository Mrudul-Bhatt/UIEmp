const allEmp = document.getElementById("allEmp");
const searchEmp = document.getElementById("searchEmp");
const searchName = document.getElementsByName("search");
// const searchInput = document.getElementById("example").querySelector("input");

const getAllEmployees = () => {
  const list = document.getElementById("employees_list");
  list.innerHTML = "";

  fetch("https://localhost:7209/api/Employees")
    .then((response) => response.json())
    .then((data) => {
      console.log("GET Success:", data);
      data.forEach((element) => {
        var html = "";
        const newTr = document.createElement("tr");
        const stringDate = new Date(element.dateOfBirth);

        html += `
				<td>${element.name}</td>
				<td>${element.email}</td>
				<td>${stringDate.toDateString()}</td>
				<td>${element.salary}</td>
				<td>${element.department}</td>
				<td><a href="employeeDetails.html?id=${element.id}">Edit/Delete</a></td>
				`;
        newTr.innerHTML = html;
        list.append(newTr);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const searchEmployee = () => {
  if (searchName[0].value.trim() === "") {
    alert("Enter a valid name!");
    return;
  }

  const list = document.getElementById("employees_list");
  list.innerHTML = "";

  let employeeExists = false;

  fetch("https://localhost:7209/api/Employees")
    .then((response) => response.json())
    .then((data) => {
      console.log("GET Success:", data);
      if (data.length != 0) {
        data.forEach((element) => {
          if (
            element.name
              .toLowerCase()
              .includes(searchName[0].value.toLowerCase())
          ) {
            employeeExists = true;
            var html = "";
            const newTr = document.createElement("tr");
            const stringDate = new Date(element.dateOfBirth);

            html += `
						<td>${element.name}</td>
						<td>${element.email}</td>
						<td>${stringDate.toDateString()}</td>
						<td>${element.salary}</td>
						<td>${element.department}</td>
						<td><a href="employeeDetails.html?id=${element.id}">Edit/Delete</a></td>
						`;
            newTr.innerHTML = html;
            list.append(newTr);
          }
        });
      }
      searchName[0].value = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

allEmp.addEventListener("click", getAllEmployees);
searchEmp.addEventListener("click", searchEmployee);
