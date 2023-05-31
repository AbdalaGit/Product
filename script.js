let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mod = "create";
let tmp;

// random imege

function RandomImege() {
  let body = document.querySelector("body");
  let arrimege = ['url("w.jpg")', 'url("t.jpg")', 'url("e.jpg")'];

  let BG = arrimege[Math.floor(Math.random() * arrimege.length)];

  body.style.backgroundImage = BG;
}

setInterval(RandomImege, 10000);

// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.color = "#00ff00";
  } else {
    total.innerHTML = "";
    total.style.color = "#ff0000";
  }
}

//////////////////////////////////////// create product
let ArryPro;
if (localStorage.product != null) {
  ArryPro = JSON.parse(localStorage.product);
} else {
  ArryPro = [];
}

submit.onclick = function () {
  let ObjPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    ObjPro.count < 100
  ) {
    if (mod === "create") {
      // count
      if (ObjPro.count > 1) {
        for (let c = 0; c < ObjPro.count; c++) {
          ArryPro.push(ObjPro);
        }
      } else {
        ArryPro.push(ObjPro);
      }
    } else {
      ArryPro[tmp] = ObjPro;
      mod = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    ClearInput();
  }

  ShowData();
  // save localstorage
  localStorage.setItem("product", JSON.stringify(ArryPro));
};

// clear inputs
function ClearInput() {
  (title.value = ""),
    (price.value = ""),
    (taxes.value = ""),
    (ads.value = ""),
    (discount.value = ""),
    (total.innerHTML = ""),
    (count.value = ""),
    (category.value = "");
}

// read
function ShowData() {
  let table = "";
  for (let i = 0; i < ArryPro.length; i++) {
    table += `                    
    <tr>
    <td>${i + 1}</td>
    <td>${ArryPro[i].title}</td>
    <td>${ArryPro[i].price}</td>
    <td>${ArryPro[i].taxes}</td>
    <td>${ArryPro[i].ads}</td>
    <td>${ArryPro[i].discount}</td>
    <td>${ArryPro[i].total}</td>
    <td>${ArryPro[i].category}</td>
    <td><button onclick="UpdateData(${i})" id="update">تحديث</button></td>
    <td><button onclick="DeleteData(${i})" id="delete">حذف</button></td>
    </tr>`;
  }

  document.getElementById("tbody").innerHTML = table;
  let BtnDeletAll = document.getElementById("DaleteAll");
  if (ArryPro.length > 0) {
    BtnDeletAll.innerHTML = `
        <button onclick="BtnDeleteAll()" id="DeleteAll">حذف الكل (${ArryPro.length})</button>
        `;
  } else {
    BtnDeletAll.innerHTML = "";
  }
  getTotal();
}

// delete
function DeleteData(i) {
  ArryPro.splice(i, 1);
  localStorage.product = JSON.stringify(ArryPro);
  ShowData();
}

// deleteAll
function BtnDeleteAll(i) {
  ArryPro.splice(0);
  localStorage.clear();
  ShowData();
}

// update
function UpdateData(i) {
  (title.value = ArryPro[i].title),
    (price.value = ArryPro[i].price),
    (taxes.value = ArryPro[i].taxes),
    (ads.value = ArryPro[i].ads),
    (discount.value = ArryPro[i].discount),
    (category.value = ArryPro[i].category),
    getTotal();
  (count.style.display = "none"),
    (submit.innerHTML = "Update"),
    (mod = "Update"),
    (tmp = i);
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchMood = "Title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "SearchTitle") {
    searchMood = "Title";
    search.placeholder = "البحث حسب الاسم";
  } else {
    searchMood = "Category";
    search.placeholder = " البحث حسب النوع";
  }
  search.focus();
  search.value = "";
  ShowData();
}

function searchData(value) {
  let table = "";
  if (searchMood == "Title") {
    for (let i = 0; i < ArryPro.length; i++) {
      if (ArryPro[i].title.includes(value.toLowerCase())) {
        table += `                    
            <tr>
            <td>${i}</td>
            <td>${ArryPro[i].title}</td>
            <td>${ArryPro[i].price}</td>
            <td>${ArryPro[i].taxes}</td>
            <td>${ArryPro[i].ads}</td>
            <td>${ArryPro[i].discount}</td>
            <td>${ArryPro[i].total}</td>
            <td>${ArryPro[i].category}</td>
            <td><button onclick="UpdateData(${i})" id="update">تحديث</button></td>
            <td><button onclick="DeleteData(${i})" id="delete">حذف</button></td>
            </tr>`;
      }
    }
  } else {
    for (let i = 0; i < ArryPro.length; i++) {
      if (ArryPro[i].category.includes(value.toLowerCase())) {
        table += `                    
            <tr>
            <td>${i}</td>
            <td>${ArryPro[i].title}</td>
            <td>${ArryPro[i].price}</td>
            <td>${ArryPro[i].taxes}</td>
            <td>${ArryPro[i].ads}</td>
            <td>${ArryPro[i].discount}</td>
            <td>${ArryPro[i].total}</td>
            <td>${ArryPro[i].category}</td>
            <td><button onclick="UpdateData(${i})" id="update">تحديث</button></td>
            <td><button onclick="DeleteData(${i})" id="delete">حذف</button></td>
            </tr>`;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

// clean data

ShowData();
