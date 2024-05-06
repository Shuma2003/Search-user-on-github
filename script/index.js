function searchUser() {
    const searchInput = document.getElementById("searchInput").value;
    const resultDiv = document.getElementById("result");

    if (!searchInput) {
        resultDiv.innerHTML = "Пожалуйста, введите имя пользователя.";
        return;
    }

    fetch(`https://api.github.com/search/users?q=${encodeURIComponent(searchInput)}`)
        .then(response => response.json())
        .then(data => {
            resultDiv.innerHTML = '';
            if (data.items.length === 0) {
                resultDiv.innerHTML = `Пользователя с именем "${searchInput}" не найдено.`;
                return;
            }
            data.items.forEach(item => {
                const userCard = document.createElement("div");
                userCard.innerHTML = `
                    <h3>${item.login}</h3>
                    <a href="https://github.com/${item.login}" target="_blank">Перейти к профилю</a>
                `;
                resultDiv.appendChild(userCard);
            });
        })
        .catch(error => {
            resultDiv.innerHTML = "Произошла ошибка. Попробуйте еще раз.";
            console.error("Error:", error);
        });
}