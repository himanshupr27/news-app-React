import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import env from "dotenv";

function News(props) {

  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

 
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    document.title = `Daily Hunt- ${capitalizeFirstLetter(props.category)}`;
    const updateNews = async () => {
      setLoading(true);
      let result = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.API_KEY}=${page}&pageSize=${props.pageSize}`);
      let finalResult = await result.json();
      let data = finalResult.articles;
      setArticle(prev=>[...prev,...data]);
      setLoading(false);
      console.log("updateNews",data);
  
    };

    updateNews();

  }, [props.country, props.category, page, props.pageSize]);

  //paginantion-next and previous
  // const handlePrevious=()=>{
  //   setPage(page - 1);
  //   updateNews();
  //  }
  //  const handleNext = ()=>{
  //    setPage(page + 1);
  //    updateNews();
  //  }
  
  // Different way of infinite scroll
  // const handleScroll=()=>{
  //   if(window.innerHeight + document.documentElement.scrollTop +1 >=document.documentElement.scrollHeight){
  //     setPage(prev => prev+1);
  //     setLoading(true);
  //   }
  // };
  //  useEffect(()=>{
  //   window.addEventListener("scroll",handleScroll);
  //   return()=> window.removeEventListener("scroll",handleScroll);
  //  },[])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.API_KEY}=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticle(parsedData.articles)
    setTotalResults(parsedData.totalResults)
  };
  return (
    <>
      <h1 className="text-center" style={{ marginTop: "90px" }}>TOP HEADLINES - {(props.category).toUpperCase()} HEADLINES</h1>
      {/* {loading && <Spinner />} */}
      <div id="usingScroll"  style={{height:"500px", overflow:"auto"}}>
      <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length !== totalResults}
        loader={<Spinner />}
        scrollableTarget="usingScroll"
      >
        <div className="container">
          <div className="row my-3">
            {article?.map((element) => {
              return <div className="col-md-4 my-3" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} discription={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"} publishAt={element.publishedAt} source={element.source.name} />
              </div>
            })}
            {/* paginantion-next and previous */}
            {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <=1 } type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize) } type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
          </div> */}
          </div>
        </div>
      </InfiniteScroll>
      </div>
    </>
  )
}
News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
}

export default News;