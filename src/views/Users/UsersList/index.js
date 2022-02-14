import React, { useEffect, useContext } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import useFetch from "hooks/useFetch";
import RoundLoader from "components/RoundLoader";
import EnhancedTable from "components/EnhancedTable";
import Endpoints from "Endpoints";
import { useTranslation } from "react-i18next";
import { Card } from "@mui/material";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FloatingActionButton from "components/FloatingActionButton"
import "./style.scss";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';

function UsersList(props) {
    const themeContext = useContext(ThemeContext);
    const { loading, data, fetch } = useFetch();
    const { fetch: fetchSendLostPasswordEmail } = useFetch();
    const { fetch: fetchSendActivationEmail } = useFetch();
    const { fetch: fetchDisableUser } = useFetch();
    const { fetch: fetchImpersonificateUser } = useFetch();
    const { t } = useTranslation();
    const history = useHistory();

    const loadData = async () => {
        try {
            await fetch({
                url: Endpoints.user.getAll,
                method: "GET",
            })
        }
        catch (e) {

        }
    }
    useEffect(() => {
        themeContext.setTitle("users.users", <GroupOutlinedIcon />);
        loadData()
    }, []);


    const headCells = [
        {
            id: "email",
            label: "Email",
        },
        {
            id: "firstname",
            label: t("users.firstname"),
        },
        {
            id: "lastname",
            label: t("users.lastname"),
        },
        {
            id: "status",
            label: t("users.status"),
        },
        {
            id: "role",
            label: t("users.role"),
        }
    ]


    if (loading) return <RoundLoader />
    const rows = data.map(user => {
        return {
            id: user.id,
            status: {
                value: user.status
            },
            firstname: {
                value: user.firstname
            },
            lastname: {
                value: user.lastname
            },
            email: {
                value: user.email,
                component: <span className="flex items-center"> <Avatar
                    className="mt-1 mr-1 mb-1"
                    src={user.profileImageUrl && process.env.REACT_APP_API_URL + "/public/" + user.profileImageUrl}>
                </Avatar>
                    {user.email}
                </span>

            },
            role: {
                value: user.role
            },

        }
    })
    return (
        <div >
            <Card>
                <EnhancedTable
                    headCells={headCells}
                    rows={rows}
                    readOnly={false}
                    rowsPerPage={10}
                    dense={true}
                    buttons={[
                        {
                            tooltip: "users.edit",
                            icon: <EditOutlinedIcon />,
                            onClick: (id) => history.push(`/users-management-system/${id}`),
                            activateOnSingleSelection: true,
                            activateOnMultipleSelection: false,
                        },
                        {
                            tooltip: "users.sendActivationEmail",
                            icon: <TouchAppOutlinedIcon />,
                            onClick: async (id) => {
                                await fetchSendActivationEmail({
                                    url: Endpoints.user.sendActivationEmail,
                                    method: "POST",
                                    urlParams: {
                                        id
                                    }
                                })
                                themeContext.showSuccessSnackbar({ message: "users.activationEmailSent" })
                            },
                            activateOnSingleSelection: true,
                            activateOnMultipleSelection: false,
                        },
                        {
                            tooltip: "users.sendLostPasswordEmail",
                            icon: <VpnKeyOutlinedIcon />,
                            onClick: async (id) => {
                                await fetchSendLostPasswordEmail({
                                    url: Endpoints.user.sendLostPasswordEmail,
                                    method: "POST",
                                    urlParams: {
                                        id
                                    }
                                })
                                themeContext.showSuccessSnackbar({ message: "users.lostPasswordEmailSent" })
                            },
                            activateOnSingleSelection: true,
                            activateOnMultipleSelection: false,
                        },
                        {
                            tooltip: "users.disableUser",
                            icon: <DeleteOutlineOutlinedIcon />,
                            disabled: id => !Array.isArray(id) && data.find(element => element.id === id).status === "DISABLED",
                            onClick: async id => {
                                await fetchDisableUser({
                                    url: Endpoints.user.editByAdmin,
                                    method: "PUT",
                                    data: {
                                        id,
                                        status: "DISABLED"
                                    }
                                })
                                loadData()
                                themeContext.showSuccessSnackbar({ message: "users.disabledUserSuccessfully" })
                            },
                            activateOnSingleSelection: true,
                            activateOnMultipleSelection: false,
                        },
                        {
                            tooltip: "users.impersonificateUser",
                            icon: <AccessibilityOutlinedIcon />,
                            onClick: async id => {
                                await fetchImpersonificateUser({
                                    url: Endpoints.user.impersonificate,
                                    method: "POST",
                                    urlParams: {
                                        id
                                    }
                                })
                                window.location.assign(process.env.REACT_APP_FRONTEND_LINK);

                            },
                            activateOnSingleSelection: true,
                            activateOnMultipleSelection: false,
                        }
                    ]}
                />
            </Card>
            <FloatingActionButton tooltip="users.createUser" href="/users-management-system/new" />
        </div>
    );
}

export default UsersList;
