const handleSearch = (e) => {
    const inputValue = document.getElementById("inputField").value;
    const container = document.getElementById("comment-container");

    const p = document.createElement("p");
    p.classList.add("child");
    p.innerText = inputValue;
    container.appendChild(p);

    document.getElementById("inputField").value = "";

    const allComments = document.getElementsByClassName("child");

    for (const element of allComments) {
        element.addEventListener("click", (e) => {
            e.target.parentNode.removeChild(element);
        })
    }
}

fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        displayData(data)
    })
    .catch((err) => {
        console.log(err);
    });

const displayData = (userData) => {
    const container = document.getElementById("userData-container");

    userData.forEach(user => {
        const div = document.createElement("div");
        div.classList.add("user");
        div.innerHTML = `
        <h1>Title</h1>
        <p>Description</p>
        <button>Details</button>
        `

        container.appendChild(div);
    });
}