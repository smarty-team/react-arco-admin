import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch-hooks-web";
import "instantsearch.css/themes/satellite.css";
import { useEffect, useMemo } from "react";
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
  const { clear } = useSearchBox();
  const createdAt = useMemo(
    () => "发布日期：" + hit.createdAt.split("T")[0],
    [hit.createdAt]
  );

  return (
    <ActiveLink href={`/posts/${hit.objectID}`} onClick={clear}>
      <h1>{hit.title}</h1>
      <p>{createdAt}</p>
    </ActiveLink>
  );
}

function SearchResults() {
  const { results } = useInstantSearch();
  return (
    <>{results.query && results.nbHits ? <Hits hitComponent={Hit} /> : null}</>
  );
}

export default function Search(props) {
  return (
    <div className="relative lg:ml-4 lg:block hidden">
      <InstantSearch searchClient={searchClient} indexName="my_cms_content">
        <SearchBox classNames={{input: 'dark:rounded-none'}}/>
        <SearchResults></SearchResults>
      </InstantSearch>
    </div>
  );
}
