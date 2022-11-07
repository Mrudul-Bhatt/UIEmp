const allEmp = document.getElementById("allEmp");
const searchEmp = document.getElementById("searchEmp");
const searchName = document.getElementsByName("search");
// const searchInput = document.getElementById("example").querySelector("input");

const getAllEmployees = () => {
	const list = document.getElementById("employees_list");
	list.innerHTML = "";

	// https://localhost:7209/api/Employees
	fetch("https://localhost:7209/api/Employees")
		.then((response) => response.json())
		.then((data) => {
			console.log("GET Success:", data);
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
			});
		})
		.catch((error) => {
			console.error("Error:", error);
		});
};

const searchEmployee = () => {
	const list = document.getElementById("employees_list");
	list.innerHTML = "";

	// https://localhost:7209/api/Employees
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
