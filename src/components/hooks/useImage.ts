import { useState } from "react";
import type { User } from "@/types/types";

interface ImageProps {
  imageURL: string;
  boxes: any[];
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (currentUser: User) => Promise<void>;
  setImageURL: React.Dispatch<React.SetStateAction<string>>;
  setBoxes: React.Dispatch<React.SetStateAction<any[]>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export const useImage = (updateUser: (user: User) => void): ImageProps => {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [boxes, setBoxes] = useState<any[]>([]);

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

  const displayFaceBox = (box: any) => {
    setBoxes(box);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = async (currentUser: User) => {
    setImageURL(input);

    try {
      const clarifaiResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/imageurl`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input }),
        }
      );
      const result = await clarifaiResponse.json();
      displayFaceBox(calculateRegions(result));

      const imageResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/image`,
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: currentUser.id }),
        }
      );
      const entries = await imageResponse.json();

      updateUser({ ...currentUser, entries });
    } catch (err) {
      console.error(err);
    }
  };

  return {
    imageURL,
    boxes,
    input,
    onInputChange,
    onSubmit,
    setImageURL,
    setBoxes,
    setInput,
  };
};
