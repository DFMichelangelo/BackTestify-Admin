import React, { useContext, useState } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Trans } from "react-i18next";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import "./style.scss";
import FormGroup from '@mui/material/FormGroup';
function UtilitiesBox(props) {
    const { formikUser } = props
    return (
        <Card id="utilitiesBox">
            <CardHeader title={<Trans>users.utilities</Trans>} />

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
                        label={<Trans>users.sendActivationEmail</Trans>}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export default UtilitiesBox;
