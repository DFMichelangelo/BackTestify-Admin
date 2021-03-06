import React, { useContext } from "react";
import { Card, CardContent, CardHeader, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./style.scss";
import CardActions from "@mui/material/CardActions";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import useFetch from "hooks/useFetch";
import { UserContext } from "contexts/Providers/UserProvider";
import Endpoints from "Endpoints";
function ChangePasswordBox(props) {
    const themeContext = useContext(ThemeContext);
    const userContext = useContext(UserContext);
    const { t } = useTranslation();
    const { fetch } = useFetch();

    return (
        <Card id="doNotRememberPasswordBox" >
            <CardHeader title={t("profile.dontRememberPassword")} />
            <CardContent className="flex flex-col">
                <div>
                    {t("profile.dontRememberPasswordText")}
                </div>
            </CardContent>
            <CardActions>
                <Button
                    color="primary"
                    onClick={async () => {
                        try {
                            await fetch({
                                url: Endpoints.auth.lostPasswordEmail,
                                data: { email: userContext.user.email },
                                method: "POST"
                            })
                            themeContext.showSuccessSnackbar({ message: "profile.emailSent" })
                        } catch (e) {

                        }
                    }}
                >
                    {t("profile.remindPassword")}
                </Button>
            </CardActions>
        </Card>
    );
}

export default ChangePasswordBox;
