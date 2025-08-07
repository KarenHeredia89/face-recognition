import Tilt from "react-parallax-tilt";

const Logo = () => {
  return (
    <div className="ma4 mt0" style={{ width: "150px" }}>
      <Tilt>
        <div
          className="tilt br2 shadow-2 pa3"
          style={{
            background: "linear-gradient(89deg, #2f1dd3 0%, #130596 100%)",
          }}
        >
          <img src={"brain.png"} alt="logo" style={{ width: "100%" }} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
