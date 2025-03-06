import eduIcon from '../../assets/images/edu.png';
import workIcon from '../../assets/images/work.png';
import residenceIcon from '../../assets/images/residence.png';

function getIconSource(type) {
  let src = eduIcon;
  if (type === 'work') {
    src = workIcon;
  }
  if (type === 'residence') {
    src = residenceIcon;
  }
  return src;
}

export default getIconSource;
