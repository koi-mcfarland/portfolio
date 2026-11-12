'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// project details variables
const projectsSection = document.querySelector("[data-projects]");
const detailsSection = document.querySelector("[data-details]");
const detailContents = document.querySelectorAll("[data-detail]");
const detailsBackBtn = document.querySelector("[data-details-back]");

// show a project's description (replaces the filter/project list)
const showProjectDetails = function (slug) {

  for (let i = 0; i < detailContents.length; i++) {
    detailContents[i].classList.toggle("active", detailContents[i].dataset.detail === slug);
  }

  projectsSection.classList.add("hidden");
  detailsSection.classList.add("active");
  detailsBackBtn.classList.add("back-enabled");
  window.scrollTo(0, 0);

}

// go back to the project list (keeps the current filter selection)
const hideProjectDetails = function () {

  projectsSection.classList.remove("hidden");
  detailsSection.classList.remove("active");
  detailsBackBtn.classList.remove("back-enabled");

}

// the portfolio header acts as the back button, project items navigate through the URL hash
detailsBackBtn.addEventListener("click", function () {
  if (detailsSection.classList.contains("active")) location.hash = "Portfolio";
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// hash routing, resolves tags like #About, #Resume, #Portfolio, #TrueSizeOfGames
const normalizeTag = function (tag) {
  return tag.toLowerCase().replace(/[^a-z0-9]/g, "");
};

const findPageByTag = function (tag) {

  const normalized = normalizeTag(tag);

  for (let i = 0; i < pages.length; i++) {
    if (normalized === normalizeTag(pages[i].dataset.page) || normalized === normalizeTag(pages[i].id)) {
      return pages[i];
    }
  }

  return null;
};

const findProjectByTag = function (tag) {

  const normalized = normalizeTag(tag);

  for (let i = 0; i < detailContents.length; i++) {
    if (normalized === normalizeTag(detailContents[i].id) || normalized === normalizeTag(detailContents[i].dataset.detail)) {
      return detailContents[i].dataset.detail;
    }
  }

  return null;
};

const showPage = function (page) {

  for (let i = 0; i < pages.length; i++) {
    pages[i].classList.toggle("active", pages[i] === page);
  }

  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].classList.toggle("active", normalizeTag(navigationLinks[i].textContent) === normalizeTag(page.dataset.page));
  }

  window.scrollTo(0, 0);
};

// render the view that matches the current hash
const applyHash = function () {

  const tag = location.hash.slice(1);
  const project = tag ? findProjectByTag(tag) : null;

  if (project) {
    showPage(findPageByTag("portfolio"));
    showProjectDetails(project);
    return;
  }

  hideProjectDetails();
  showPage(findPageByTag(tag) || findPageByTag("about"));
};

// add event to all nav link, they update the hash which triggers applyHash
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    location.hash = this.textContent.trim();
  });
}

window.addEventListener("hashchange", applyHash);

applyHash();