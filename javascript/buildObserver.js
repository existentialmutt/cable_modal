export default function buildObserver(CableModal) {
  const observer = new MutationObserver((mutations, observer) => {
    for (let mutation of mutations) {
      const { type, attributeName, target } = mutation
      if (type === "attributes" && attributeName === "data-cable-modal") {
        target.dataset.cableModal ? CableModal.connect(target) : CableModal.disconnect(target)
      }
    }
  });
  const observerConfig = {
    attributes: true,
    attributeFilter: "data-cable-modal",
    childList: true,
    subtree: true
  };
  observer.observe(document, observerConfig);
  return observer
}



