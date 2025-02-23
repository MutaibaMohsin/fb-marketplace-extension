document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const resultsDiv = document.getElementById('results');
    const negotiationDiv = document.getElementById('negotiation');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        resultsDiv.innerHTML = 'Searching...';
        negotiationDiv.innerHTML = '';

        const product = document.getElementById('product').value.trim();
        const minPrice = parseFloat(document.getElementById('minPrice').value);
        const maxPrice = parseFloat(document.getElementById('maxPrice').value);

        const query = { product, minPrice, maxPrice };

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const response = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: scrapeMarketplace,
                args: [query]
            });
            const scrapedData = response[0].result;
            displayResults(scrapedData);
        } catch (error) {
            console.error('Error executing script:', error);
            resultsDiv.innerHTML = 'Error retrieving marketplace data.';
        }
    });

    function displayResults(data) {
        resultsDiv.innerHTML = '';
        if (!data || data.length === 0) {
            resultsDiv.innerHTML = 'No products found matching criteria.';
            return;
        }
        data.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
          <img src="${item.image || 'placeholder.png'}" alt="Product Image">
          <div class="product-info">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <p>Seller: ${item.author}</p>
            <button data-index="${index}" class="negotiate-btn">Negotiate</button>
          </div>
        `;
            resultsDiv.appendChild(card);
        });

        document.querySelectorAll('.negotiate-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = btn.getAttribute('data-index');
                const product = data[index];
                startNegotiation(product);
            });
        });
    }

    async function startNegotiation(product) {
        negotiationDiv.innerHTML = `<h2>Negotiation for ${product.name}</h2>`;
        const targetPrice = (product.price * 0.9).toFixed(2);
        negotiationDiv.innerHTML += `<p>Target Price: $${targetPrice}</p>`;

        let messages = [];
        messages.push({ sender: 'AI', text: `Hi, I noticed your listing for "${product.name}". Would you consider lowering the price to $${targetPrice}?` });
        displayNegotiationMessages(messages);

        for (let round = 1; round <= 5; round++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (round === 1 && Math.random() < 0.5) {
                messages.push({ sender: 'Seller', text: 'Yes, that works for me!' });
                displayNegotiationMessages(messages);
                notifyUser(`Seller accepted your offer for ${product.name} at $${targetPrice}`);
                return;
            } else {
                messages.push({ sender: 'Seller', text: 'I am not sure, can you do a bit better?' });
                messages.push({ sender: 'AI', text: `How about $${(product.price * (1 - 0.05 * round)).toFixed(2)}?` });
                displayNegotiationMessages(messages);
            }
        }

        notifyUser(`Negotiation ended for ${product.name}.`);
    }

    function displayNegotiationMessages(messages) {
        negotiationDiv.innerHTML = `<h2>Negotiation</h2>`;
        messages.forEach(msg => {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${msg.sender}:</strong> ${msg.text}`;
            negotiationDiv.appendChild(p);
        });
    }

    function notifyUser(message) {
        chrome.notifications.create('', {
            type: 'basic',
            iconUrl: 'icons/icon48.png',
            title: 'Marketplace Negotiator',
            message: message,
            priority: 2
        });
    }
});

// Injected function: getRandomPrice is now defined within scrapeMarketplace.
function scrapeMarketplace(query) {
    // Define helper function inside the injected function.
    function getRandomPrice(min, max) {
        return (Math.random() * (max - min) + min).toFixed(2);
    }

    const simulatedData = [];
    for (let i = 0; i < 10; i++) {
        const price = getRandomPrice(query.minPrice, query.maxPrice);
        simulatedData.push({
            name: `${query.product} ${i + 1}`,
            price: price,
            author: `Seller${i + 1}`,
            image: 'https://via.placeholder.com/80'
        });
    }
    return simulatedData;
}
