const newsBox = document.getElementById("news-list");
const page = document.getElementById("pageul");
let nextPage = document.getElementById("nextPage");
let prevPage = document.getElementById("prevPage");
let li1 = document.getElementById("li1");
let li2 = document.getElementById("li2");
let li3 = document.getElementById("li3");
let initPage = "1";
if (initPage == 1) {
  prevPage.classList.add("disabled");
} else {
  prevPage.classList.remove("disabled");
}
if (initPage == 3) {
  nextPage.classList.add("disabled");
} else {
  nextPage.classList.remove("disabled");
}
let pages = window.localStorage.getItem("page") || 1;
if (pages == 3) {
  li3.classList.add("active");
  li2.classList.remove("active");
  li1.classList.remove("active");
}
if (pages == 2) {
  li3.classList.remove("active");
  li2.classList.add("active");
  li1.classList.remove("active");
}
if (pages == 1) {
  li3.classList.remove("active");
  li2.classList.remove("active");
  li1.classList.add("active");
}
axios
  .get(
    `https://www.fastmock.site/mock/d8c33ca26a546a3c9be78ee13f714990/t1-0fficial/api/news?page=${pages}`
  )
  .then((res) => {
    let { data } = res;
    let newsArr = data?.data;
    //   let total = data?.meta?.total     // 总共的条数
    initPage = data?.meta?.current_page; // 当前页
    let doms = "";
    //   let pagedom = "";
    newsArr.forEach((item) => {
      doms += `
      <a class="news-a-box news-img-title-box" href="./details.html#${item.code}">
      <div class="news-imgs">
        <img
        data-src="${item.img}"
          class="img-fluid lazyload"
          alt=""
        />
      </div>
      <div class="new-titles-box">
        <p class="news-titles">
        ${item.title}
        </p>
        <p class="news-keyword">${item.keyword}</p>
      </div>
    </a>
    `;
    });
    newsBox.innerHTML = doms;
  });
// 点击页码处理函数
const pageOnchick = (e) => {
  var e = e || window.event;
  let page = e.target.innerHTML;
  console.log("我是点击的page", page);
  if (page === initPage) {
    return;
  }
  if (initPage == "1" || page == "1") {
    prevPage.classList.add("disabled");
    if (page === "上一页") {
      return;
    }
  } else {
    prevPage.classList.remove("disabled");
  }
  if (initPage == "3" || page == "3") {
    nextPage.classList.add("disabled");
    if (page === "下一页") {
      return;
    }
  } else {
    nextPage.classList.remove("disabled");
  }
  //兼容性的处理
  if (["1", "2", "3"].includes(page)) {
    e.target.parentNode.classList.add("active");
    console.log("点击数字时", initPage, typeof initPage, page);
    if (initPage == "1") {
      console.log("移除1");
      li1.classList.remove("active");
    }
    if (initPage == "2") {
      li2.classList.remove("active");
    }
    if (initPage == "3") {
      li3.classList.remove("active");
    }
    initPage = page;
  } else {
    if (page === "下一页") {
      if (initPage == 3) {
        return;
      }
      initPage = Number(initPage) + 1;
    } else if (page === "上一页") {
      if (initPage == 1) {
        return;
      }
      initPage = Number(initPage) - 1;
    } else {
      return;
    }
    console.log("点击上下页时initPage", initPage);
    if (initPage == "1") {
      prevPage.classList.add("disabled");
      li1.classList.add("active");
    } else {
      prevPage.classList.remove("disabled");
      li1.classList.remove("active");
    }
    if (initPage == "2") {
      li2.classList.add("active");
    } else {
      li2.classList.remove("active");
    }
    if (initPage == "3") {
      li3.classList.add("active");
      nextPage.classList.add("disabled");
    } else {
      li3.classList.remove("active");
      nextPage.classList.remove("disabled");
    }
  }
  // 缓存页码
  window.localStorage.setItem("page", initPage);
  //   最后发起请求
  axios
    .get(
      `https://www.fastmock.site/mock/d8c33ca26a546a3c9be78ee13f714990/t1-0fficial/api/news?page=${initPage}`
    )
    .then((res) => {
      let { data } = res;
      let newsArr = data?.data;
      //   let total = data?.meta?.total     // 总共的条数
      initPage = data?.meta?.current_page; // 当前页
      let doms = "";
      //   let pagedom = "";
      newsArr.forEach((item) => {
        doms += `
      <a class="news-a-box news-img-title-box" href="./details.html#${item.code}">
      <div class="news-imgs">
        <img
        data-src="${item.img}"
          class="img-fluid lazyload"
          alt=""
        />
      </div>
      <div class="new-titles-box">
        <p class="news-titles">
        ${item.title}
        </p>
        <p class="news-keyword">${item.keyword}</p>
      </div>
    </a>
    `;
      });
      newsBox.innerHTML = doms;
    });
};
