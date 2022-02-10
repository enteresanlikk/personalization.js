const attrPrefix = "personalization";
const componentAttrPrefix = `${attrPrefix}-component`;

const init = () => {
  const components = document.querySelectorAll(`[${componentAttrPrefix}]`);

  for (let component of components) {
    const name = component.getAttribute(componentAttrPrefix);

    if (data.hasOwnProperty(name)) {
      const personComponentData = data[name];
      let personData = personComponentData.find((p) => p.tags.length == 0);
      if (selectedTags.length > 0) {
        let personItems = personComponentData.filter((p) => {
          return p.tags.length > 0;
        });

        let retVal = [];
        for (let i = 0; i < personItems.length; i++) {
          let personItem = personItems[i];

          for (let j = 0; j < personItem.tags.length; j++) {
            let personTag = personItem.tags[j];

            for (let k = 0; k < selectedTags.length; k++) {
              let selectedTag = selectedTags[k];

              if (
                selectedTag.type == personTag.type &&
                selectedTag.tag == personTag.tag
              ) {
                retVal.push(personItem);
              }
            }
          }
        }

        retVal = retVal.sort((a, b) => {
          let aLen = a.tags.length;
          let bLen = b.tags.length;
          return aLen < bLen ? 1 : aLen > bLen ? -1 : 0;
        });

        if (retVal.length == 0) {
          console.error(
            "seçtiğiniz seçeneklere göre veri bulunamadı. varsayılan değerleri görüyorsunuz."
          );
          return;
        }

        personData = retVal[0];
      }

      const items = Array.from(component.querySelectorAll(`* [${attrPrefix}]`));

      for (let item of items) {
        const attr = item.getAttribute(attrPrefix);

        if (personData.hasOwnProperty(attr)) {
          //#region set values
          const d = personData[attr];

          if (d.hasOwnProperty("style")) {
            item.setAttribute("style", d.style);
          }
          if (d.class) {
            d.class.split(" ").map((c) => {
              item.classList.add(c);
            });
          }
          if (attr.indexOf("image") !== -1) {
            if (d.hasOwnProperty("src")) {
              item.setAttribute("src", d.src);
            }
            if (d.hasOwnProperty("alt")) {
              item.setAttribute("alt", d.alt);
            }
          } else {
            item.innerHTML = d.text || d;
          }
          //#endregion
        } else {
          console.error(`"${name}" için listede "${attr}" verisi eksik.`);
        }
      }
    } else {
      console.error(`"${name}" için person verisi oluşturulmadı.`);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  init();

  document.querySelectorAll(".radio-btn").forEach((btn) => {
    btn.addEventListener("change", () => {
      let arr = [];
      document.querySelectorAll(".radio-btn:checked").forEach((item) => {
        arr.push({
          type: item.getAttribute("data-type"),
          tag: item.getAttribute("data-tag"),
        });
      });

      selectedTags = arr;

      init();
    });
  });
});
