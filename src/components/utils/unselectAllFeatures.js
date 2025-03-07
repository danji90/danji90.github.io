function unselectAllFeatures(features) {
  features.forEach((feature) => {
    feature.set('selected', false);
  });
}

export default unselectAllFeatures;
