 const autocompleteconfig=({
  renderoption(movie){
  const imgSrc= movie.Poster==='N/A'?'':movie.Poster;
return`
  <img src="${imgSrc}"/>
   ${movie.Title} (${movie.Year})
 `;
},

inputValue(movie){
  return movie.Title;
},
async fetchData(searchTerm){
  const response =await axios.get('http://www.omdbapi.com/' ,{
      params:{
          apikey :'8d4f752e',
         s:searchTerm
      }
   });
if(response.data.Error){
return[];
}
 return response.data.Search;
  }
  
});
    createAutoComplete({
      ...autocompleteconfig,
      
      root:document.querySelector('#left-autocomplete'),
      onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
         onMovieSelect(movie,document.querySelector('#left-summary'),'left');
      }
      
    });
    createAutoComplete({
      ...autocompleteconfig,
     
      root:document.querySelector('#right-autocomplete'),
       onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
         onMovieSelect(movie,document.querySelector('#right-summary'),'right');
      }
      
    });

let leftMovie;
let rightMovie;

const onMovieSelect= async (movie,aa,side)=>{

  
  const response=await axios.get('http://www.omdbapi.com/' ,{
    params:{
        apikey :'8d4f752e',
       i:movie.imdbID
    }
  });
   

   aa.innerHTML=movieTemplate(response.data);
   if(side==='left'){
     leftMovie=response.data;
   }else{
     rightMovie=response.data;
   }
   if(leftMovie && rightMovie){
     runComparison();
   }
  
};


/*const runComparison=()=>{
const leftSideStats=document.querySelectorAll('#left-summary .notification');
const rightSideStats=document.querySelectorAll('#right-summary .notification');

leftSideStats.forEach((leftStat,index)=>{
const rightStat=rightSideStats[index];

const leftSide=parseInt(leftStat.dataset.value) ;
const rightSide=parseInt(rightStat.dataset.value);
if(rightSide>leftSide){
  leftStat.classList.remove('is-primary');
  leftStat.classList.add('is-warning');
}else{
  rightStat.classList.remove('is-primary');
  rightStat.classList.add('is-warning');
}
})
};*/

const runComparison = () => {
  const leftSideStats = document.querySelectorAll(
    '#left-summary .notification'
  );
  const rightSideStats = document.querySelectorAll(
    '#right-summary .notification'
  );
 
  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];
 
    const leftSideValue =parseFloat(leftStat.dataset.value);
    const rightSideValue = parseFloat(rightStat.dataset.value);
 
    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
    } else {
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    }
  });
};



const movieTemplate=(movieDetail)=>{
 const dollars1=parseInt(movieDetail.BoxOffice.replace(/\$/g,"").replace(/,/g,"")) ;
 const metaScore1=parseInt(movieDetail.Metascore);
 const imdbRating1=parseFloat(movieDetail.imdbRating);
 const imdbVotes1=parseInt(movieDetail.imdbVotes.replace(/,/g,''));
 
 const Awards1=movieDetail.Awards.split(' ').reduce((prev,word) => {
   const value=parseInt(word);
   if(isNaN(word)){
     return prev;
   }else{
    return prev+value;
   }
  
 },0);
 
 

  return`
  <article class="media">
  <figure class="media-left">
  <p class="image">
  <img src="${movieDetail.Poster}"/>
  </p>
  </figure>
  <div class="media-content">
  <div class="content">
  <h1>${movieDetail.Title}</h1>
  <h4>${movieDetail.Genre}</h4>
  <P>${movieDetail.Plot}
  </P>
  </div>
  </div>
  </article>
  <article  data-value=${Awards1} class="notification is-primary">
  <p class="title">${movieDetail.Awards}</p>
  <p class="subtitle">Awards</p>
  </article>
  
  <article  data-value=${dollars1} class="notification is-primary">
  <p class="title">${movieDetail.BoxOffice}</p>
  <p class="subtitle">box office</p>
  </article>
  <article  data-value=${metaScore1} class="notification is-primary">
  <p class="title">${movieDetail.Metascore}</p>
  <p class="subtitle">metascore</p>
  </article>
  <article   data-value=${imdbRating1} class="notification is-primary">
  <p class="title">${movieDetail.imdbRating}</p>
  <p class="subtitle">imdb rating</p>
  </article>
  <article data-value=${imdbVotes1} class="notification is-primary">
  <p class="title">${movieDetail.imdbVotes}</p>
  <p class="subtitle">imdb votes</p>
  </article>
  `;

}
