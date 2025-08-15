import { useAuth } from "@/components/hooks/useAuth";
import { useImage } from "@/components/hooks/useImage";
import Logo from "@/components/logo";
import ImageLinkForm from "@/components/imageLinkForm";
import Rank from "@/components/rank";
import FaceRecognition from "@/components/faceRecognition";

export default function Home() {
  const { user } = useAuth();
  const { imageURL, input, boxes, onInputChange, onSubmit } = useImage();

  return (
    <>
      <Logo />
      <Rank name={user?.name || ""} entries={user?.entries || 0} />
      <ImageLinkForm
        input={input}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
      />
      <FaceRecognition boxes={boxes} imageURL={imageURL} />
    </>
  );
}
