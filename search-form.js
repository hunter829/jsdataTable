(()=>{
    const body = document.body;
    
    let div,span,form,input,label,div_form,fir_form;
    const createForm = () =>{
    div = document.getElementsByClassName('main')[0];
        fir_form = document.createElement('form');
            div_form = document.createElement('div');
            div_form.classList.add('form-group');

                form = document.createElement('form');
                form.classList.add('search-form');
                input = document.createElement('input');
                input.classList.add('search-box','form-control');
                input.type = 'text';
                input.placeholder = 'Search';
                input.onkeyup = (ev) => {
                    search(ev);
                }
                form.appendChild(input);
        
            div_form.appendChild(form);
        fir_form.appendChild(div_form);
    
    div.appendChild(fir_form);
      
//      constructions as follows
//        <div class = 'menu-dashboard'>
//           <form>
//            <div class = 'form-group'>
//                <input></input>
//            </div>
 //          <form>
//        </div>
        
    };
    
    
    const search = (ev) =>{
        let form,input,filter,table,tr,td,i;
        
        form = document.getElementsByClassName('search-form')[0];
        input = document.getElementsByClassName('search-box')[0];
        filter = input.value.toUpperCase();
        tr = document.getElementsByClassName('table-row-data');
        const trLen = tr.length;
        for(let i=0 ;i<trLen;i++){
            td = tr[i].childNodes;
            let tdLen = td.length;
            for(let j=0;j<tdLen;j++){
                if(td[j].innerHTML.toUpperCase().indexOf(filter)>-1){
                    td[j].parentNode.style.display = '';
                    break;
                }
                else{
                    td[j].parentNode.style.display = 'none';
                }
            }
        }
    }
    
    createForm();
    
})();