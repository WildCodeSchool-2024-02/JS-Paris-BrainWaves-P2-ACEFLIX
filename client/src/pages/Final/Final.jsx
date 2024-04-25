
import "./final.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FinalBanner from "../../components/FinalBanner/FinalBanner";
import Comments from "../../components/Comments/Comments";


export default function Final() {

    const {type, id} = useParams();
   

    const theKey = "aea07ae608264c18c1ea1431604753c3"
    const fetchUrlBanner =`https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=${theKey}`
    const fetchComment = `https://api.themoviedb.org/3/${type}/${id}/reviews?language=en-US&page=1&api_key=${theKey}`

    const [bannerInfo, setBannerInfo] = useState(null);
    const [comments, setComments] = useState(null);


    useEffect(()=>{
        fetch(fetchUrlBanner)
        .then((res)=> res.json())
        .then((data) =>  setBannerInfo(data))
        .catch((err) => console.error(err));

        fetch(fetchComment)
        .then((res)=> res.json())
        .then((data) =>  setComments(data.results))
        .catch((err) => console.error(err))

        
    }, [fetchUrlBanner, fetchComment])

    return(
        <div id="Final">
               {bannerInfo && <FinalBanner bannerInfo={bannerInfo} />}
               {comments && <Comments comments={comments} setComments={setComments} />}        
       </div>
    )

}
