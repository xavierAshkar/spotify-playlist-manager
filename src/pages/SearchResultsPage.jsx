// src/pages/SearchResultsPage.jsx
import Layout from "../layout/Layout";

import * as H from '../layout/header';

import HistoryPanel from "../layout/left/HistoryPanel";
import SearchResultsMain from "../layout/main/SearchResultsMain";
import QueuePanel from "../layout/right/QueuePanel";

import * as F from '../layout/footer';

export default function SearchResultsPage() {
  return (
    <Layout
      headerLeft={<H.HeaderLeft />}
      headerCenter={<H.HeaderCenter />}
      headerRight={<H.HeaderRight />}

      left={<HistoryPanel />}
      main={<SearchResultsMain />}
      right={<QueuePanel />}

      footerLeft={<F.FooterLeft />}
      footerCenter={<F.FooterCenter />}
      footerRight={<F.FooterRight />}
    />
  );
}
