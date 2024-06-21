import React from 'react';
import './FaceRecognition.css'
// https://samples.clarifai.com/face-det.jpg
// https://www.socialnicole.com/wp-content/uploads/2015/02/youngsters.jpg

const FaceRecognition = ({ imageURL, boxes }) => {
    return(
        <div className='center'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageURL} width='500px' height='auto' />

                { boxes.map((box) => (
                    <div 
                        className='bounding-box'
                        style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
                        key={box.id}
                    >
                    </div>

                ))}
                
            </div>
        </div>
    )
}

export default FaceRecognition;