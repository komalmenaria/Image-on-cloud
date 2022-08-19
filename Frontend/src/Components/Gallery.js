import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
function Gallery() {
    
    const [imageIds, setImageIds] = useState([]);
    const loadImages = async () => {
        try {
            const {data} = await axios.get('/api/images');
            // const data = await res.json();
            // setImageIds(data);
            console.log(data)
            if(data.status===true){
                setImageIds(data.data)
            }else{
                alert(data.message)
            }
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        loadImages();
    }, []);
  return (
    <div>
        
            <h1 className="title">Cloudinary Gallery</h1>
            <div className="gallery">
                {/* while rendring image use lazy loading */}
               {imageIds.length && imageIds.map((e)=>{
                 
                return  <> <LazyLoadImage style={{margin:"5px"}} effect="blur" height={100} width={100} src={e.images.url} alt="" />  </>
               })}
            </div>
        </div>
  )
}

export default Gallery










