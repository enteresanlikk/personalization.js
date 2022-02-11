const cookieKey = 'personalization';

document.addEventListener('DOMContentLoaded', () => {
  const cookie = new Cookie();

  const personalization = new Personalization(data);
  
  let selectedTags = cookie.get(cookieKey);
  if(selectedTags) {
    selectedTags = JSON.parse(selectedTags);
  } else {
    selectedTags = [];
  }

  selectedTags.map(t => {
    const element = document.querySelector(`.radio-btn[data-type="${t.type}"][data-tag="${t.tag}"]`);
    
    if(element) element.setAttribute('checked', 'checked');
  });

  personalization.run(selectedTags);

  document.querySelectorAll('.radio-btn').forEach((btn) => {
    btn.addEventListener('change', () => {
      let arr = [];
      document.querySelectorAll('.radio-btn:checked').forEach((item) => {
        arr.push({
          type: item.getAttribute('data-type'),
          tag: item.getAttribute('data-tag'),
        });
      });

      cookie.set(cookieKey, JSON.stringify(arr));

      personalization.run(arr);
    });
  });
});
