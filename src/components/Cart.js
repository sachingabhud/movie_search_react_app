import React,{useState,useEffect} from 'react';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
export default function Cart() {
  const [seachName,setSearchName] = useState("");
  const [page,setPage] = useState(1);
  const [totalPage,setTotalPage] = useState(0);
  const [data,setData] = useState([]);

  let Api_data;
  const getData =async (pageNumber)=>{
    const url = `https://api.themoviedb.org/4/list/1?api_key=3068a0e2376185dd3c3fad8dff28cb55&page=${pageNumber}`
    const response = await fetch(url);
     Api_data = await response.json();
    setData(Api_data.results)
    setTotalPage(Api_data.total_pages)
    
  }

  const searchMovi = ()=>{
    if(seachName===""){
        return
    }
    else{
        
    const out = data.filter((item)=>{
        return item.title===seachName;
    })

    setData(out)
}

  }
  useEffect(()=>{
    getData(1);
  },[])

  const hanldeOnChange = (e)=>{
    setSearchName(e.target.value)
  }


  return (
    <>
    <div className='searchBar'>
        <span>Movie Name</span> <input type="text" value={seachName} onChange={hanldeOnChange}/>
        <button onClick={searchMovi}>Search</button>
    </div>

    <div className='main_content'>
      {
        data.filter((value)=>value.title.toLowerCase().includes(seachName.toLowerCase())).map((item)=>{
            return(
                <div className='moviCart'>
                    <div className='img'>
                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="poster"/>
                    </div>
                    <div className='details'>
                    <h3>Title : {item.title}</h3>
                    <h6>Release Data : {item.release_date}</h6>
                    <h6>Rating : {item.vote_average}</h6>
                    <p>{item.overview}</p>
                    </div>
                
                </div>
            )
        })
      }
    </div>
    <div className='page'>
      <BiLeftArrow onClick={async()=>{
        if(page>1){
         await setPage(page-1)
         window.scrollTo({top:0,behavior:'smooth'})

        await getData(page-1)

        }
       
      }}/> <div className='pageNumber'>
        {page}
        
      </div><BiRightArrow onClick={ async()=>{
        console.log(Api_data)
        if(page<totalPage){
         await setPage(page+1)
         window.scrollTo({top:0,behavior:'smooth'})

        await getData(page+1)
        
        }
       
        
        }}/>
    </div>
    </>
  );
}
