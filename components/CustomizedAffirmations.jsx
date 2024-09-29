import { AFFIRMATION_GALLERY } from "../constants/Affirmation-Gallery";
import GuidedAffirmationsGallery from "./GuidedAffirmationsGallery";

const CustomizedAffirmations = () => {
  return AFFIRMATION_GALLERY.slice(0, 4).map((item) => (
    <GuidedAffirmationsGallery
      title={item.title}
      previews={item.data}
      key={item.title}
    />
  ));
};

export default CustomizedAffirmations;
