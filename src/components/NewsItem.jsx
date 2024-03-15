import React from 'react'

function NewsItem(props){
        let { title, discription, imageUrl, newsUrl, author, publishAt, source } = props;
        return (
            <div>
                <div className="card"
                // style={{width: "18rem"}}
                >
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"87%", zIndex:"1"}}>
                        {source}
                    </span>
                    <img src={!imageUrl ? "https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_960_720.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{discription}...</p>
                        <p className="card-text"><small className="text-muted">By {author} on {(new Date(publishAt)).toGMTString()}</small></p>
                        <a href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )

}

export default NewsItem;
