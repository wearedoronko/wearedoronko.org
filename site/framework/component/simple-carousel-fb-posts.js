/* eslint-disable max-len */
const SimpleCarousel = require('./simple-carousel.js');

module.exports = class SimpleCarouselFBPosts extends SimpleCarousel {
  componentName() {
    return 'SimpleCarouselFBPosts';
  }

  script(prop) {
    return /* javascript*/`
      window.addEventListener('load', (evt) => {
        const updateFBPost = (_) => {
          const getShortDesc = (raw) => {
            if(raw.length > 50){
              raw = raw.substring(0, 50) + '...';
            }
            return raw;
          };
          const getJapanFormatDate = (raw) => {
            const d = new Date(raw);
            const formattedDateString =
              d.getFullYear()
              + '年'
              + (d.getMonth() + 1)
              + '月'
              + d.getDate()
              + '日';
            return formattedDateString;
          };
          const updateCarouselContent = (count, desc, date, postId, attacmentEndpoint) => {
            const card =
              document.querySelectorAll('.SimpleCarouselFBPosts a')[count];
            card.querySelector('.description').innerText = getShortDesc(desc);
            card.querySelector('.meta').innerText = getJapanFormatDate(date);
            card.href =
              'https://www.facebook.com/nomugi.doronko/posts/'
              + postId.split('_')[1];
            fetch(attacmentEndpoint).then(rawAttachments => {
              rawAttachments.json().then(attachments => {
                let imgSrc = '';
                if (attachments.data[0]) {
                  imgSrc = attachments.data[0].media.image.src;
                }
                card.querySelector('img').src = imgSrc;
              })
            })                  
          };
          const getTimeline = (_) => {
            const maxContentSize = 5;
            const fbPageID = 'nomugi.doronko';
            /* https://qiita.com/ari-chel/items/bac6c90f5c85a8295352 */
            const accessToken = 'EAAk2HMC9c5MBALfUSR1ZC1QBDjUZALjcyh1uqeOoZAHIZBXmkZCRC2vYYEr9anugBZAB6njpOg1ElmrD92AShv02oO47rs46m4pYWQxLUmSq5eaRug1coZAPZCiHLl5YkSmcy9W5HYYa7VQ3c0CsZAfKrRKHt4zghqEAllZBPGDdZBVqwZDZD';
            const endpoint =
              'https://graph.facebook.com/v10.0/'
              + fbPageID
              + '/feed?access_token=' + accessToken;
            let count = 0;
            fetch(endpoint).then(raw => {
              raw.json().then(json => {
                json.data.slice(0, maxContentSize).forEach((post) => {
                  const endpontAttachments =
                    'https://graph.facebook.com/v10.0/'
                    + post.id
                    + '/attachments?access_token=' + accessToken;
                  updateCarouselContent(
                    count,
                    post.message,
                    post.created_time,
                    post.id,
                    endpontAttachments);
                  count++;
                });
              });
            });
          };
          getTimeline();
        };
        updateFBPost();
      });
    `;
  }
};
