const searchFood = () => {
    const inputField = document.getElementById("input-field");
    const inputText = inputField.value;
    if (inputText === "") {
        const errorMessage = document.getElementById("error-mssg");
        const p = document.createElement("p");
        p.innerText = "Please Write Something...";
        errorMessage.appendChild(p);
    } else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
        // load data
        fetch(url)
            .then((response) => response.json())
            .then((data) => displayResult(data.meals));
        const errorMessage = document.getElementById("error-mssg");
        errorMessage.innerText = "";
    }

    // clear data
    inputField.value = "";
};

/* Display on ui result */
const displayResult = (meal) => {
    const showResult = document.getElementById("display-result");
    showResult.textContent = ""; // clear previous result
    if (meal.length == 0) {
        const emptyMssg = document.getElementById("empty-mssg");
        const p = document.createElement("p");
        p.innerText = "No result found";
        emptyMssg.appendChild(p);
    } else {
        meal.forEach((result) => {
            const div = document.createElement("div");
            div.classList = "col";
            div.innerHTML = `
            <div class="card h-100 mx-2">
                <img src="${
                    result.strMealThumb
                }" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${result.strMeal}</h5>
                    <p class="card-text">Meal ID: ${result.idMeal}</p>
                    <p>Instruction: ${result.strInstructions.slice(0, 250)}</p>
                    <a class="btn btn-primary" target="_blank" href="${
                        result.strYoutube
                    }">Youtube</a>
                </div>
            </div>
        `;
            showResult.appendChild(div);
        });
    }
};
