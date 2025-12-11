
    const buttons = document.querySelectorAll('.ajouter-btn');
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let total = 0;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const dish = this.closest('.dish');
            const title = dish.querySelector('h3').innerText;
            const priceText = dish.querySelector('p:last-of-type').innerText;
            const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
            const quantityInput = dish.querySelector('.quantity-selector');
            const quantity = parseInt(quantityInput.value);

            const itemTotal = price * quantity;
            total += itemTotal;

            const li = document.createElement('li');
            li.textContent = `${title} x ${quantity} = ${itemTotal.toFixed(2)} €`;
            cartItems.appendChild(li);

            totalPriceElement.textContent = `Total : ${total.toFixed(2)} €`;
        });
    });









    document.getElementById('adress_code-postal').addEventListener('input', function() {
        const code = this.value;
        if (code.length === 5) {
            fetch(`https://geo.api.gouv.fr/communes?codePostal=${code}&fields=nom`)
                .then(response => response.json())
                .then(data => {
                    const communeSelect = document.getElementById('adress_commune');
                    communeSelect.innerHTML = '<option value="">-- Sélectionnez une commune --</option>'; // Reset options
                    
                    if (data.length > 0) {
                        data.forEach(commune => {
                            const option = document.createElement('option');
                            option.value = commune.nom;
                            option.textContent = commune.nom;
                            communeSelect.appendChild(option);
                        });
                    }
                });
        }
    });
