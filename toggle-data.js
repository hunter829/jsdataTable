(()=>{
    
    const toggleDataColumns = (event,key) =>{
        event.stopPropagation();
        const checkBox = event.currentTarget;
        const columnDatas = document.getElementsByClassName(`${key}-data`);
        const columnHeading = document.getElementsByClassName(`${key}-heading`)[0];
        
        if (checkBox.classList.contains(`data-toggle--hidden`)) {
              columnHeading.style.display = '';
              const columnDatasLength = columnDatas.length;
              for (let i = 0; i < columnDatasLength; i++) {
                columnDatas[i].style.display = '';
              }
              checkBox.classList.remove(`data-toggle--hidden`);
              checkBox.classList.add(`data-toggle--visible`);
        } 
        
        else 
        {
              columnHeading.style.display = 'none';
              const columnDatasLength = columnDatas.length;
              for (let i = 0; i < columnDatasLength; i++) {
                columnDatas[i].style.display = 'none';
        }
            checkBox.classList.remove(`data-toggle--visible`);
            checkBox.classList.add(`data-toggle--hidden`);
        }
    };
    
    window.toggleDataColumns = toggleDataColumns;
    
})();