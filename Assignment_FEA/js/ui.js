import { truncate } from "./utils.js";

const resultsContainer = document.querySelector("#results");

export function renderResults(results) {
    resultsContainer.innerHTML = "";

    if (results.length === 0) {
        resultsContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #666; margin-top: 20px;">No results found.</div>`;
        return;
    }

    results.forEach(article => {
        const card = document.createElement("div");
        card.className = "card result-card";
        card.dataset.title = article.title;

        const imgHtml = article.thumbnail?.source
            ? `<img src="${article.thumbnail.source}" alt="${article.title}">`
            : '';

        card.innerHTML = `
            ${imgHtml}
            <div>
                <h3>${article.title}</h3>
                <p>${truncate(article.extract || "")}</p>
            </div>
        `;

        resultsContainer.appendChild(card);
    });
}

const suggestionContainer = document.querySelector("#suggestions");

export function renderSuggestions(results) {
    suggestionContainer.innerHTML = "";

    results.forEach(article => {
        const item = document.createElement("div");
        item.className = "suggestion-item";
        item.dataset.title = article.title;
        item.innerHTML = `
            <h4>${article.title}</h4>
            <p>${truncate(article.extract || "", 100)}</p>
        `;
        suggestionContainer.appendChild(item);
    });
}

const articleContainer = document.querySelector("#article-container");

export function renderArticle(article) {
    const imgHtml = article.thumbnail?.source
        ? `<img src="${article.thumbnail.source}" alt="${article.title}">`
        : '';

    articleContainer.innerHTML = `
        <h1>${article.title}</h1>
        ${imgHtml}
        <p>${article.extract || "No description available."}</p>
    `;
}

const loading = document.querySelector("#loading");
export function showLoading() {
    loading.classList.remove("hidden");
}

export function hideLoading() {
    loading.classList.add("hidden");
}

const error = document.querySelector("#error");

export function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
}

export function hideError() {
    error.classList.add("hidden");
}