import { useState, useEffect } from "react";

function Card({data}) {
    const [hover, setHover] = useState(false);

    return (
    <div id="shop-element-template" className="col bg-dark" onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
        <div className="container-fluid no-gutters">
            <div className={"shop-row row" + (hover ? " hover" : "")}>
                <div className="col-3">
                    <img className="dimImage" src={data.image} alt = "Firework1"/>
                </div>
                <div className="col-9">
                    <h2 className="text-white">{data.title}, ID: {data.id}</h2>
                    <h3 className="text-white" style={{opacity:"0.7", paddingBottom:"15px"}}>({data.category})</h3>
                    <p className="text-white" style={{opacity:"0.6", paddingBottom:"15px"}}>{data.description}</p>
                    <p className="text-white" style={{opacity:"0.6"}}>rating: {data.rating.rate}, {data.rating.count} reviews</p>
                    <span className="card-price" style={{border: '4px solid rgb(60 175 60)', color: 'white', backgroundColor: "rgb(100 193 125)", borderRadius:"10px"}}>${data.price}</span>
                    <div className="d-flex justify-content-between align-items-center" style={{marginTop:"7%"}}>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Card;