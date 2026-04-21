const catList = document.getElementById("cat-list");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

if (catList && prevBtn && nextBtn) {
    let cats = [];
    let currentPage = 1;
    const catsPerPage = 10;

    async function fetchCats() {
        const response = await fetch("https://api.thecatapi.com/v1/breeds?limit=30");
        cats = await response.json();
        showCats();
    }

    async function showCats() {
    catList.innerHTML = "";

    const start = (currentPage - 1) * catsPerPage;
    const end = start + catsPerPage;
    const currentCats = cats.slice(start, end);

    for (const cat of currentCats) {
        const div = document.createElement("div");

        let imageUrl = "";

        if (cat.reference_image_id) {
            const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/${cat.reference_image_id}`);
            const imageData = await imageResponse.json();
            imageUrl = imageData.url;
        }

        div.innerHTML = `
        <h3>${cat.name}</h3>
        <p>Ursprung: ${cat.origin}</p>
        <p><strong>Temperament:</strong><br>${cat.temperament}</p>
         ${
            imageUrl
            ? `<img src="${imageUrl}" alt="${cat.name}" width="250">`
            : `<p>Ingen bild hittades</p>`
        }
    `;
        

        catList.appendChild(div);
    }
}

 nextBtn.addEventListener("click", () => {
    if (currentPage * catsPerPage < cats.length) {
      currentPage++;
      showCats();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      showCats();
    }
  });

    fetchCats();
}