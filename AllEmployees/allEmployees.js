const allEmp = document.getElementById("allEmp");
// const searchEmp = document.getElementById("searchEmp");
// const searchInput = document.getElementById("example").querySelector("input");

const getAllEmployees = () => {
  const list = document.getElementById("employees");

  fetch("https://localhost:7209/api/Employees")
    .then((response) => response.json())
    .then((data) => {
      console.log("GET Success:", data);

      if (data.length != 0) {
        data.forEach((element) => {
          var html = "";
          const newTr = document.createElement("tr");
          html += `
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.dateOfBirth}</td>
            <td>${element.salary}</td>
            <td>${element.department}</td>
            <td>View</td>
          `;
          newTr.innerHTML = html;
          list.append(newTr);
          // console.log(element);
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// const searchEmployee = () => {
//   const searchName = searchInput.value;

//   if (searchName.trim() === "") {
//     alert("Enter a valid name");
//     return;
//   }

//   fetch("https://localhost:7209/api/Employees")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("GET Success:", data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };

allEmp.addEventListener("click", getAllEmployees);
// searchEmp.addEventListener("click", searchEmployee);
