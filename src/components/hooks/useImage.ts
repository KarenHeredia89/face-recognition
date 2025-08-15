import { useAuthStore } from "@/store/authStore";

interface ImageProps {
  imageURL: string;
  boxes: any[];
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  clearImageState: () => void;
}

export const useImage = (): ImageProps => {
  const {
    user,
    updateUser,
    imageURL,
    input,
    boxes,
    setImageURL,
    setInput,
    setBoxes,
    clearImageState,
  } = useAuthStore();

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

  const onSubmit = async () => {
    const submittedURL = input;
    setInput("");
    setImageURL(submittedURL);
    setBoxes([]);
    if (!user) return;

    try {
      const token = localStorage.getItem("token");

      const clarifaiResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/imageurl`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ input }),
        }
      );
      const result = await clarifaiResponse.json();

      const imageResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/image`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: user.id }),
        }
      );
      const entries = await imageResponse.json();

      updateUser({ ...user, entries });
      displayFaceBox(calculateRegions(result));
    } catch (err) {
      console.error(err);
      clearImageState();
    }
  };

  return {
    imageURL,
    boxes,
    input,
    onInputChange,
    onSubmit,
    clearImageState,
  };
};
