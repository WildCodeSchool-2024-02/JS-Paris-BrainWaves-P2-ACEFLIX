
import "./final.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FinalBanner from "../../components/FinalBanner/FinalBanner";
import Actors from "../../components/Actors/Actors";

export default function Final() {

    const {type, id} = useParams();
   

    const theKey = "aea07ae608264c18c1ea1431604753c3"
    const fetchUrl =`https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=${theKey}`

    const [bannerInfo, setBannerInfo] = useState(null);

    useEffect(()=>{
        fetch(fetchUrl)
        .then((res)=> res.json())
        .then((data) =>  setBannerInfo(data))
        .catch((err) => console.error(err))

        
    }, [fetchUrl])

    return(
        <div id="Final">
               {bannerInfo && <FinalBanner bannerInfo={bannerInfo} />}
               <Actors type={type} id={id}/>
              
       </div>
    )

}
