import {
    searchArticles,
    getArticle
} from "./api.js";

import {
    renderResults,
    renderArticle,
    renderSuggestions,
    showLoading,
    hideLoading,
    showError,
    hideError
} from "./ui.js";

import { debounce } from "./utils.js";

const state = {
    currentQuery: "",
    results: []
};

const input = document.querySelector("#search-input");
const button = document.querySelector("#search-button");
const results = document.querySelector("#results");
const suggestions = document.querySelector("#suggestions");
const backBtn = document.querySelector("#back-btn");
const searchView = document.querySelector("#search-section");
const articleView = document.querySelector("#article-section");

async function search() {
    const query = input.value.trim();

    if (query.length < 3) {
        showError("Minimum 3 characters.");
        return;
    }

    hideError();
    showLoading();
    suggestions.classList.remove("show");

    try {
        const data = await searchArticles(query);
        state.currentQuery = query;
        state.results = data;
        renderResults(data);
    }
    catch (error) {
        showError(error.message);
    }
    finally {
        hideLoading();
    }
}

async function openArticle(title) {
    showLoading();
    try {
        const article = await getArticle(title);
        renderArticle(article);
        searchView.classList.add("hidden");
        articleView.classList.remove("hidden");
    }
    catch (error) {
        showError("Failed to load article detail.");
    }
    finally {
        hideLoading();
    }
}

async function showSuggestions() {
    const query = input.value.trim();

    if (query.length < 3) {
        suggestions.classList.remove("show");
        return;
    }

    try {
        const data = await searchArticles(query, 5);
        if (data.length > 0) {
            renderSuggestions(data);
            suggestions.classList.add("show");
        } else {
            suggestions.classList.remove("show");
        }
    } catch (error) {
        console.error("Suggestions error:", error);
    }
}

const debouncedShowSuggestions = debounce(showSuggestions, 300);

// Events
button.addEventListener("click", () => {
    search();
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        search();
    }
});

input.addEventListener("input", debouncedShowSuggestions);

input.addEventListener("focus", () => {
    if (input.value.trim().length >= 3) {
        suggestions.classList.add("show");
    }
});

document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions.classList.remove("show");
    }
});

suggestions.addEventListener("click", (e) => {
    const item = e.target.closest(".suggestion-item");
    if (item) {
        const title = item.dataset.title;
        input.value = title;
        suggestions.classList.remove("show");
        openArticle(title);
    }
});

results.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) {
        const title = card.dataset.title;
        openArticle(title);
    }
});

backBtn.addEventListener("click", () => {
    articleView.classList.add("hidden");
    searchView.classList.remove("hidden");
});