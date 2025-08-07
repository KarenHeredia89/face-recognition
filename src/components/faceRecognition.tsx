// https://samples.clarifai.com/face-det.jpg
// https://www.socialnicole.com/wp-content/uploads/2015/02/youngsters.jpg

const FaceRecognition = ({
  imageURL,
  boxes,
}: {
  imageURL: string;
  boxes: any[];
}) => {
  return (
    <div className="center">
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt=""
          src={imageURL}
          width="500px"
          height="auto"
        />

        {boxes.map((box) => (
          <div
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
              position: "absolute",
              boxShadow: "0 0 0 3px #d5008f inset",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              cursor: "pointer",
            }}
            key={box.id}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
