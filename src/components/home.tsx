import { useAuth } from "@/components/hooks/useAuth";
import { useImage } from "@/components/hooks/useImage";
import Logo from "@/components/logo";
import ImageLinkForm from "@/components/imageLinkForm";
import Rank from "@/components/rank";
import FaceRecognition from "@/components/faceRecognition";

export default function Home() {
  const { user, loadUser } = useAuth();
  const { imageURL, boxes, onInputChange, onSubmit } = useImage(loadUser);
  return (
    <>
      <Logo />
      <Rank name={user?.name || ""} entries={user?.entries || 0} />
      <ImageLinkForm
        onInputChange={onInputChange}
        onSubmit={() => user && onSubmit(user)}
      />
      <FaceRecognition boxes={boxes} imageURL={imageURL} />
    </>
  );
}
