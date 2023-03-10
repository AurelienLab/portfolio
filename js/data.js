const baseUrl = "https://api.portfolio.vmedias.fr/wp-json";
let categories,
  categoriesSlug = [];
let sites;
let aboutMe;

async function getData() {
  aboutMe = await getAboutMe();
  categories = await getCategories();
  sites = await getSites();
}

async function getSites() {
  return fetch(baseUrl + "/wp/v2/posts")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((sites) => {
      let promises = [];
      for (let site of sites) {
        promises.push(
          fetch(baseUrl + "/wp/v2/media/" + site.featured_media)
            .then((res) => {
              if (res.ok) return res.json();
            })
            .then((media) => {
              site.imageUrl = media.media_details.sizes.medium.source_url;
              site.altText = media.alt_text;
            })
            .catch((err) => console.log(err))
        );

        site.tagList = [];
        for (const tag of site.tags) {
          promises.push(
            fetch(baseUrl + "/wp/v2/tags/" + tag)
              .then((res) => {
                if (res.ok) return res.json();
              })
              .then((tag) => {
                site.tagList.push(tag.name);
              })
              .catch((err) => console.log(err))
          );
        }
      }

      return Promise.all(promises)
        .then(() => {
          return sites;
        })
        .catch((err) => console.log(err));
    });
}

async function getCategories() {
  return fetch(baseUrl + "/wp/v2/categories")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((categories) => {
      for (const cat of categories) {
        categoriesSlug.push(cat.slug);
      }
      return categories;
    })
    .catch((error) => console.log({ error }));
}

async function getAboutMe() {
  return fetch(baseUrl + "/wp/v2/pages?slug=about-me")
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((page) => {
      return page[0];
    });
}
