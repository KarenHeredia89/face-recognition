import { useState } from "react";
import Navigation from "./components/navigation";
import Logo from "./components/logo";
import ImageLinkForm from "./components/imageLinkForm";
import Rank from "./components/rank";
import FaceRecognition from "./components/faceRecognition";
import Signin from "./components/signin";
import Register from "./components/register";

interface User {
  id: string;
  name: string;
  email: string;
  entries: number;
  joined: string;
}

export default function App() {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const calculateRegions = (data: any) => {
    const regions = data.data.regions;
    const image = document.getElementById("inputImage") as HTMLImageElement;
    const width = image ? Number(image.width) : 0;
    const height = image ? Number(image.height) : 0;
    const dataRegions = regions.map((region: any) => {
      // Accessing and rounding the bounding box values
      const boundingBox = region.region_info.bounding_box;
      return {
        id: region.id,
        topRow: boundingBox.top_row * height,
        leftCol: boundingBox.left_col * width,
        bottomRow: height - boundingBox.bottom_row * height,
        rightCol: width - boundingBox.right_col * width,
      };
    });
    return dataRegions;
  };

  const loadUser = (user: User) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined,
    });
  };

  const displayFaceBox = (box: any) => {
    setBoxes(box);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = () => {
    setImageURL(input);

    fetch("http://localhost:8000/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((result) => displayFaceBox(calculateRegions(result)))
      .catch((err) => console.log(err));

    fetch("http://localhost:8000/image", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
      }),
    })
      .then((response) => response.json())
      .then((count) => {
        setUser((prevState) => {
          return { ...prevState, entries: count };
        });
      })
      .catch((err) => console.log(err));
  };
  const onRouteChange = (route: string) => {
    if (route === "signin") {
      setIsSignedIn(false);
      setImageURL("");
      setInput("");
      setBoxes([]);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };
  return (
    <>
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      <div className="bg-slate-950 h-[calc(100vh-36px)] text-white flex flex-col items-center p-8">
        {route === "home" ? (
          <>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
            <FaceRecognition boxes={boxes} imageURL={imageURL} />
          </>
        ) : route === "signin" ? (
          <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
        ) : (
          <Register onRouteChange={onRouteChange} loadUser={loadUser} />
        )}
      </div>
    </>
  );
}
