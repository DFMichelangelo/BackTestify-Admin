import React, { useEffect } from "react";
import "./style.scss";
import PublicAppBar from "components/PublicAppBar";
import config from "configuration/config";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import useFetch from "hooks/useFetch"
import Endpoints from "Endpoints"
import RoundLoader from "components/RoundLoader";
function TermsAndConditions(props) {
  const { t } = useTranslation();
  const { fetch, data, loading } = useFetch()
  const loadData = async () => {
    await fetch({
      method: "GET",
      name: "privacyPolicy",
      url: Endpoints.tos.getTermsAndConditions,
    })
  }
  useEffect(() => { loadData() }, [])
  if (loading) return <RoundLoader />
  return (
    <PublicAppBar title="tos.termsAndConditions">
      <Helmet title={`${config.name.short} - ${t("tos.termsAndConditions")}`} />
      <div id="termsAndConditions">
        {data?.value && <div dangerouslySetInnerHTML={{ __html: data?.value }} className='documentation-content' />}
      </div>
    </PublicAppBar>
  );
}

export default TermsAndConditions;
