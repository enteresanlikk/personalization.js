class Personalization {
    constructor(data, prefix = null, componentPrefix = null) {
      if(!data) {
        return this.error('kişiselleştirilmiş veriler bulunamadı.');
      }
      this.data = data;
      this.attribute = prefix || 'personalization';
      this.componentPrefix = componentPrefix || 'component';
  
      this.componentAttribute = `${this.attribute}-${this.componentPrefix}`;
    }
  
    error(text) {
      //console.info(text);
    }
  
    getAllComponents() {
      return document.querySelectorAll(`[${this.componentAttribute}]`);
    }
  
    sortByTagLength(data) {
      return data.sort((a, b) => {
        let aLength = a.tags.length;
        let bLength = b.tags.length;
        return aLength < bLength ? 1 : aLength > bLength ? -1 : 0;
      });
    }
  
    render(element, data) {
      const attr = element.getAttribute(this.attribute);

      const attributes = Array.from(element.attributes);
      for(const attribute of attributes) {
        if(attribute.name != this.attribute) {
          element.removeAttribute(attribute.name);
        }
      }
  
      const keys = Object.keys(data);
      for(const key of keys) {
        const item = data[key];
        if(key == 'text') {
          element.innerHTML = item;
        } else {
          element.setAttribute(key, item);
        }
      }
    }
  
    run(selectedTags = []) {
      if(!selectedTags) {
        return this.error('seçilen değerler bulunamadı.');
      }
  
      let components = this.getAllComponents();
      if(components.length == 0) {
        return this.error('bileşenler bulunamadı.');
      }
  
      for(const component of components) {
        const componentName = component.getAttribute(this.componentAttribute);
  
        if(!this.data.hasOwnProperty(componentName)) {
          this.error(`${componentName} bileşeni için kişiselleştirilmiş değerler oluşturulmadı.`);
        }
  
        const personalizationComponentData = this.data[componentName];
        let personalizationData = personalizationComponentData.find(pcd => pcd.tags.length === 0);
  
        if(!personalizationData) {
          this.error(`${componentName} bileşeni için varsayılan kişiselleştirilmiş değer oluşturulmadı.`);
        }
        
        if(selectedTags.length > 0) {
          let personItems = personalizationComponentData.filter(pcd => pcd.tags.length > 0);
  
          let matchedData = [];
          for (const personItem of personItems) {
            for (const personTag of personItem.tags) {
              for (const selectedTag of selectedTags) {
                if (selectedTag.type == personTag.type && selectedTag.tag == personTag.tag) {
                  matchedData.push(personItem);
                }
              }
            }
          }
  
          matchedData = this.sortByTagLength(matchedData);
  
          if (matchedData.length == 0) {
            this.error('Seçtiğiniz verilere göre bileşen gösterilemiyor. Bunun yerine varsayılan bileşeni görüyorsunuz.');
          } else {
            personalizationData = matchedData[0];
          }
        }
  
        const subItems = Array.from(component.querySelectorAll(`[${this.attribute}]`));
  
        for (let subItem of subItems) {
          const attr = subItem.getAttribute(this.attribute);
  
          if (personalizationData.hasOwnProperty(attr)) {
            const d = personalizationData[attr];
  
            this.render(subItem, d);
          }
        }
      }
    }
}