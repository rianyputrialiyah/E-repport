function switchPage(pageName) {

    const homePage = document.getElementById("home-page");
    const trackingPage = document.getElementById("tracking-page");

    const navReport = document.getElementById("nav-report");
    const navAnalytics = document.getElementById("nav-analytics");

    homePage.classList.remove("active-page");
    trackingPage.classList.remove("active-page");

    navReport.classList.remove("active");
    navAnalytics.classList.remove("active");

    if (pageName === "home") {
        homePage.classList.add("active-page");
        navReport.classList.add("active");
    } else {
        trackingPage.classList.add("active-page");
        navAnalytics.classList.add("active");
    }
}