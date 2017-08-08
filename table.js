(()=>{
    
    
    const body = document.body;
    let table,th,tr,span,div,btn,div_row;
    const pageRow = 10;
    const pageList = {};
    const tableHead = [ 
            { key: 'id', title: 'ID' },
            { key: 'first_name', title: 'First Name' },
            { key: 'last_name', title: 'Last Name' },
            { key: 'email', title: 'Email' },
            { key: 'gender', title: 'gender' },
            { key: 'ip_address', title: 'IP Address' }
    ];
    
    const createTableHead = (sortKey=null, sortClass=null)=>{
        
        tr = document.createElement('tr');
        tr.classList.add('table-row-headings');
        tr.classList.add('table-row-data');
        tableLen = tableHead.length;
        
        for(let i=0;i<tableLen;i++){
            th = document.createElement('th');
            console.log(tableHead[i].title);
            th.classList.add(`${tableHead[i].key}-heading`, 'row-headings');
            th.appendChild(document.createTextNode(tableHead[i].title));
            
            
            th.onclick = function(event,key){
               sortDatabyClick(event,tableHead[i].key); 
            };
            
            if (sortKey === tableHead[i].key && sortClass) {
                th.classList.add(sortClass);
            }
            inputs = document.getElementsByClassName('data-toggle');
            const inputsLen = inputs.length;
            
            for(let i=0;i<inputsLen;i++){
                inputs[i].checked = true;
                inputs[i].onclick = (event,key) =>{
                    window.toggleData(event,tableHead[i].key);
                }
            }
            
            tr.appendChild(th);
        }
        table.appendChild(tr);
    };
    
    // pageList show in the front end
    const createPageList = (data) =>{
        let count = 1;
        const dataLen = data.length;
        for(let i=0;i<dataLen;i+pageRow){
            pageList[count] = data.slice(i,i+=pageRow);
            count++;
        }
        return pageList;
    };
     
    // each pageList has its own table
    const createPageListTable = (data,pageListKey=1) =>{
        const curList = data[pageListKey];
        console.log(curList);
        const curListLen = curList.length;
        console.log(curListLen);

        for(let i=0;i<curListLen;i++){
            tr = document.createElement('tr');
            tr.classList.add('table-row-data', `key-${pageListKey}`, `row-${i+1}`);
            for(let key in curList[i]){
                td = document.createElement('td');
                td.classList.add('data-cell', `${key}-data`);
//                console.log(curList[i][key]);
                td.appendChild(document.createTextNode(curList[i][key]));
                td.contentEditable = "true";
                td.onblur = (ev) => {
                    checkAndUpdateCell(ev);
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        
    };
    
    //create the table, get the data on every page and then load the data
    const CreateTable = (data) => {
        const pageListAlready = createPageList(data);
        createPageListTable(pageListAlready);
    };
    
    const fillTable = (jsonData)=>{
        if(jsonData.length<=100){
            CreateTable(jsonData);
        }
        else {
          let ajax = new XMLHttpRequest();
          ajax.addEventListener("load", CreateTableWithApi);
          ajax.open("GET", "https://www.example.com/sampleData");
          ajax.send();
        }
    };
    
    const clearTableData = () => {
        const table = document.getElementsByClassName("data-table");
        table[0].innerHTML = '';
    };
    
    
    const sortDatabyClick = (event,key) =>{
        resetForm();
        const heading = event.currentTarget;
        clearTableData();
        
        if(heading.classList.contains('ascending')){
            createTableHead(key, 'descending');
            CreateTable(sortDataDesc(key,jsonData));
        }else{
            createTableHead(key, 'ascending');
            CreateTable(sortDataAsc(key, jsonData));
        }
        initPage1Button();
    };
    
    
    
    const buildPrevPageBtns = () =>{
        span = document.createElement('span');
        span.classList.add('table-controls-left');
        btn = document.createElement('button');
        console.log('create btn');
        btn.classList.add('table-controls','table-controls-previous');
        btn.appendChild(document.createTextNode('Prev Page'));
        btn.onclick = (event) =>{
            goToPrevPage(event);
        }
        span.appendChild(btn);
        return span;
    };
    
    const TableControlPageBtns = (tableLen) =>{
        span = document.createElement('span');
        let count = 1,pageNum;
        for(let i=0;i<tableLen;i+pageRow){
            btn = document.createElement('button');
            btn.classList.add('table-controls-pages',`page-${count}`);
            btn.appendChild(document.createTextNode(count));
            btn.onclick = (ev) => {
                goToPage(ev);
            }
            span.append(btn);
            i+=pageRow;
            count++;
        }
        return span;  
    };
    
    const buildNextPageBtns = () =>{
        span = document.createElement('span');
        span.classList.add('table');
        btn = document.createElement('button');
        btn.classList.add('table-controls','table-controls-next');
        btn.appendChild(document.createTextNode('Next page'));
        btn.onclick = (ev) => {
            goToNextPage(ev);
        }
        span.appendChild(btn);
        return span;
    };
    
    const pageBtnsInit = (tableLen) =>{
        const firstPageButton = document.getElementsByClassName('page-1')[0];
        firstPageButton.classList.add('table-controls-pages--active');
        const previousButton = document.getElementsByClassName('table-controls-previous')[0];
        
        if(tableLen <= pageRow){
            const nextButton = document.getElementsByClassName('table-control-next')[0];
        }
    };
    
    const goToPage = (event) =>{
        const pageButton = event.currentTarget;
        const pageNumber = pageButton.innerHTML;
        const allPageBtns = document.getElementsByClassName('table-controls-pages');
        resetForm();
         
        if(!pageButton.classList.contains('table-controls-pages--active')){
            const allPageBtnsLen = allPageBtns.length;
            
            for(let i=0;i<allPageBtnsLen;i++){
                allPageBtns[i].classList.remove('table-controls-pages--active');
            }
            hidePrevAndNextBtns(pageNumber, allPageBtnsLen);
              pageButton.classList.add('table-controls-pages--active');
              clearTableData();
              createTableHead();
              createPageListTable(pageList, pageNumber);
        }
    }
    

    const setTableControls = (tableLen) => {
        const tableControls = document.getElementsByClassName('table-controls-bar')[0];
        
        if(tableControls !== undefined){
            tableControls.innerHTML == '';
            div = tableControls;
        }else{
            div_row = document.createElement('div');
            div_row.classList.add('row');
                div = document.createElement('div');
                console.log("setTableControls Function");
                div.classList.add('table-controls-bar','col-md-4','col-center-block');
        }
                    span = buildPrevPageBtns();
                    div.appendChild(span);

                    span = TableControlPageBtns(tableLen)
                    div.appendChild(span);

                    span = buildNextPageBtns();
                    div.appendChild(span);
                div_row.appendChild(div);
            body.appendChild(div_row);
        
        pageBtnsInit(tableLen);
        
        
    };
    const goTable = function(){
        table = document.createElement('table');
        table.classList.add('data-table','table', 'table-bordered', 'table-bordered');
        createTableHead();
        fillTable(jsonData);
        body.appendChild(table);
        setTableControls(jsonData.length);
    };
     goTable();
    
})();