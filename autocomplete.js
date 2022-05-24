const createAutoComplete=({root,renderoption,onOptionSelect,inputValue,fetchData})=>{

   
    root.innerHTML=`
      <label><b>SEARCH <b></label>
      <input class="input"/>
      <div class="dropdown">
      <div class="dropdown-menu">
      <div class="dropdown-content results">
      </div>
      </div>
      </div>
  
    `;
  
      const input=root.querySelector('input');
      const dropDown=root.querySelector('.dropdown');
      const resultswrappper=root.querySelector('.results');
  
     
      const onInput=async (e)=>{
        const items=await fetchData(e.target.value);
        if(!items.length){
          dropDown.classList.remove('is-active');
          return;
        }
        dropDown.classList.add('is-active');
        resultswrappper.innerHTML="";
       
        for (let item of items){
         
  
  
          let option=document.createElement('a');
          option.classList.add('dropdown-item');
          option.innerHTML=renderoption(item);
         
  
        option.addEventListener('click',()=>{
          dropDown.classList.remove('is-active');
          input.value=inputValue(item);
          onOptionSelect(item);
         });
         resultswrappper.appendChild(option);
        }
   
       
      
      };
      input.addEventListener('input',debounce(onInput,2000));
      document.addEventListener('click',(e)=>{
        if(!root.contains(e.target)){
          dropDown.classList.remove('is-active');
  
        }
      })
  
}