import React, { useEffect, useContext } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import useFetch from "hooks/useFetch";
import RoundLoader from "components/RoundLoader";
import EnhancedTable from "components/EnhancedTable";
import Endpoints from "Endpoints";
import { useTranslation } from "react-i18next";
import { Card } from "@mui/material";
import "./style.scss";
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DateTime } from "luxon";


function Feedbacks(props) {
    const themeContext = useContext(ThemeContext);
    const { loading, data, fetch } = useFetch();
    const { fetch: fetchDeleteFeedback } = useFetch();
    const { fetch: fetchEditFeedback } = useFetch();
    const { t } = useTranslation();
    const loadData = async () => {
        try {
            await fetch({
                url: Endpoints.feedback.getAll,
                method: "GET",
            })
        }
        catch (e) {
        }
    }

    const handleFeedback = async (id) => {
        await fetchEditFeedback({
            url: Endpoints.feedback.editById,
            method: "PUT",
            data: { id, handled: !data.find(feedback => feedback.id === id).handled }
        })

    }
    useEffect(() => {
        themeContext.setTitle("feedbacks.feedbacks", <BugReportOutlinedIcon />);
        loadData()
    }, []);


    const headCells = [
        {
            id: "description",
            label: t("feedbacks.description"),
        },
        {
            id: "type",
            label: t("feedbacks.type"),
        },
        {
            id: "handled",
            label: t("feedbacks.handled"),
        },
        {
            id: "path",
            label: t("feedbacks.path"),
        },
        {
            id: "createdAt",
            label: t("feedbacks.createdAt"),
        },
        {
            id: "createdBy",
            label: t("feedbacks.createdBy"),
        },
        {
            id: "screenshot",
            label: t("feedbacks.screenshot"),
        }
    ]


    if (loading) return <RoundLoader />
    const rows = data.map(feedback => {
        return {
            id: feedback.id,
            type: {
                value: feedback.type,
                component: feedback.type === "BUG" ? <BugReportOutlinedIcon /> : <EmojiObjectsOutlinedIcon />
            },
            description: {
                value: feedback.description,
                maxCharacters: 200
            },
            handled: {
                value: feedback.handled,
                onClick: async () => {
                    await handleFeedback(feedback.id)
                    themeContext.showSuccessSnackbar({ message: "feedbacks.changedHandleStatus" })
                    loadData()
                },
            },
            path: {
                value: feedback.path
            },
            createdAt: {
                value: DateTime.fromISO(feedback.createdAt).toLocaleString()
            },
            createdBy: {
                value: feedback.user.email,
                link: `/users-management-system/${feedback.user.id}`
            },
            screenshot: {
                link: process.env.REACT_APP_API_URL + "/public/" + feedback.screenshotUrl
            }
        }
    })

    return (
        <div >
            <Card>
                <EnhancedTable
                    headCells={headCells}
                    rows={rows}
                    buttons={[
                        {
                            tooltip: "feedbacks.handle",
                            icon: <CheckOutlinedIcon />,
                            onClick: async (id) => {
                                try {
                                    await handleFeedback(id)
                                    themeContext.showSuccessSnackbar({ message: "feedbacks.changedHandleStatus" })
                                    loadData()
                                }
                                catch (e) { }
                            },
                            activateOnSingleSelection: true,
                            activateOnMultipleSelection: false,
                        },
                        {
                            tooltip: "feedbacks.delete",
                            icon: <DeleteOutlineOutlinedIcon />,
                            onClick: async (id) => {
                                try {
                                    await fetchDeleteFeedback({
                                        url: Endpoints.feedback.deleteById,
                                        method: "DELETE",
                                        urlParams: { id }
                                    })
                                    loadData()
                                    themeContext.showSuccessSnackbar({ message: "feedbacks.deletedSuccessfully" })

                                }
                                catch (e) { }
                            },
                            activateOnSingleSelection: true,
                            activateOnMultipleSelection: false,
                            deselectCheckedOnClick: true
                        }
                    ]}
                />
            </Card>
        </div>
    );
}

export default Feedbacks;
