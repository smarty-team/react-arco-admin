// ./components/Search/index.js

// “algoliasearch/lite” is the search-only version of the API client — optimized for size and search
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-hooks-web";
import "instantsearch.css/themes/satellite.css";
import { useMemo } from "react";
import ActiveLink from "../layout/active-link";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
);

type Article = {
  objectID: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

function Hit({ hit }: { hit: Article }) {
  
  const createdAt = useMemo(
    () => "发布日期：" + hit.createdAt.split("T")[0],
    [hit.createdAt]
  );

  return (
    <ActiveLink href={`/posts/${hit.objectID}`}>
      <h1>{hit.title}</h1>
      <p>{createdAt}</p>
    </ActiveLink>
  );
}

export default function Search() {
  return (
    <div className="relative">
      <InstantSearch searchClient={searchClient} indexName="my_cms_content">
        <SearchBox />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
}
