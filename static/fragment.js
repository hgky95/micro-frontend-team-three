class Receipt extends HTMLElement {

    connectedCallback() {
        this.boughtProducts = {};
        this.products = this.fetchProducts();

        this.render();

        window.addEventListener('team-two-buy', (e) => {
            var productType = e.detail['product-type'];
            var selectedProduct = this.products[productType];

            if (this.boughtProducts[productType]) {
                this.boughtProducts[productType] = { name: selectedProduct.name, quantity: this.boughtProducts[productType].quantity + 1, price: selectedProduct.price };
            } else {
                this.boughtProducts[productType] = { name: selectedProduct.name, quantity: 1, price: selectedProduct.price };
            }
            this.render();
            this.updateTotal();
        });

        window.addEventListener('team-two-sell', (e) => {
            var productType = e.detail['product-type'];
            var selectedProduct = this.products[productType];

            if (this.boughtProducts && this.boughtProducts[productType]) {
                if (this.boughtProducts[productType].quantity > 1) {
                    this.boughtProducts[productType] = { name: selectedProduct.name, quantity: this.boughtProducts[productType].quantity - 1, price: selectedProduct.price };
                } else {
                    delete this.boughtProducts[productType];
                }
            }
            this.render();
            this.updateTotal();
        });

        
    }

    updateTotal() {
        this.total = Object.values(this.boughtProducts)
            .map(item => item.price * item.quantity).reduce((a, b) => a + b, 0);
        this.dispatchEvent(new CustomEvent('team-three-update-total', {
            bubbles: true,
            detail: { 'amount': this.total }
        }));
    }

    render() {
        var boughtProducts = Object.values(this.boughtProducts).map(item => {
            return `<tr>
                        <td>${item.name}</td>
                        <td class="text-right">x${item.quantity}</td>
                        <td class="text-right price">$${item.price}</td>
                    </tr>`
        }).join("");
        this.innerHTML = `
            <table class="receipt-table pure-table pure-table-horizontal center">
                <tbody>
                    ${boughtProducts}
                    <tr>
                        <td>TOTAL</td>
                        <td class="text-right price" colspan="2">$${parseInt(Object.values(this.boughtProducts).map(item => item.price * item.quantity).reduce((a, b) => parseInt(a) + parseInt(b), 0))}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    fetchProducts() {
        return {
            "big-mac": { "name": "Big Mac", "price": "20", "img": "big-mac.jpg" },
            "flip-flops": { "name": "Flip Flops", "price": "30", "img": "flip-flops.jpg" },
            "coca-cola-pack": { "name": "Coca-Cola Pack", "price": "50", "img": "coca-cola-pack.jpg" },
            "movie-ticket": { "name": "Movie Ticket", "price": "12000", "img": "movie-ticket.jpg" },
            "book": { "name": "Book", "price": "150", "img": "book.jpg" },
            "lobster-dinner": { "name": "Lobster Dinner", "price": "450", "img": "lobster-dinner.jpg" },
            "video-game": { "name": "Video Game", "price": "600", "img": "video-game.jpg" },
            "amazon-echo": { "name": "Amazon Echo", "price": "99000", "img": "amazon-echo.jpg" },
            "year-of-netflix": { "name": "Year of Netflix", "price": "1000", "img": "year-of-netflix.jpg" },
            "air-jordans": { "name": "Air Jordans", "price": "125000", "img": "air-jordans.jpg" },
            "airpods": { "name": "Airpods", "price": "199", "img": "airpods.jpg" },
            "gaming-console": { "name": "Gaming Console", "price": "299", "img": "gaming-console.jpg" },
            "drone": { "name": "Drone", "price": "350", "img": "drone.jpg" },
            "smartphone": { "name": "Smartphone", "price": "699", "img": "smartphone.jpg" },
            "bike": { "name": "Bike", "price": "800", "img": "bike.jpg" }
        }
    }

}

window.customElements.define("three-receipt", Receipt);