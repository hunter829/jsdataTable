var sortedData;

const sortDataAsc = (key,data) =>{
    sortedData = data.concat().sort((a,b) => {
        if(a[key]>b[key]){
            return 1;
        }
        if(a[key] < b[key]){
            return -1;
        }
        return 0;
    });
    return sortedData;                                   
};

const sortDataDesc = (key,data) => {
    sortedData = data.concat().sort( (a,b) => {
    if (a[key] < b[key]) {
      return 1;
    }
    if (a[key] > b[key]) {
      return -1;
    }
    return 0;
  });
  return sortedData;
};

const resetForm = () =>{
    const form = document.getElementsByClassName('search-form')[0];
//    form.reset();
};

const initPage1Button = () => {
  const allPageBtns = document.getElementsByClassName('table-controls-pages');
  const allPageBtnsLength = allPageBtns.length;
  for (let i = 0; i < allPageBtnsLength; i++) {
    allPageBtns[i].classList.remove('table-controls-pages--active');
  }
  const page1Button = document.getElementsByClassName('page-1')[0];
  page1Button.classList.add('table-controls-pages--active');
};


const hidePrevAndNextBtns = (pageNumber, buttonsLength) => {
  const previousButton = document.getElementsByClassName('table-controls-previous')[0];
  const nextButton = document.getElementsByClassName('table-controls-next')[0];

  if (pageNumber === '1') {
    previousButton.style.visibility = 'hidden';
  } else {
    previousButton.style.visibility = 'visible';
  }

  if (pageNumber === buttonsLength.toString()) {
    nextButton.style.visibility = 'hidden';
  } else {
    nextButton.style.visibility = 'visible';
  }
};


const goToPrevPage = (ev) => {
  resetForm();
  const activePage = document.getElementsByClassName('table-controls-pages--active')[0].innerHTML;
  const previousPage = document.getElementsByClassName(`page-${activePage-1}`)[0];
  previousPage.click();
};

const goToNextPage = (ev) => {
  resetForm();
  let activePage = document.getElementsByClassName('table-controls-pages--active')[0].innerHTML;
  activePage = parseInt(activePage);
  const nextPage = document.getElementsByClassName(`page-${activePage+1}`)[0];
  nextPage.click();
};

const CreateTableWithApi = (data) => {
  const table = JSON.parse(data.target.response);
  window.createTable(table.products);
}

