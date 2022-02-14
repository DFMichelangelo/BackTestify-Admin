import React, { useContext, useEffect } from "react";
import "./style.scss";
import { Card, CardContent, Button, CardHeader } from "@mui/material";
import { useTranslation } from "react-i18next";
import CardActions from "@mui/material/CardActions";
import { useFormik } from "formik";
import { Editor as EditorWYSIWYG } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import classnames from 'classnames'
import { convertToDraft, convertFromDraft } from 'auxiliaries/DraftJs';
import { ThemeContext } from "contexts/Providers/ThemeProvider"
import useFetch from "hooks/useFetch";
import Endpoints from "Endpoints"
import RoundLoader from "components/RoundLoader";
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
function GDPR(props) {
    const themeContext = useContext(ThemeContext)
    const { fetch: privacyPolicyFetch } = useFetch();
    const { fetch: termsAndConditionsFetch } = useFetch();
    const { loading, fetchAll } = useFetch();
    const { t } = useTranslation();
    const loadData = async () => {
        const t = await fetchAll([
            {
                method: "GET",
                name: "privacyPolicy",
                url: Endpoints.generalSettings.getGeneralSetting,
                urlParams: {
                    feature: "privacyPolicy"
                }
            },
            {
                method: "GET",
                name: "termsAndConditions",
                url: Endpoints.generalSettings.getGeneralSetting,
                urlParams: {
                    feature: "termsAndConditions"
                }
            }])
        formikPrivacyPolicy.setFieldValue("privacyPolicy", convertToDraft(t?.data?.privacyPolicy?.value))
        formiktermsAndConditions.setFieldValue("termsAndConditions", convertToDraft(t?.data?.termsAndConditions?.value))

    }
    useEffect(() => {
        themeContext.setTitle("GDPR", <GavelOutlinedIcon />)
        loadData()

    }, [])

    const formikPrivacyPolicy = useFormik(
        {
            //           enableReinitialize: true,
            initialValues: {
                privacyPolicy: ""
            },
            onSubmit: async (values) => {
                try {
                    await privacyPolicyFetch({
                        method: "PUT",
                        url: Endpoints.generalSettings.editGeneralSetting,
                        data: {
                            feature: "privacyPolicy",
                            value: convertFromDraft(values.privacyPolicy)
                        }
                    });
                    themeContext.showSuccessSnackbar({ message: "gdpr.privacyPolicyChangedSuccessfully" })
                } catch (e) {

                }
            }
        }
    )

    const formiktermsAndConditions = useFormik(
        {
            initialValues: {
                termsAndConditions: ""
            },
            onSubmit: async (values) => {
                try {
                    await termsAndConditionsFetch({
                        method: "PUT",
                        url: Endpoints.generalSettings.editGeneralSetting,
                        data: {
                            feature: "termsAndConditions",
                            value: convertFromDraft(values.termsAndConditions)
                        }
                    });
                    themeContext.showSuccessSnackbar({ message: "gdpr.termsAndConditionsChangedSuccessfully" })
                } catch (e) {

                }
            }
        }
    )
    if (loading) return <RoundLoader />
    return (
        <div className={classnames("flex flex-col", themeContext.muiType === "light" ? "lightThemeEditor" : "darkThemeEditor")}>
            <Card id="privacyPolicyBox">
                <CardHeader title="Privacy Policy" />
                <form onSubmit={formikPrivacyPolicy.handleSubmit}>
                    <CardContent>
                        <EditorWYSIWYG
                            disabled={formikPrivacyPolicy.isSubmitting}
                            wrapperClassName={classnames("editor-wrapper", props.wrapperClassName)}
                            editorClassName={classnames("editor", props.editorClassName)}
                            editorState={formikPrivacyPolicy.values.privacyPolicy}
                            onEditorStateChange={(editorState) => { formikPrivacyPolicy.setFieldValue("privacyPolicy", editorState) }}
                        />
                    </CardContent>
                    <CardActions>
                        <Button
                            color="primary"
                            type="submit"
                            disabled={formikPrivacyPolicy.isSubmitting}
                        >
                            {t("save")}
                        </Button>
                    </CardActions>
                </form>
            </Card>
            <Card id="termsAndConditionseBox">
                <CardHeader title={t("tos.termsAndConditions")} />
                <form onSubmit={formiktermsAndConditions.handleSubmit}>
                    <CardContent>
                        <EditorWYSIWYG
                            disabled={formiktermsAndConditions.isSubmitting}
                            wrapperClassName={classnames("editor-wrapper", props.wrapperClassName)}
                            editorClassName={classnames("editor", props.editorClassName)}
                            editorState={formiktermsAndConditions.values.termsAndConditions}
                            onEditorStateChange={(editorState) => { formiktermsAndConditions.setFieldValue("termsAndConditions", editorState) }}
                        />
                    </CardContent>
                    <CardActions>
                        <Button
                            color="primary"
                            type="submit"
                            disabled={formiktermsAndConditions.isSubmitting}
                        >
                            {t("save")}
                        </Button>
                    </CardActions>
                </form>
            </Card>
        </div>
    )

}
export default GDPR;
