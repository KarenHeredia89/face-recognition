import brain from "@/assets/brain.png";

const Logo = () => {
  return (
    <div className="mb-8" style={{ width: "100px" }}>
      <img src={brain} alt="logo" style={{ width: "100%" }} />
    </div>
  );
};

export default Logo;
