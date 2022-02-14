import React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useTranslation } from "react-i18next";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import "./style.scss";

function UtilitiesBox(props) {
    const { t } = useTranslation();
    const { formikUser } = props
    return (
        <Card id="utilitiesBox">
            <CardHeader title={t("users.utilities")} />

            <CardContent>
                <div className="flex flex-col">
                    <FormControlLabel
                        control={
                            <Switch
                                name="sendActivationEmail"
                                checked={formikUser.values.sendActivationEmail}
                                onChange={formikUser.handleChange}
                                color="primary"
                            />
                        }
                        label={t("users.sendActivationEmail")}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export default UtilitiesBox;
