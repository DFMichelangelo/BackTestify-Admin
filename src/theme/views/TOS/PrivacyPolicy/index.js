import React, { useEffect } from "react";
import "./style.scss";
import RoundLoader from "components/RoundLoader";
import PublicAppBar from "components/PublicAppBar";
import Typography from "@mui/material/Typography";
import config from "configuration/config";
import Helmet from "react-helmet";
import { Trans, useTranslation } from "react-i18next";
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import useFetch from "hooks/useFetch"
import Endpoints from "Endpoints"
function PrivacyPolicy(props) {
  const { t } = useTranslation();
  const { fetch, data, loading } = useFetch()
  const loadData = async () => {
    await fetch({
      method: "GET",
      name: "privacyPolicy",
      url: Endpoints.tos.getPrivacyPolicy,
    })
  }
  useEffect(() => { loadData() }, [])
  if (loading) return <RoundLoader />
  return (
    <PublicAppBar title="Privacy Policy">
      <Helmet title={`${config.name.short} - Privacy Policy`} />
      <div id="privacyPolicy">
        {data?.value && <div dangerouslySetInnerHTML={{ __html: data?.value }} className='documentation-content' />}
      </div>
    </PublicAppBar>
  );
}

export default PrivacyPolicy;
