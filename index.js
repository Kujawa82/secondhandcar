const accessories = [
  {
    name: "opony zimowe",
    price: 1200,
  },
  {
    name: "felgi",
    price: 1500,
  },
  {
    name: "nawigacja",
    price: 450,
  },
  {
    name: "gwarancja 1 rok",
    price: 5000,
  },
];

const cars = [
  {
    idCar: 1,
    myImage: "images/1 vw polo.jpg",
    brand: "Volkswagen",
    model: "Polo",
    capacity: "1197",
    power: "110",
    year: "2014",
    mileage: "110077",
    price: "38500",
  },
  {
    idCar: 2,
    myImage: "images/2 bmw z4.jpg",
    brand: "BMW",
    model: "Z4",
    capacity: "1997",
    power: "245",
    year: "2016",
    mileage: "75000",
    price: "160000",
  },
  {
    idCar: 3,
    myImage: "images/3 audi a3.jpg",
    brand: "Audi",
    model: "A3",
    capacity: "1968",
    power: "150",
    year: "2012",
    mileage: "171300",
    price: "42900",
  },
  {
    idCar: 4,
    myImage: "images/4 bmw x4.jpg",
    brand: "BMW",
    model: "X4",
    capacity: "2979",
    power: "306",
    year: "2016",
    mileage: "197000",
    price: "119000",
  },
  {
    idCar: 5,
    myImage: "images/5 vw golf iv.jpg",
    brand: "Volkswagen",
    model: "Golf IV",
    capacity: "1390",
    power: "75",
    year: "2000",
    mileage: "240000",
    price: "7300",
  },
];

