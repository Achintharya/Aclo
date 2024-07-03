function stop_loader() {
    const loader = document.getElementById('loader_container');
    if (loader) {
        loader.classList.add('dead');
        console.log("loader hidden");
    } else {
        console.error("Loader not found");
    }
}