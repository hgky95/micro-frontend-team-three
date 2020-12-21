const fakeProducts =  {
    "big-mac": { "name": "Big Mac", "price": "20", "img": "big-mac.jpg" },
    "flip-flops": { "name": "Flip Flops", "price": "30", "img": "flip-flops.jpg" },
    "coca-cola-pack": { "name": "Coca-Cola Pack", "price": "50", "img": "coca-cola-pack.jpg" },
    "movie-ticket": { "name": "Movie Ticket", "price": "12000", "img": "movie-ticket.jpg" },
    "book": { "name": "Book", "price": "15000", "img": "book.jpg" },
    "lobster-dinner": { "name": "Lobster Dinner", "price": "450", "img": "lobster-dinner.jpg" },
    "video-game": { "name": "Video Game", "price": "600", "img": "video-game.jpg" },
    "amazon-echo": { "name": "Amazon Echo", "price": "99000", "img": "amazon-echo.jpg" },
    "year-of-netflix": { "name": "Year of Netflix", "price": "1000", "img": "year-of-netflix.jpg" },
    "air-jordans": { "name": "Air Jordans", "price": "125000", "img": "air-jordans.jpg" },
    "airpods": { "name": "Airpods", "price": "199000", "img": "airpods.jpg" },
    "gaming-console": { "name": "Gaming Console", "price": "299000", "img": "gaming-console.jpg" },
    "drone": { "name": "Drone", "price": "350000", "img": "drone.jpg" },
    "smartphone": { "name": "Smartphone", "price": "699000", "img": "smartphone.jpg" },
    "bike": { "name": "Bike", "price": "800000", "img": "bike.jpg" }
}


var pricingTables = document.getElementById("pricing-tables");
for (const key in fakeProducts) {
    if (fakeProducts.hasOwnProperty(key)) {
        const element = fakeProducts[key];
        pricingTables.innerHTML += `
            <div class="pure-u-1 pure-u-md-1-3">
                <div class="pricing-table dummy-product stripe">
                    <div class="pricing-table-header">
                        <span class="pricing-table-price">Dummy ${element.name} ${element.price}$</span>
                    </div>
                    <div class="pricing-table-footer">
                        <button class="sell-button pure-button stripe" data-product="${key}">Sell</button>
                        <button class="buy-button pure-button pure-button-primary stripe" data-product="${key}">Buy</button>
                    </div>
                </div>
            </div>`;
    }
}

// Simulate send event "BUY / SELL" of team 2
var sellButtons = document.getElementsByClassName('sell-button');
for (var i = 0; i < sellButtons.length; i++) {
    /* TODO: For every sell button, send event sell a product when click */
    sellButtons[i].addEventListener("click", function(){
        const productId = this.getAttribute("data-product");
        this.dispatchEvent(new CustomEvent("team-two-sell", {
            bubbles: true,
            detail: {'product-type': productId}
        }));
    });
}

var buyButtons = document.getElementsByClassName('buy-button');
for (var i = 0; i < buyButtons.length; i++) {
    /* TODO: For every buy button, send event buy a product when click */
    buyButtons[i].addEventListener("click", function() {
        const productId = this.getAttribute("data-product");
        this.dispatchEvent(new CustomEvent("team-two-buy", {
            bubbles: true,
            detail: {'product-type': productId}
        }));
    });
}

// Simulate event receiver "receipt total change"
window.addEventListener("team-three-update-total", (e) => {
    document.getElementById("total-amount").innerHTML = currency(1000000 - e.detail.amount, {fromCents: true, precision : 0}).format();
});