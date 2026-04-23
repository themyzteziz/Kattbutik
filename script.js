const form = document.getElementById("orderForm");
const fullName = document.getElementById("fullname");
const address = document.getElementById("address");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    errorMessage.textContent = "";

    if (fullName.value.trim() === "" || address.value.trim() === "") {
        errorMessage.style.color = "red";
        errorMessage.textContent = "You must fill in Full Name and Delivery Address.";
        return;
    }

    const order = {
        name: fullName.value,
        email: document.getElementById("email").value,
        address: address.value
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    errorMessage.style.color = "green";
    errorMessage.textContent = "Order saved!";
});