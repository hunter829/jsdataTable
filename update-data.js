(() =>{
    const checkAndUpdateCell = (ev) => {
            const tableCell = ev.currentTarget;
            const tableCellData = ev.currentTarget.innerHTML;
            const tableRow = tableCell.parentNode.classList.value;
            const splitClassNames = tableRow.split(' ');
            const cellKey = tableCell.classList.value.split(' ')[1].split('-')[0]
            const rowKey = splitClassNames[1].split('-')[1];
            const rowNum = splitClassNames[2].split('-')[1];

        if (tableCellData !== paginationList[rowKey][rowNum-1][cellKey]) {
          paginationList[rowKey][rowNum-1][cellKey] = tableCellData;
        }
  };
})();