const isShownList = (filteredCars) => {
  if (document.getElementById("cars_container") === null) {
    let carsContainer = document.createElement("div");
    carsContainer.id = "cars_container";
    document.getElementById("main_container").after(carsContainer);
  }

  document.getElementById("main_container").style.display = "none";
  document.getElementById("cars_container").style.display = "block";

  let toMainFromOffer = document.createElement("button");
  toMainFromOffer.innerText = "Wróć do strony głównej";
  toMainFromOffer.id = "backFromOffer";
  toMainFromOffer.classList.add("fromOfferToMain");
  document.getElementById("cars_container").appendChild(toMainFromOffer);

  document.getElementById("backFromOffer").addEventListener(
    "click",
    (isbacktoMainFromOffer = () => {
      document.getElementById("cars_container").remove();
      document.getElementById("main_container").style.display = "block";
    })
  );

  for (let i = 0; i < filteredCars.length; i++) {
    let picture = document.createElement("img");
    picture.src = filteredCars[i].myImage;
    let photo = document.createElement("div");
    photo.classList.add("photo");

    let brand = document.createElement("p");
    brand.innerText = "Marka: " + filteredCars[i].brand;
    let model = document.createElement("p");
    model.innerText = "Model: " + filteredCars[i].model;
    let capacity = document.createElement("p");
    capacity.innerText = "Pojemność: " + filteredCars[i].capacity;
    let power = document.createElement("p");
    power.innerText = "Moc: " + filteredCars[i].power;
    let year = document.createElement("p");
    year.innerText = "Rok: " + filteredCars[i].year;
    let mileage = document.createElement("p");
    mileage.innerText = "Przebieg: " + filteredCars[i].mileage;
    let info = document.createElement("div");
    info.classList.add("info");

    let priceCar = document.createElement("p");
    priceCar.innerText = "Cena: " + filteredCars[i].price;
    let price = document.createElement("div");

    price.classList.add("price");

    let offer = document.createElement("div");
    offer.classList.add("offer");
    offer.id = i;

    photo.appendChild(picture);

    info.appendChild(brand);
    info.appendChild(model);
    info.appendChild(capacity);
    info.appendChild(power);
    info.appendChild(year);
    info.appendChild(mileage);

    price.appendChild(priceCar);

    offer.appendChild(photo);
    offer.appendChild(info);
    offer.appendChild(price);
    document.getElementById("cars_container").appendChild(offer);

    document.getElementById(i).addEventListener(
      "click",
      (isShownForm = () => {
        if (document.getElementById("form_container") === null) {
          let formContainer = document.createElement("div");
          formContainer.id = "form_container";
          document.getElementById("cars_container").after(formContainer);
        }

        document.getElementById("cars_container").style.display = "none";

        let memory = [];
        if (localStorage.getItem("carsMemory")) {
          storage = JSON.parse(localStorage.getItem("carsMemory"));
          addOtherCar = storage.filter(
            (car) => car.idCar !== filteredCars[i].idCar
          );

          addOtherCar.push(filteredCars[i]);
          localStorage.setItem("carsMemory", JSON.stringify(addOtherCar));
        } else {
          memory.push(filteredCars[i]);
          localStorage.setItem("carsMemory", JSON.stringify(memory));
        }

        let form = document.createElement("div");
        form.id = "form" + i;
        form.classList.add("details");

        document.getElementById("form_container").appendChild(form);

        let formHeading = document.createElement("h1");
        formHeading.innerText = `Konfiguracja zakupu auta ${filteredCars[i].brand} ${filteredCars[i].model} ${filteredCars[i].year}`;
        form.appendChild(formHeading);

        const lineBreak2 = document.createElement("br");
        form.appendChild(lineBreak2);

        let accessoriesHeading = document.createElement("h2");
        accessoriesHeading.innerText = "Wybór akcesoriów";
        form.appendChild(accessoriesHeading);

        for (let j = 0; j < accessories.length; j++) {
          let accessoriesAdd = document.createElement("input");
          accessoriesAdd.setAttribute("type", "checkbox");
          accessoriesAdd.id = j;
          form.appendChild(accessoriesAdd);
          let accessoriesLabel = document.createElement("label");
          accessoriesLabel.setAttribute("for", j);
          accessoriesLabel.innerText =
            accessories[j].name + " = " + accessories[j].price;
          form.appendChild(accessoriesLabel);

          const lineBreak3 = document.createElement("br");
          form.appendChild(lineBreak3);

          accessoriesAdd.onclick = function () {
            if (accessoriesAdd.checked) {
              carPrice.innerText =
                Number(carPrice.innerText) + accessories[j].price;
            } else {
              carPrice.innerText =
                Number(carPrice.innerText) - accessories[j].price;
            }
            totalPrice.innerText =
              Number(filteredCars[i].price) + Number(carPrice.innerText);
          };
        }
        let carPriceText2 = document.createElement("h3");
        carPriceText2.innerText = "Całkowta cena akcesoriów";
        form.appendChild(carPriceText2);

        let carPrice = document.createElement("p");
        carPrice.innerText = 0;
        carPrice.classList.add("carPrice");
        form.appendChild(carPrice);

        let carPriceText = document.createElement("h3");
        carPriceText.innerText = "Całkowaita cena auta z akcesoriami";
        form.appendChild(carPriceText);

        let totalPrice = document.createElement("p");
        form.appendChild(totalPrice);
        totalPrice.classList.add("totalPrice");
        totalPrice.innerText = filteredCars[i].price;

        let wayOfPay = document.createElement("h2");
        form.appendChild(wayOfPay);
        wayOfPay.innerText = "Sposób zapłaty";

        let payInput1 = document.createElement("input");
        payInput1.setAttribute("type", "radio");
        payInput1.id = "cash";
        payInput1.name = "wayOfPay";

        let payLabel1 = document.createElement("label");
        payLabel1.setAttribute("for", "cash");
        payLabel1.innerText = "gotówka";

        let payInput2 = document.createElement("input");
        payInput2.setAttribute("type", "radio");
        payInput2.id = "leasing";
        payInput2.name = "wayOfPay";

        let payLabel2 = document.createElement("label");
        payLabel2.setAttribute("for", "leasing");
        payLabel2.innerText = "leasing";

        form.appendChild(payInput1);
        form.appendChild(payLabel1);
        form.appendChild(payInput2);
        form.appendChild(payLabel2);

        const lineBreak4 = document.createElement("br");
        form.appendChild(lineBreak4);

        let personalData = document.createElement("h2");
        personalData.innerText = "Dane osobowe";
        form.appendChild(personalData);

        let nameAndSurnameLabel = document.createElement("label");
        nameAndSurnameLabel.setAttribute("for", "nameAndSurname");
        nameAndSurnameLabel.innerText = "imię i nazwisko";

        let nameAndSurname = document.createElement("input");
        nameAndSurname.setAttribute("type", "text");
        nameAndSurname.id = "nameAndSurname";

        form.appendChild(nameAndSurnameLabel);
        form.appendChild(nameAndSurname);

        const lineBreak5 = document.createElement("br");
        form.appendChild(lineBreak5);
        const lineBreak6 = document.createElement("br");
        form.appendChild(lineBreak6);

        let backFromFormToMain = document.createElement("button");
        backFromFormToMain.innerText = "Wróć do strony głównej";
        backFromFormToMain.id = "back" + i;
        backFromFormToMain.classList.add("backFromFormToMain");
        form.appendChild(backFromFormToMain);

        document.getElementById("back" + i).addEventListener(
          "click",
          (isBackFromFormToMain = () => {
            document.getElementById("form" + i).remove();
            document.getElementById("cars_container").remove();
            document.getElementById("main_container").style.display = "block";
          })
        );
        let summary = document.createElement("button");
        summary.innerText = "Kupuję";
        summary.id = "summary" + i;
        summary.classList.add("fromFormToSummary");
        form.appendChild(summary);
        document.getElementById("summary" + i).addEventListener(
          "click",
          (isShownSummary = () => {
            const validateNames =
              document.getElementById("nameAndSurname").value === "" ||
              document.getElementById("nameAndSurname").value.indexOf(" ") ===
                -1;

            const validatePayment =
              !document.getElementById("cash").checked &&
              !document.getElementById("leasing").checked;

            if (validatePayment && validateNames) {
              alert("Kliknij sposób zapłaty i imię i nazwisko");
            } else if (validatePayment) {
              alert("Kliknij sposób zapłaty");
            } else if (validateNames) {
              alert(`Podaj imię i nazwisko`);
            } else {
              if (document.getElementById("summary_container") === null) {
                let summaryContainer = document.createElement("div");
                summaryContainer.id = "summary_container";
                document
                  .getElementById("form_container")
                  .after(summaryContainer);
              }

              document.getElementById("cars_container").style.display = "none";
              document.getElementById("form_container").style.display = "none";

              localStorage.removeItem("carsMemory");

              let bought = document.createElement("div");
              bought.classList.add("carBought");
              document.getElementById("summary_container").appendChild(bought);

              let summaryHeading = document.createElement("h1");
              summaryHeading.innerText = `Dziękujemy za zakup auta ${filteredCars[i].brand} ${filteredCars[i].model} ${filteredCars[i].year}`;
              bought.appendChild(summaryHeading);

              let pictureOfCarBought = document.createElement("img");
              pictureOfCarBought.src = filteredCars[i].myImage;
              bought.appendChild(pictureOfCarBought);

              let someDate = new Date();
              let numberOfDaysToAdd = 14;
              let result = someDate.setDate(
                someDate.getDate() + numberOfDaysToAdd
              );

              let dateObj = new Date(result);
              let month = dateObj.getUTCMonth() + 1;
              let day = dateObj.getUTCDate();
              let year = dateObj.getUTCFullYear();

              let newdate = day + "/" + month + "/" + year;
              let dateOfGet = document.createElement("h2");
              dateOfGet.innerText = `Data odbioru samochodu: ${newdate}`;
              bought.appendChild(dateOfGet);

              let backFromSummaryToMain = document.createElement("p");
              backFromSummaryToMain.innerText = `(Za chwilę zostaniesz automatycznie przekierowany na stronę główną)`;
              bought.appendChild(backFromSummaryToMain);

              function isBackToMainFromSummary() {
                document.getElementById("cars_container").remove();
                document.getElementById("form_container").remove();
                document.getElementById("summary_container").remove();
                document.getElementById("main_container").style.display =
                  "block";
              }

              setTimeout(isBackToMainFromSummary, 10000);
            }
          })
        );
      })
    );
  }
};

const isChosen = () => {
  if (localStorage.getItem("carsMemory") === null) {
    alert(
      "Nie przeglądałeś jeszcze szczegółowo żadnego auta z naszej oferty..."
    );
  } else {
    let memoryBack = JSON.parse(localStorage.getItem("carsMemory"));
    isShownList(memoryBack);
  }
};

const isSearched = () => {
  if (document.getElementById("brand_of_car").value !== "all") {
    const chosenBrand = cars.filter(
      (car) => car.brand === document.getElementById("brand_of_car").value
    );
    isShownList(chosenBrand);
  } else {
    isShownList(cars);
  }
};

document.getElementById("search_button").addEventListener("click", isSearched);

document.getElementById("chosen_button").addEventListener("click", isChosen);
