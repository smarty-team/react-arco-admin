import dotenv from "dotenv"
import fetch from "node-fetch"
import algoliasearch from "algoliasearch"

async function getPaginatedPosts(page) {
  const pageSize = 10;
  // const server = 'http://localhost:3000'
  const server = process.env.SERVER

  try {
    const url = `${server}/article?pageSize=${pageSize}&page=${page}`
    console.log('url:', url)
    const res = await fetch(url)
    const { data, meta } = await res.json()
    const total = meta.total;
    const posts = data ? data : [];
    return { posts, total };
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllPosts() {
  let page = 1;
  let shouldQueryMorePosts = true;
  const returnPosts = [];

  while (shouldQueryMorePosts) {
    const response = await getPaginatedPosts(page);

    if (response.posts.length > 0) {
      returnPosts.push(...response.posts);
    }

    shouldQueryMorePosts = returnPosts.length < response.total;
    page++;
  }

  return returnPosts;
}

function transformPostsToSearchObjects(posts) {
  const transformed = posts.map((post) => {
    return {
      objectID: post._id,
      title: post.title,
      excerpt: post.excerpt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      content: post.content
    };
  });

  return transformed;
}

(async function () {

  dotenv.config();

  try {
    const posts = await getAllPosts();
    const transformed = transformPostsToSearchObjects(posts);
    console.log('transformed', transformed)
    // initialize the client with your environment variables
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_ADMIN_KEY
    );

    // initialize the index with your index name
    const index = client.initIndex("my_cms_content");

    // save the objects!
    const algoliaResponse = await index.saveObjects(transformed);

    // check the output of the response in the console
    console.log(
      `🎉 Sucessfully added ${algoliaResponse.objectIDs.length
      } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
        "\n"
      )}`
    );
  } catch (error) {
    console.log(error);
  }
})();
