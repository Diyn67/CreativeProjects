function toggleStoryPopup(id) {
    var popup = document.getElementById(id);
    if (popup.style.display === "block") {
        popup.style.display = "none";
    } else {
        popup.style.display = "block";
    }
}
