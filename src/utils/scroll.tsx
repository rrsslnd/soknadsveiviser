export function scrollTilElement(
  elementid?: string,
  oppforsel: ScrollBehavior = "smooth"
) {
  let elementPos = 0;

  if (typeof elementid !== "undefined") {
    elementPos =
      document.getElementById(elementid)!.getBoundingClientRect().top +
      window.scrollY;
  }

  try {
    window.scroll({
      top: elementPos,
      behavior: typeof oppforsel === "undefined" ? "smooth" : oppforsel
    });
    console.log("try windows croll");
  } catch (e) {
    try {
      if (typeof elementid === "undefined") {
        console.log("periodebanner");
        elementid = "periodebanner";
      }
      document.getElementById(elementid)!.scrollIntoView();
    } catch (e) {
      console.log("Kunne ikke scrolle");
    }
  }
}

export function scrollTilNyttVedlegg(
  elementid: string,
  oppforsel: ScrollBehavior = "smooth",
  isCheckedYet: boolean | undefined
) {
  isCheckedYet === undefined
    ? document.getElementById(elementid)!.scrollIntoView()
    : console.log("cannot scroll yo");
}
