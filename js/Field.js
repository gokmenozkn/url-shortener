export function createCopyLinkField(nodeBefore, originalUrl, shortUrl="Waiting...") {
  /**
   * shortened__links -> 
   * shortened__links__container -> 
   * original and (shortVersion -> short__version__link and copy)
   */

  let mainDiv = document.createElement("div");
  mainDiv.className = "shortened__links";

  let container = document.createElement("div");
  container.className = "shortened__links__container";

  let original = document.createElement("div");
  original.className = "original";
  original.textContent = originalUrl;

  let shortVersion = document.createElement("div");
  shortVersion.className = "short__version";
  
  let span = document.createElement("span");
  span.className = "short__version__link";
  span.textContent = shortUrl;

  let button = document.createElement("button");
  button.className = "copy";
  button.textContent = "Copy";
  button.addEventListener("click", () => {
    button.textContent = "Copied!";
    button.style.background = "black";

    navigator.clipboard.writeText(span.textContent);

    setTimeout(() => {
      button.textContent = "Copy";
      button.style.background = "hsl(180, 66%, 49%)";
    }, 2000);
  });

  shortVersion.appendChild(span);
  shortVersion.appendChild(button);

  mainDiv.appendChild(container);
  container.appendChild(original);
  container.appendChild(shortVersion);

  let check = document.querySelector(".shortened__links");
  if (!check) {
    nodeBefore.after(mainDiv);
  } else {
    check.appendChild(container);
    container.appendChild(original);
    container.appendChild(shortVersion);
  }
}